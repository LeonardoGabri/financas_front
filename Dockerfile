FROM node:18:13.0 AS build
ADD ["package.json", "/src/"]
WORKDIR /src
RUN npm install
ADD ./ /src
RUN npm run build:prod
