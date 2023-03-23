# 建置基礎映像
FROM node:18.10.0-alpine AS base
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
RUN npm install pm2 -g



FROM base AS builder
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN awk '/},/ { p = 0 } { if (!p) { print $0 } } /"devDependencies":/ { p = 1 }' package.json > package.json.tmp && mv package.json.tmp package.json && yarn install --prod --frozen-lockfile
COPY . .
RUN yarn build
RUN mkdir ./copy-tmp && \
    mv node_modules ./copy-tmp && \
    mv dist ./copy-tmp


# And then copy over node_modules, etc from that stage to the smaller base image
FROM base
WORKDIR /opt/app/
COPY --from=builder /opt/app/copy-tmp .
RUN mkdir /tmp/bear_imagemin

EXPOSE 8080
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]
