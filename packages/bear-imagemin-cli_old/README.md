# bear-imagemin-cli

> bear-node-imagemin cli by docker service

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)


## Build Docker file

```bash
yarn add -D bear-imagemin-cli
```

Client is docker service
in your package.json
```json
{
  "scripts": {
    "image:lossySquash": "bear-imagemin-cli lossySquash --sourceFile=./example/source.png --saveFile=./example/lossySquash/image_1024.png --resizeWith=width"
  }
}

# then run `yarn image:lossySquash`
```

PS: `$version` change current number (ex: 1.0.8)


## API Params

post body

body name    | type               | required | default | 
-------------|--------------------|----------|---------|
sourceFile   | Buffer             | ✓        | 
resizeWidth   | number             |
resizeHeight   | number       |
quality   | number             |
ignoreOverflowSize   | boolean     |          | true     
extname   | .jpg, .png, .webp' |          | .webp   |


## License

MIT © [imagine10255](https://github.com/imagine10255)
