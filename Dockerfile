FROM node:20.15.0-bullseye

USER root

RUN npm i -g npm@latest vercel@latest npm-check-updates
RUN apt-get update && apt-get -y install vim git

COPY ./src /home/node/ui
RUN chown -R node:node /home/node/ui

USER node
WORKDIR /home/node/ui