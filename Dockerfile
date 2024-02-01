FROM node:16:20.1 AS build
ADD ["package.json", "/src/"]
WORKDIR /src
RUN npm install
ADD ./ /src
RUN npm run build:prod
