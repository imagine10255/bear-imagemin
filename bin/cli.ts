#!/usr/bin/env node

/**
 * ts-node bin/cli lossySquash --sourceFile=./example/static/source.png --saveFile=./example/static/lossySquash/image_1024.png --with=100
 */

/* istanbul ignore if */
const ver = process.version.match(/v(\d+)\./);
if (ver !== null && Number(ver[1]) < 10) {
    console.error('bear-node-imagemin: Node v10 or greater is required. `bear-node-imagemin` did not run.')
} else {
    const logger = require('../lib/script/logger');
    const bearScript = require('../lib');
    bearScript()
        .catch((e: any) => {
            logger.error(e.message);
            process.exit(1);
        });
}


