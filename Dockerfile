# This is a docker file
FROM node:21-alpine

WORKDIR /usr/src/app

# RUN apt update && apt install nodejs npm -y
COPY package*.json ./

RUN npm install

COPY . .

# RUN npm install

EXPOSE 3000

CMD ["npm",  "run", "start:dev"]