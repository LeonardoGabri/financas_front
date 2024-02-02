FROM node:18.13.0 as builder
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
