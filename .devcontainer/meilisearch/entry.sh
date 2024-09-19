#!/bin/sh
set -e

: ${PUID:=0}
: ${PGID:=0}
: ${USERNAME:=meili}

if [ "$PUID" != "0" ] || [ "$PGID" != "0" ]; then

    echo "[entry.sh] init with PUID: $PUID; PGID: $PGID; USERNAME: $USERNAME;"

    OLD_USERNAME=$(id $PUID 2>/dev/null | awk -F'(' '{print $2}' | cut -d')' -f1)
    if [ -n "$OLD_USERNAME" ]; then
        echo "[entry.sh] PUID 已存在，使用用户名： $OLD_USERNAME"
        USERNAME="$OLD_USERNAME"
    else
        echo "[entry.sh] PUID 未找到对应的用户名，使用用户名 $USERNAME"
    fi

    if ! egrep "^$USERNAME:" /etc/passwd >/dev/null 2>&1; then
        echo "[entry.sh] 不存在用户，开始新增：$USERNAME"
        adduser -h /home/$USERNAME -D -u $PUID $USERNAME  # 注意：参数可能根据实际需求调整
    fi

    : ${GROUPNAME:="$(id -gn $USERNAME)"}

    OLD_GID=$(id -g $USERNAME)
    if [ "$PGID" != "$OLD_GID" ]; then

        echo "[entry.sh] 修改 GID: $OLD_GID => $PGID"

        if getent group $PGID >/dev/null 2>&1; then
            echo "[entry.sh] 已存在 GID 的用户分组， 修改用户的主分组 GID 为 $PGID"
            GROUPNAME=$(getent group $PGID | cut -d: -f1)
            adduser $USERNAME -G ${GROUPNAME}
        else
            echo "[entry.sh] 不存在 GID 的用户分组， 将用户分组 $GROUPNAME 的 GID 修改为 $PGID"
            
            # 创建临时组
            TEMP_GROUP="temp_$GROUPNAME"
            addgroup --gid $PGID $TEMP_GROUP
            
            # 将用户加入临时组
            addgroup $USERNAME $TEMP_GROUP
            
            # 更新文件系统的权限
            find / -group $GROUPNAME -exec chgrp $TEMP_GROUP {} \;
            
            # 重命名临时组为原组名
            sed -i "s/^$GROUPNAME:.*$/$(getent group $TEMP_GROUP)/" /etc/group
            
            # 清理临时组
            delgroup $TEMP_GROUP
        fi
    
    else
        echo "[entry.sh] GID 未改变，跳过"
    fi

    OLD_UID=$(id -u $USERNAME)
    if [ "$PUID" != "$OLD_UID" ]; then

        echo "[entry.sh] 修改 UID: $OLD_UID => $PUID"

        # 使用 adduser 命令来修改用户的 UID
        adduser -u $PUID -D $USERNAME
        
    fi
fi

exec tini -- su - $USERNAME -c "cd /meili_data && /bin/meilisearch --master-key=\"$MEILISEARCH_KEY\" $@"