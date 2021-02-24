FROM node:12-alpine

RUN apk update \
    && apk add --upgrade --no-cache \
    bash \
    bash-completion \
    && rm -rf /var/cache/*

RUN npm install typescript -g
RUN npm g install ts-node

ENV APP_HOME=/home/node/app_1
USER node
RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY package-lock.json ${APP_HOME}/
COPY package.json ${APP_HOME}/


RUN npm i -D typescript
RUN npm install

EXPOSE 3000
EXPOSE 8080

#CMD ["node", "/app/src/index.js"]

