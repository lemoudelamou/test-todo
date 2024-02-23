# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app (adjust this command based on your actual build script)
RUN npm run build

RUN npm install --global serve

# Command to start the application
CMD ["serve", "build"]
