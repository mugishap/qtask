FROM node:18-alpine

WORKDIR /app

# Copy package.json and yarn.lock first to utilize Docker cache
COPY package*.json yarn.lock ./

RUN yarn install

# Copy the rest of the application code after installing dependencies
COPY . .

# Copy Prisma files after the dependencies have been installed
COPY ./src/prisma ./src/prisma

RUN yarn prisma:all

RUN yarn build

CMD ["yarn", "start:prod"]
