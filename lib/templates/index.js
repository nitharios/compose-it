module.exports = {
  dockerCompose: {
    fileName: 'docker-compose.yml',
    func: (projectName, userName) => {
      return `version: '3'
services:
  web:
    build: .
    image: \${IMAGE-NAME}:local`
    }
  },

  dockerComposeOverride: {
    fileName: 'docker-compose.override.yml',
    func: () => {
      return `version: '3'
services:
  web:
    image: \${IMAGE_NAME}:\${IMAGE_VERSION}-local
    command: ["npm", "run", "start"]
    container_name: \${CONTAINER_NAME}
    volumes:
      - ".:/app/:rw"
    env_file: .env
    environment:
      NODE_ENV: development
    ports:
      - "\${EXPRESS_HOST_PORT}:\${EXPRESS_CONTAINER_PORT}"
      - "3000:3000"
    networks:
      - my-app-network

networks:
  my-app-network:`
    }
  },

  dockerComposeOverridePostgresRedis: {
    fileName: 'docker-compose.override.yml',
    func: () => {
      return `version: '3'
services:
  web:
    image: \${IMAGE_NAME}:\${IMAGE_VERSION}-local
    depends_on:
      - postgres-primary-db
      - redis-session-store
    command: ["npm", "run", "start"]
    container_name: \${CONTAINER_NAME}
    volumes:
      - ".:/app/:rw"
    env_file: .env
    environment:
      NODE_ENV: development
    ports:
      - "\${EXPRESS_HOST_PORT}:\${EXPRESS_CONTAINER_PORT}"
      - "3000:3000"
    networks:
      - my-app-network
  postgres-primary-db:
    image: postgres:10.0-alpine
    env_file: .env
    volumes: 
      - pg-data-volume:/var/lib/postgresql/data
    ports: 
      - '\${POSTGRES_HOST_PORT}:\${POSTGRES_CONTAINER_PORT}'
    networks:
      - my-app-network
  redis-session-store:
    image: redis:4.0-alpine
    env_file: .env
    volumes:
      - redis-data-volume:/data
    ports:
      - '\${REDIS_HOST_PORT}:\${REDIS_CONTAINER_PORT}'
    networks:
      - my-app-network

volumes: 
  pg-data-volume:
  redis-data-volume:
networks:
  my-app-network:`
    }
  },
dockerComposeProd: {
  fileName: 'docker-compose.prod.yml',
  func: () => {
    return `version: '3'
services:
  web:
    image: \${IMAGE_NAME}:\${IMAGE_VERSION}
    command: ["node", "server"]
    container_name: \${CONTAINER_NAME}-prod
    volumes:
      - ".:/app/:rw"
    env_file: .prod.env
    environment:
      NODE_ENV: production
    ports:
      - "\${EXPRESS_HOST_PORT}:\${EXPRESS_CONTAINER_PORT}"
      - "3000:3000"
    networks:
      - my-app-network

networks:
  my-app-network:`
  }
},

  dockerComposeProdPostGresRedis: {
    fileName: 'docker-compose.prod.yml',
    func: () => {
      return `version: '3'
services:
  web:
    image: \${IMAGE_NAME}:\${IMAGE_VERSION}
    depends_on:
      - postgres-primary-db
      - redis-session-store
    command: ["npm", "run", "start"]
    container_name: \${CONTAINER_NAME}-prod
    volumes:
      - ".:/app/:rw"
    env_file: .prod.env
    environment:
      NODE_ENV: production
    ports:
      - "\${EXPRESS_HOST_PORT}:\${EXPRESS_CONTAINER_PORT}"
      - "3000:3000"
    networks:
      - my-app-network
  postgres-primary-db:
    image: postgres:10.0-alpine
    env_file: .prod.env
    volumes: 
      - pg-data-volume:/var/lib/postgresql/data
    ports: 
      - '\${POSTGRES_HOST_PORT}:\${POSTGRES_CONTAINER_PORT}'
    networks:
      - my-app-network
  redis-session-store:
    image: redis:4.0-alpine
    env_file: .prod.env
    volumes:
      - redis-data-volume:/data
    ports:
      - '\${REDIS_HOST_PORT}:\${REDIS_CONTAINER_PORT}'
    networks:
      - my-app-network

volumes: 
  pg-data-volume:
  redis-data-volume:
networks:
  my-app-network:`
    }
  },

  dockerfile: {
    fileName: 'Dockerfile',
    func: () => {
      return `# Built from Node latest Alpine
FROM node:10.0

RUN npm -g install serve

# Specify an optional argument with a default value
ARG app_directory=/app

# Set the app directory as the context for all commands and entry to the container
WORKDIR \${app_directory}

# ONLY copy over the package.json to install NPM packages
COPY package.json .

# Install node module dependencies
RUN npm install

# Add the rest of the project files(most builds will start from here based on cache)
COPY . .

RUN npm run build

# Start the node application as you normally would
CMD serve -p $PORT -s build`
    }
  },

  dockerignore: {
    fileName: '.dockerignore',
    func: () => {
      return `# Items that don't need to be in a Docker image.
# Anything not used by the build system should go here.
Dockerfile
.dockerignore
.gitignore
README.md
yarn.lock

# Artifacts that will be built during image creation.
# This should contain all files created during \`npm run build \`.
.git
build/
node_modules/`
    }
  },

  env: {
    fileName: '.env',
    func: (projectName, userName) => {
      return `IMAGE_NAME=${userName}/${projectName}
IMAGE_VERSION=1.0

CONTAINER_NAME=${projectName}

EXPRESS_HOST_PORT=8080
EXPRESS_CONTAINER_PORT=8080
`
    }
  }
}