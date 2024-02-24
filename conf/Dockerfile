# ----- BUILD STAGE -----
FROM node:18-slim AS build

WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock for optimal caching
COPY package*.json ./

RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Use the official NGINX image as the base image
FROM nginxinc/nginx-unprivileged:latest

# Remove the default NGINX config file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the nginx config
COPY conf/nginx.conf /etc/nginx/conf.d/

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

USER 10014

# Expose port 8080
EXPOSE 8080

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
