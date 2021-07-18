# build env
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
ARG REACT_APP_ROOT_API
ENV REACT_APP_ROOT_API $REACT_APP_ROOT_API
ARG PUBLIC_URI
ENV PUBLIC_URI $PUBLIC_URI
RUN npm run build

# production env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]