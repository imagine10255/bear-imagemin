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
COPY package.json yarn.lock ./
RUN awk '/},/ { p = 0 } { if (!p) { print $0 } } /"devDependencies":/ { p = 1 }' package.json > package.json.tmp && mv package.json.tmp package.json && yarn install --prod --frozen-lockfile
COPY . .

# unzip imagemin-optipng && imagemin-pngquant && pngquant-bin
RUN unzip ./pkg/png-modules.zip -d node_modules && unzip ./pkg/png-modules-type -d node_modules/@types
RUN yarn build

EXPOSE 8080
CMD ["node", "--max_old_space_size=2048", "dist/server.js"]
