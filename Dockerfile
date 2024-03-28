# Install node version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json into image
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy source files
COPY . .

# Port
EXPOSE 3000

# Run application locally
CMD npm run dev
