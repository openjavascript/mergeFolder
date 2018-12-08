
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
        this.initEnv();
        this.processCopy();
    }


    initEnv(){
        this.cmd =  path.resolve( `${this.app.copyPath}/${this.app.re_pattern}` )

        this.processPath = path.resolve( this.app.copyPath );
    }

    processCopy(){
        //this.files = [];
        this.count = 0;
        this.processFile = 0;

        this.copyMs = Date.now();
        this.traverse( this.processPath, [] );
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
                        /*
                        console.log( 
                            //tmpPath
                            tmpCur
                            , stats.isDirectory()
                            , stats.isFile()
                            , stats.isSymbolicLink()
                        );
                        */

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

        let curCopyMs = Date.now();
        fs.copy( source, target, ( err ) => {
            let passTime = ( ( Date.now() - this.copyMs ) / 1000 ).toFixed();
                passTime += '秒';

            let curPassTime = ( ( Date.now() - curCopyMs ) / 1000 ).toFixed();
                curPassTime += '秒';

            console.log( '本次耗时:', curPassTime, '总耗时:', passTime, target );
            //console.log( err, target );
        });
    }
}
