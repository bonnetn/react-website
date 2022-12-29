FROM node:19-alpine3.16

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY schema.graphql ./schema.graphql
