#!/usr/bin/env node

import {run as runLosslessSquash} from '../losslessSquash';
import {run as runLossySquash} from '../lossySquash';
import {Command} from 'commander';

const program = new Command();

program
    .version("1.0.0")
    .command('losslessSquash')
    .option('-s, --sourceFile <path>', 'Source file path')
    .option('-t, --saveFile <path>', 'Target file path')
    .option('-w, --width <number>', 'Image width')
    .option('-h, --height <number>', 'Image height')
    .option('-i, --ignoreOverflowSize', 'Ignore the original image size if it exceeds the specified size')
    .action(runLosslessSquash);

program
    .command('lossySquash')
    .option('-s, --sourceFile <path>', 'Source file path')
    .option('-t, --saveFile <path>', 'Target file path')
    .option('-w, --width <number>', 'Image width')
    .option('-h, --height <number>', 'Image height')
    .option('-q, --quality <number>', 'Image quality')
    .option('-i, --ignoreOverflowSize', 'Ignore the original image size if it exceeds the specified size')
    .action(runLossySquash);

program.parse(process.argv);

const command = program.args[0];
if (!['losslessSquash', 'lossySquash'].includes(command)) {
    console.error('Invalid command');
    process.exit(1);
}
