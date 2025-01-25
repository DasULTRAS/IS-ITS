FROM node:23.6 AS builder
# SET work dir in container
WORKDIR /app
# copy packages files
COPY package.json .
COPY package-lock.json .
# install packages
RUN npm ci
# COPY APP (without .dockerignore)
COPY . .
# Build the app
RUN npm run build

# production environment
FROM nginx:1.26 AS production

COPY --from=builder /app/dist /usr/share/nginx/html

ENV TZ=Europe/Berlin

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]