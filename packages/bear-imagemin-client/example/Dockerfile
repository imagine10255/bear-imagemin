FROM node:18.3.0-alpine
WORKDIR /opt/app/
RUN apk add --no-cache \
--update \
build-base \
mesa-dev \
gcc \
autoconf \
automake \
libtool \
zlib-dev \
nasm \
mesa \
libxi \
libpng-dev \
libjpeg \
jpeg-dev
COPY ../../package.json yarn.lock ./
RUN awk '/},/ { p = 0 } { if (!p) { print $0 } } /"devDependencies":/ { p = 1 }' package.json > package.json.tmp && mv package.json.tmp package.json && yarn install --prod --frozen-lockfile
COPY ../.. .

RUN yarn build

EXPOSE 8080
CMD ["node", "--max_old_space_size=2048", "dist/main.js"]
