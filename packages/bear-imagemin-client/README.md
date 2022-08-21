# bear-imagemin-client

> bear-node-imagemin api by docker service

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)

## Support Version Map

Api Docker Image | BearImageminClient node package  | 
------------------|---------------------------------:|
0.0.4             |                            0.0.4 |


## Install

```bash
yarn add -D bear-imagemin-client
```

## Use

```typescript
import BearImageminClient from 'bear-imagemin-client';

const client = new BearImageminClient('http://imageSquash:3000');
client.squash('/tmp/fromPath', '/tmp/savePath', {
  resize: {
    width: 500,  
  }
})
```

PS: `$version` change current number (ex: 1.0.8)


## API Params

- post body
  - sourceFile: File
  - resizeWidth: number
  - resizeHeight: number
  - quality: number
  - ignoreOverflowSize: boolean
  - extname: '.jpg'|'.png'|'.webp'
  - isDebug: boolean


## License

MIT © [imagine10255](https://github.com/imagine10255)
