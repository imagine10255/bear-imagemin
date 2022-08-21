# bear-imagemin-api

> bear-node-imagemin api by docker service

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)


## Build Docker file

```bash
docker build . -t  imagine10255/bear-imagemin-api:$version
```

## Use Docker-compose

Client is Local test
```
 imageSquash:
       restart: "no"
       image: imagine10255/bear-imagemin-api:$version
       ports:
         - "3001:3000"
         
# [post] curl http://localhost:3001/api/losslessSquash         
# [post] curl http://localhost:3001/api/lossySquash         
```

Client is docker service
```
 imageSquash:
       restart: "no"
       image: imagine10255/bear-imagemin-api:$version
       
# [post] curl http://imageSquash:3000/api/losslessSquash         
# [post] curl http://imageSquash:3000/api/lossySquash    
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
