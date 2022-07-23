FROM alpine:3.16
WORKDIR /app

COPY bin /app/

EXPOSE 3000
CMD [ "/app/server" ]