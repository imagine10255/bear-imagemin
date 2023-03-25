# bear-imagemin-client

> bear-node-imagemin api by docker service

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)

## Support Version Map

Api Docker Image | BearImageminClient node package | 
------------------|--------------------------------:|
0.0.5             |                           0.0.5 |


## Install

```bash
yarn add -D bear-imagemin-client
```

## Use

```typescript
import {BearImageminClient} from 'bear-imagemin-client';

const client = new BearImageminClient('http://imageSquash:3000');
client.squash('/tmp/fromPath', '/tmp/savePath', {
  resize: {
    width: 500,  
  }
})
```



## Options


name    | type               | required | default |
-------------|--------------------|----------|---------|
quality   | number             |
ignoreOverflowSize   | boolean            |          | true
extname   | jpg, png, webp' |          | webp   |
reszie   |  |          |   |


resize

name    | type               | required | default | 
-------------|--------------------|----------|---------|
width   | number             |
height   | number             |



## License

MIT © [imagine10255](https://github.com/imagine10255)
