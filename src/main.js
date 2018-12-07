#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const get_args = require('./utils/get_args.js');

const APP_ROOT = path.resolve(__dirname, '..');
let PROJECT_ROOT = process.env.PWD;

let args = get_args(process);

if( args.length && /\//.test( args[0] ) ){
    PROJECT_ROOT = path.resolve( args[0] );
}

const pack = fs.readFileSync( `${APP_ROOT}/package.json`, 'utf8' );
const packJSON = JSON.parse( pack );

/*
console.log( args, PROJECT_ROOT );
return;
*/

require('babel-core/register');
/*
const init = require( './app' ).init;
init( APP_ROOT, PROJECT_ROOT, packJSON );
*/

const _progress = require('cli-progress');
var _colors = require('colors');

const bar = new _progress.Bar({
    format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}'
    , barCompleteChar: '\u2588'
    , barIncompleteChar: '\u2591'
    , hideCursor: true
});

bar.start(200, 0, {
    speed: "N/A"
});

bar.update(5, {
    speed: '125'
});

bar.update(50, {
    speed: '125'
});


//bar.stop();
