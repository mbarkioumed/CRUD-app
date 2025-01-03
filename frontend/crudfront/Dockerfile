# Use an official Node.js runtime as a parent image
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Define a build-time argument
ARG REACT_APP_API_BASE_URL

# Set an environment variable for the build
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use an official Nginx image to serve the built application
FROM nginx:1-alpine-slim

# Copy the built application from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
