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
EXPOSE 8082

RUN npm run-script build
RUN npm install -g serve

CMD [ "serve","-l","8082","build"]
