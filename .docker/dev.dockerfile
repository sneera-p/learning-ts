FROM node:16
WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
COPY dist /app/

RUN yarn install --production=true
EXPOSE 3000
CMD [ "node", "/app/index.js" ]
