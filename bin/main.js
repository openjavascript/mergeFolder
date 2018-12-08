#! /usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var get_args = require('./utils/get_args.js');

var APP_ROOT = path.resolve(__dirname, '..');
var PROJECT_ROOT = process.env.PWD;

var args = get_args(process);

if (args.length && /\//.test(args[0])) {
    PROJECT_ROOT = path.resolve(args[0]);
}

var pack = fs.readFileSync(APP_ROOT + '/package.json', 'utf8');
var packJSON = JSON.parse(pack);

/*
console.log( args, PROJECT_ROOT );
return;
*/

require('babel-core/register');
var init = require('./app').init;
init(APP_ROOT, PROJECT_ROOT, packJSON);

/*const _progress = require('cli-progress');
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
});*/

//bar.stop();


/*var Glob = require("glob").Glob;*/

//var mg = new Glob( `subfolder/**/*.pbf`, {}, function (er, files) {
//});

//mg.on( 'match', function( arg ){
//console.log( Date.now(), arg )
//});

//mg.on( 'end', function( arg ){
////console.log( Date.now(), arg )
//console.log( Date.now(), 'ended' )
//});

//mg.on( 'error', function( arg ){
////console.log( Date.now(), arg )
//console.log( Date.now(), 'error' )
//});

//mg.on( 'abort', function( arg ){
////console.log( Date.now(), arg )
//console.log( Date.now(), 'abort' )
//});