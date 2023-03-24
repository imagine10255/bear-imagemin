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
