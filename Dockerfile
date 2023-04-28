FROM node:16

WORKDIR /app

COPY . /app

RUN npm i yarn -g

RUN yarn

CMD ["yarn", "start"]