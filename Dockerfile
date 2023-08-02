FROM node:latest

USER node

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install
CMD ["npm", "run", "start"]