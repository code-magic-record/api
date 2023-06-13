FROM node:18

WORKDIR /app

COPY . /app

RUN yarn

CMD ["yarn", "start"]
