FROM node:slim

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .

CMD ["yarn", "start"]
