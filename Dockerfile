FROM node:20.14.0-alpine3.20

WORKDIR /usr/local/watch-next
COPY . /usr/local/watch-next
RUN npm install
RUN npm run build

EXPOSE 3000:3000

CMD "npm" "start"

