<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

bear-imagemin-server is use nestjs framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# watch mode
$ yarn run dev
```


## build Docker Image

```bash
$ yarn docker:build
$ docker tag imagine10255/bear-imagemin-server:1.0.3 imagine10255/bear-imagemin-server:latest
$ docker push imagine10255/bear-imagemin-server:latest
```

in docker file `FROM imagine10255/node-imagemin:latest`



## Running in docker

```yaml
version: '3.4'

services:
    imageSquash:
       restart: "no"
       image: imagine10255/bear-imagemin-server:latest
       ports:
         - "8082:3000"
       environment:
           IMAGEMIN_FILE_LIMIT: 20000000
           IMAGEMIN_TIMEOUT: 900000
       command: ["pm2-runtime", "dist/main.js", "-i", "1"]

networks:
    imdockgroup:
        external: true
```

