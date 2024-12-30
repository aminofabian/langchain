# 🧑‍💻 Development Stage 1
FROM node:20-alpine as base

# Add the missing shared libraries and PostgreSQL client
RUN apk add --no-cache libc6-compat postgresql-client

# Create app folder
WORKDIR /app

# Copy only the package.json and yarn.lock first for dependency caching
COPY package.json yarn.lock ./

# Install dependencies in a separate layer to leverage Docker cache
RUN yarn config set network-timeout 300000 && \
    for i in 1 2 3 4 5; do yarn install --prefer-offline && break || sleep 30; done


# Development Stage (staging environment)
FROM base as dev


# Copy the application source code to the container
COPY . .

# Generate any necessary files and build the project
RUN yarn build

# Production Stage
FROM base as prod

# Set environment variable, default to production
ARG NODE_ENV=prod
ENV NODE_ENV=$NODE_ENV

# Copy only the necessary files for running the application from the build stage
COPY --from=dev /app/dist ./dist
COPY --from=dev /app/node_modules ./node_modules

# Command to run the production build of the application
CMD ["node", "dist/main.js"]