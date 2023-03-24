#!/usr/bin/env sh

apk add --no-cache \
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

yarn build
ls
node --max_old_space_size=2048 dist/main.js
