# Node image
FROM node:18-alpine3.15 

# Set working directory
WORKDIR /app

# Copy package.json to working
COPY package.json .

# Install dependencies
RUN yarn

# Copy resto of files to working directory
COPY . .

# Expose port
EXPOSE 3000

# Run command in the terminal
CMD ["yarn", "start:dev"]
