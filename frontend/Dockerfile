# frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Install 'serve' to run the built application
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Use 'serve' to serve the build files
CMD ["serve", "-s", "build", "-l", "3000"]
