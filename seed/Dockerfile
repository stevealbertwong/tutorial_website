FROM mongo:latest
COPY init.json /init.json
CMD mongoimport --host mongodb --db reach-engine --collection MyDummyCollection --type json --file /init.json --jsonArray