# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of your server code to the container
COPY . .

# Expose the server's port (replace with your server's port)
EXPOSE 3500

# Start the server
CMD ["npm", "start", "--", "--disableHostCheck"]
