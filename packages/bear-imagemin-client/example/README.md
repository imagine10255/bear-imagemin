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

post body

body name    | type               | required | default | 
-------------|--------------------|----------|---------|
sourceFile   | Buffer             | ✓        | 
resizeWidth   | number             |
resizeHeight   | number       |
quality   | number             |
ignoreOverflowSize   | boolean     |          | true     
extname   | .jpg, .png, .webp' |          | .webp   |

## Use Code

```typescript
import * as FormData from 'form-data';

const data = new FormData();
data.append('sourceFile', fs.createReadStream('/tmp/file.webp'));
data.append('extname', '.webp');


const api = apisauce.create({baseURL: 'http://localhost:3001'});
  return api.post<Stream>('/api/squash', data, {
      headers: {
          ...data.getHeaders(),
      },
      responseType: 'stream',
  }).then(res => {
      return new Promise<string>((resolve, reject) => {
          if(!res.data){
              reject('error! response data is null');
              return;
          }
          return res.data
              .pipe(fs.createWriteStream(savePath))
              .on('finish', () => resolve(savePath))
              .on('error', e => reject(e));
      });
  });
```

or your can `yarn install bear-imagemin-client`


## License

MIT © [imagine10255](https://github.com/imagine10255)
