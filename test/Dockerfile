# Built from Node latest Alpine
FROM node:10.0

RUN npm -g install serve

# Specify an optional argument with a default value
ARG app_directory=/src

# Set the app directory as the context for all commands and entry to the container
WORKDIR ${app_directory}

# ONLY copy over the package.json to install NPM packages
COPY package.json .

# Install node module dependencies
RUN npm install

# Add the rest of the project files(most builds will start from here based on cache)
COPY . .

RUN npm run build

# Start the node application as you normally would
CMD serve -p $PORT -s build