FROM node:12

# Working Directory
WORKDIR /usr/src/app

# Get both package and package-lock where applicable
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy into workiing directory
COPY . .

# Expose the appropriate port
EXPOSE 8080

CMD [ "node", "server.js" ]
