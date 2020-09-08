import path from 'path';
import fs from 'fs';

import { green, blue } from 'chalk';
import { removeListener, exit } from 'process';

const ROOT_DIR = path.dirname(__dirname);
const readline = require('readline');
const log = console.log;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function removeBuildFolder() {
    fs.rmdirSync(ROOT_DIR, { recursive: true });
    log("Limpeza realizada!")
}

if (process.argv[2]?.toLowerCase() == '-f') {
    removeBuildFolder();
    exit();
}

rl.question(`Você deseja remover a pasta ${green(ROOT_DIR)} ? ${blue('[S/N] | [Y/N]')}\n`, (answer: string) => {

    let lowerAnswer = answer[0]?.toLowerCase();

    if ((lowerAnswer != undefined && (lowerAnswer == 's' || lowerAnswer == 'y')))
        removeBuildFolder();

    rl.close();
});


