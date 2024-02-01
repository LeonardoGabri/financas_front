FROM node:18.13.0 AS build
ADD ["package.json", "/src/"]
WORKDIR /src
RUN npm install
ADD ./ /src
RUN npm run build:prod

FROM nginx:1.21.3-alpine
COPY --from=build --chown=nonroot /src/dist /sources/
EXPOSE 8080
