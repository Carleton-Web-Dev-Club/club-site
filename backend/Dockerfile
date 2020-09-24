FROM node:12-alpine

WORKDIR /api

COPY package*.json ./

RUN npm i --production

EXPOSE 5000

COPY . .

CMD ["npm", "start"]
