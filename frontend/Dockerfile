# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install ---legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Set environment variables from build arguments
ARG VITE_APP_BACKEND_URL=${VITE_APP_BACKEND_URL}
ARG VITE_APP_VM=${VITE_APP_VM}
ARG VITE_APP_SERVER=${VITE_APP_SERVER}

# Build the application
RUN npm run build -- --target=esnext

# Use an official Nginx image to serve the frontend
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]