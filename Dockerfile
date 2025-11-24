FROM node:20-alpine AS build

ARG API_URL=https://blockudoku-api.tomberger.io
ARG SOCKETS_URL=https://blockudoku-socket-service.tomberger.io

ENV API_URL=$API_URL
ENV SOCKETS_URL=$SOCKETS_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]