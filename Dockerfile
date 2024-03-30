# Tried to do a compose build step but was blocked with paths and permissions 
# I understand is not advised to ship the whole thing over and over again. 
# But for simplicity and considering the size of the project I decided to do it this way. 

# Fetch Node and start container
FROM node:20-alpine
# Select the working directory
WORKDIR /app
# Sorting the dependencies
COPY package.json /.
COPY package-lock.json /.
RUN npm install
# Copy the rest of the files before building the app
COPY . .
# Build the app
RUN npm run build
# Copy the build files
COPY . .
# Expose the port and start the app
EXPOSE 3000
CMD npm run start
