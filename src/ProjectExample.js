
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';

import * as CONST from './data/constant.js';
import * as DATA from './data/data.js';

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
        this.cmd =  path.resolve( `${this.app.sourcePath}/${this.app.re_pattern}` )

        this.processPath = path.resolve( this.app.sourcePath );
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

        let list = fs.readdirSync( dir );
        list.map( (itemName)=>{
            let tmpPath = path.resolve( dir, itemName );
            
            let stats = fs.statSync( tmpPath );

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
                sourcePath.unshift( this.app.sourcePath );
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

                fs.mkdirpSync( mkdir );
                this.copyAction( sourcePath, targetPath );

                return;
            }

            if( stats.isDirectory() ){
                this.traverse( tmpPath, tmpCur, level + 1 );
            }
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

        console.log( CONST.SPACE + 'coping...' );
        console.log( CONST.SPACE + '源 路 径:', info(source) );
        console.log( CONST.SPACE + '目标路径:', info(target) );

        let r = fs.copySync( source, target, {overwrite: true} );

        let passTime = ( ( Date.now() - this.copyMs ) / 1000 ).toFixed(3);
            passTime += '秒';

        let curPassTime = ( ( Date.now() - curCopyMs ) / 1000 ).toFixed(3);
            curPassTime += '秒';

        console.log( info( CONST.SPACE + '本次耗时:', curPassTime, '总耗时:', passTime ) );
        console.log();
    }
}
