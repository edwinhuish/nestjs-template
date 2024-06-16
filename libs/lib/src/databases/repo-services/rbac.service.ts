import { Injectable, Logger } from '@nestjs/common';
import {
  PermissionOnRoleRepository,
  PermissionsRepository,
  RolesRepository,
  UserOnRoleRepository,
  UsersRepository,
} from '../repositories';
import { IPermissionMeta } from '../entities';

@Injectable()
export class RBACService {
  private readonly logger = new Logger(RBACService.name);

  constructor(
    private readonly userRepo: UsersRepository,
    private readonly userOnRoleRepo: UserOnRoleRepository,
    private readonly roleOnPermissionRepo: PermissionOnRoleRepository,
    private readonly roleRepo: RolesRepository,
    private readonly permissionRepo: PermissionsRepository,
  ) { }

  async getUserAccess(payload: { user_id: number }) {
    const user = await this.userRepo.findByIdAndVerify(payload.user_id);
    const rolesOnUser = await this.userOnRoleRepo.findByUserId(user.id);
    const permissionOnRoles = await this.roleOnPermissionRepo.findByRoleIds(
      rolesOnUser.map((uor) => uor.role_id),
    );
    const permissions = await this.permissionRepo.collectAllPermissionMetas(
      permissionOnRoles.map((por) => por.permission_id),
    );

    return permissions;
  }

  async getUserRoles(payload: { user_id: number }) {
    const user = await this.userRepo.findByIdAndVerify(payload.user_id);
    const rolesOnUser = await this.userOnRoleRepo.findByUserId(user.id);
    const roles = await this.roleRepo.findByIDs(
      rolesOnUser.map((uor) => uor.role_id),
    );

    return roles;
  }

  // ---------------------------------- interface for granting / revoking roles to user
  async grantRolesToUser(payload: {
    user_id: number;
    role_ids: Array<number>;
  }) {
    const user = await this.userRepo.findByIdAndVerify(payload.user_id);
    // check if roles already granted to user
    const rolesOnUser = await this.userOnRoleRepo.findByUserId(user.id);
    const roleIds = rolesOnUser.map((uor) => uor.role_id);
    const rolesToGrant = payload.role_ids.filter(
      (role_id) => !roleIds.includes(role_id),
    );
    // grant roles to user
    return await this.userOnRoleRepo.createMany({
      user_id: user.id,
      role_ids: rolesToGrant,
    });
  }

  async revokeRolesFromUser(payload: {
    user_id: number;
    role_ids: Array<number>;
  }) {
    const user = await this.userRepo.findByIdAndVerify(payload.user_id);
    // check if roles already granted to user
    const rolesOnUser = await this.userOnRoleRepo.findByUserId(user.id);
    const roleIds = rolesOnUser.map((uor) => uor.role_id);
    const rolesToRevoke = payload.role_ids.filter((role_id) =>
      roleIds.includes(role_id),
    );
    // revoke roles from user
    return await this.userOnRoleRepo.revokeMany({
      role_on_users_id: rolesOnUser
        .filter((uor) => rolesToRevoke.includes(uor.role_id))
        .map((uor) => uor.id),
    });
  }

  // ---------------------------------- interface for adding / removing permissions to role
  async addPermissionsToRole(payload: {
    role_id: number;
    permission_ids: Array<number>;
  }) {
    const role = await this.roleRepo.findByIdOrThrow(payload.role_id);
    // check if permissions already granted to role
    const permissionsOnRole = await this.roleOnPermissionRepo.findByRoleIds([
      role.id,
    ]);
    const permissionIds = permissionsOnRole.map((por) => por.permission_id);
    const permissionsToAdd = payload.permission_ids.filter(
      (permission_id) => !permissionIds.includes(permission_id),
    );
    // grant permissions to role
    return await this.roleOnPermissionRepo.createMany({
      role_id: role.id,
      permission_ids: permissionsToAdd,
    });
  }

  async removePermissionsFromRole(payload: {
    role_id: number;
    permission_ids: Array<number>;
  }) {
    const role = await this.roleRepo.findByIdOrThrow(payload.role_id);
    // check if permissions already granted to role
    const permissionsOnRole = await this.roleOnPermissionRepo.findByRoleIds([
      role.id,
    ]);
    const permissionIds = permissionsOnRole.map((por) => por.permission_id);
    const permissionsToRemove = payload.permission_ids.filter((permission_id) =>
      permissionIds.includes(permission_id),
    );
    // revoke permissions from role
    return await this.roleOnPermissionRepo.delete(
      permissionsOnRole
        .filter((por) => permissionsToRemove.includes(por.permission_id))
        .map((por) => por.id),
    );
  }

  // ---------------------------------- interface for creating / deleting roles
  async createRole(payload: {
    name: string;
    desc?: string;
    is_active?: boolean;
    notes?: string;
    expires_at?: Date;
  }) {
    // remove the undefined values
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );

    return await this.roleRepo.insert(payload);
  }

  async deleteRole(payload: { role_id: number }) {
    const role = await this.roleRepo.findByIdOrThrow(payload.role_id);

    return await this.roleRepo.delete(role.id);
  }

  // ---------------------------------- interface for creating / deleting permissions
  async createPermission(payload: {
    name: string;
    desc?: string;
    is_active?: boolean;
    meta?: IPermissionMeta;
  }) {
    // remove the undefined values
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );

    return await this.permissionRepo.insert(payload);
  }

  async deletePermission(payload: { permission_id: number }) {
    const permission = await this.permissionRepo.findByIdOrThrough(
      payload.permission_id,
    );

    return await this.permissionRepo.delete(permission.id);
  }
}
