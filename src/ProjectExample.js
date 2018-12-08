
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';

const _progress = require('cli-progress');
const _colors = require('colors');
const mkdirp = require('mkdirp');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

const Glob = require("glob").Glob;

import Project from './Project.js';

export default class ProjectExample extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        //console.log( 'ProjectExample', Date.now() )
        this.initEnv();
        //this.initProgress();
        this.calcMatchFile();
    }

    initEnv(){
        this.cmd =  path.resolve( `${this.app.copyPath}/${this.app.re_pattern}` )

        this.processPath = path.resolve( this.app.copyPath );
    }

    traverse( dir, cur = [], level = 1 ){
        if( level > this.app.subfolder_level ) return;

        fs.readdir( dir, ( err, list ) => {
            list.map( (itemName)=>{
                let tmpPath = path.resolve( dir, itemName );
                
                fs.stat( tmpPath, ( err, stats ) => {

                    let tmpCur = cur.slice();
                    tmpCur.push( itemName );

                    if( level === this.app.subfolder_level ){

                        console.log( 
                            //tmpPath
                            tmpCur
                            , stats.isDirectory()
                            , stats.isFile()
                            , stats.isSymbolicLink()
                        );

                        let sourcePath = tmpCur.slice();
                        sourcePath.unshift( this.app.copyPath );
                        sourcePath = path.resolve( sourcePath.join('/') );

                        let targetPath = tmpCur.slice();
                        targetPath.unshift( this.app.targetPath );
                        if( stats.isDirectory() ){
                            targetPath.pop();
                        }

                        targetPath = path.resolve( targetPath.join('/') );

                        let mkdir = targetPath;

                        if( stats.isFile() ){
                            mkdir = path.resolve( mkdir, '..' );
                        }

                        /*
                        console.log( '       ', sourcePath );
                        console.log( targetPath );
                        console.log( mkdir );
                        */

                        fs.exists( mkdir, ( exists ) => {
                            //console.log( mkdir, exists );

                            if( !exists ){
                                mkdirp( mkdir, ( err ) => {
                                    this.copyAction( sourcePath, targetPath );
                                });
                            }else{
                                this.copyAction( sourcePath, targetPath );
                            }
                        });

                        return;
                    }

                    if( stats.isDirectory() ){
                        this.traverse( tmpPath, tmpCur, level + 1 );
                    }
                });
            });
        });
    }

    copyAction( source, target ){
        //source = path.resolve( [ source, '*' ].join('/') )
        /*
        console.log( '\ncopy action' );
        console.log( 'source', source );
        console.log( 'target', target );
        */

        fs.copy( source, target, ( err ) => {
            console.log( target );
            //console.log( err, target );
        });
    }

    calcMatchFile(){
        //this.files = [];
        this.count = 0;
        this.processFile = 0;

        let p = this;

        //this.traverse( this.processPath, [ this.app.subfolder ] );
        this.traverse( this.processPath, [] );

        //console.log( this.cmd );
        //return;
        /*
        */

        //console.time( 'calc-time' );
        this.calcMs = Date.now();

        /*this.matcher = new Glob( this.cmd, {
            //symlinks: this.app.re_pattern
        });*/

        // /home/suches/udocs/git/mergefolder/testdata/map_tiles_develop/subfolder/building/building/zhuhai/15/26726/14294.pbf

        //return;

        /*this.matcher.on( 'match', ( filePath ) => {
            //this.files.push( filePath );
            this.count++;
            //console.log( this.count );
            //console.timeLog( 'calc-time', this.count );
            //console.log( Date.now(), filePath )

            this.calcCur = ( Date.now() - this.calcMs ) / 1000;

            console.log( '匹配的文件数量:', this.count, '已处理的文件数量:', this.processFile, '耗时:', this.calcCur, '秒' );
            console.log( filePath );
        });

        this.matcher.on( 'end', ( filePath )=>{
            //console.log( Date.now(), filePath )
            //console.log( Date.now(), 'ended' )
            //console.log( this.files );
            //console.timeEnd( 'calc-time' );

            this.files = filePath;

            console.log( '           this.cmd', path.resolve( this.cmd ) );
            console.log( '  this.app.copyPath', path.resolve( this.app.copyPath ) );
            console.log( 'this.app.targetPath', path.resolve( this.app.targetPath ) );

            this.calcMsTotal = Date.now() - this.calcMs;
        });

        this.matcher.on( 'error', ( filePath )=>{
            //console.log( Date.now(), filePath )
            //console.log( Date.now(), 'error' )
        });

        this.matcher.on( 'abort', ( filePath )=>{
            //console.log( Date.now(), filePath )
            //console.log( Date.now(), 'abort' )
        });*/

    }
    initProgress(){
        this.bar = new _progress.Bar({
            format: '计算文件数量 |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}'
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
