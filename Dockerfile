FROM node:18.3.0-alpine
WORKDIR /opt/app/
RUN apk add --update --no-cache \
  make \
  g++ \
  automake \
  autoconf \
  libtool \
  nasm \
  libjpeg-turbo-dev
#RUN apk update && apk add bash
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile
COPY . .
RUN yarn build

EXPOSE 8080
CMD ["node", "--max_old_space_size=2048", "dist/bear-node-imagemin.js"]
