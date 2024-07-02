FROM node:20.14.0-alpine3.20

RUN npm install pm2 -g

WORKDIR /usr/local/watch-next
COPY . /usr/local/watch-next
RUN npm install
RUN npm run build

CMD "pm2-runtime" "server/app.js"

