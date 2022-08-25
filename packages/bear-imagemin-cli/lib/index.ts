#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

module.exports = async function bearScript () {
    yargs(hideBin(process.argv))
        .command('lossySquash [path] [idPrefix]', 'lossy Squash image jpg, png', (yargs) => {
            return yargs
                .positional('sourceFile', {
                    describe: 'image source path (ex: ./example/source.png)',
                    default: undefined,
                })
                .positional('saveFile', {
                    describe: 'save file path (ex: ./example/lossySquash/先壓縮後縮圖image.png)',
                    default: undefined,
                })
                .positional('quality', {
                    describe: 'image squash quality .1 ~ .9',
                    default: undefined,
                })
                .positional('width', {
                    describe: 'image resize width',
                    default: undefined,
                })
                .positional('height', {
                    describe: 'image resize height',
                    default: undefined,
                });
        }, (argv) => {
            const run = require('./lossySquash');
            run(argv);
        })

        .command('losslessSquash [path] [idPrefix]', 'lossy Squash image jpg, png', (yargs) => {
            return yargs
                .positional('sourceFile', {
                    describe: 'image source path (ex: ./example/source.png)',
                    default: undefined,
                })
                .positional('saveFile', {
                    describe: 'save file path (ex: ./example/lossySquash/先壓縮後縮圖image.png)',
                    default: undefined,
                })
                .positional('width', {
                    describe: 'image resize width',
                    default: undefined,
                })
                .positional('height', {
                    describe: 'image resize height',
                    default: undefined,
                });
        }, (argv) => {
            const run = require('./losslessSquash');
            run(argv);
        })
        .demandCommand(1)
        .parse();
};

