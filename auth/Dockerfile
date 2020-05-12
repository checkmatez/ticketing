FROM node:slim

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .

CMD ["yarn", "start"]
