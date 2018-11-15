##FROM mongo:latest
##COPY init.json /init.json
##CMD mongoimport --host 127.0.0.1 --port 27017 --db test --collection MyDummyCollection --type json --file /init.json --jsonArray
FROM alpine

RUN apk add --update mongodb-tools netcat-openbsd
COPY ./wait-for-mongo.sh .
RUN chmod 700 ./wait-for-mongo.sh

ENTRYPOINT ["/bin/sh", "./wait-for-mongo.sh"]
