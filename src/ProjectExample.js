
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';

const _progress = require('cli-progress');
const _colors = require('colors');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import Project from './Project.js';

export default class ProjectExample extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        //console.log( 'ProjectExample', Date.now() )
        this.initEnv();
        this.initProgress();
    }

    initEnv(){
    }

    initProgress(){
        this.bar = new _progress.Bar({
            format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}'
            , barCompleteChar: '\u2588'
            , barIncompleteChar: '\u2591'
            , hideCursor: true
        });

        this.bar.start(200, 0, {
            speed: "N/A"
        });

        this.bar.update(5, {
            speed: '125'
        });

        this.bar.update(50, {
            speed: '125'
        });

    }
}
