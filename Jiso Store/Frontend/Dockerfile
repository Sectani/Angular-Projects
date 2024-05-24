# Use official Node.js image as the base image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx as the final base image
FROM nginx:alpine

# Copy the built Angular app to Nginx public directory
COPY --from=build /usr/src/app/dist/tp3-panier-dachat /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]

