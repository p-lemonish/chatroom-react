FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_BASE
ARG VITE_WS_PATH
ENV VITE_API_BASE=${VITE_API_BASE}
ENV VITE_WS_PATH=${VITE_WS_PATH}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
