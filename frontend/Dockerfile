FROM node:19-alpine3.16

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY public ./public
COPY src ./src
COPY codegen.ts ./codegen.ts
COPY tsconfig.json ./tsconfig.json
