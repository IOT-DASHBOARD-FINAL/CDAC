# Use the official image as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# RUN npx prisma generate
RUN npx prisma generate

# Set environment variables from build arguments
ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD npx prisma migrate deploy && npm start