FROM getmeili/meilisearch:v1.10

COPY entry.sh /usr/local/bin/entry.sh
RUN chmod +x /usr/local/bin/entry.sh

ENTRYPOINT [ "entry.sh" ]

CMD [ "/bin/meilisearch" ]
