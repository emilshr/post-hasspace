FROM node:latest

WORKDIR /home/node/post-hasspace
COPY package*.json ./

RUN npm i

RUN npm run build

COPY . .

EXPOSE 3001

CMD [ "node", "build/server-cluster.js" ]