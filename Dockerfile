# Tried to do a compose build step but was blocked with paths and permissions 
# I understand is not advised to ship the whole thing over and over again. 
# But for simplicity and considering the size of the project I decided to do it this way. 

# Fetch Node and start container
FROM node:21-alpine3.18
# Select the working directory
WORKDIR /app
# Sorting the dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install
# Copy the rest of the files before building the app
COPY . /app
# Build the app
RUN npm run build
# Copy the build files
COPY . /app
# Expose the port and start the app
EXPOSE 3000

# Has to be the same as the web service (NextJS 3000)
ENV PORT 3000
ENV HOSTNAME '0.0.0.0'

CMD ["npm", "run", "start"]
