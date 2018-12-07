
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import shell from 'shelljs';

import inquirer from 'inquirer';

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import * as CONST from './data/constant.js';
import * as DATA from './data/data.js';

import ProjectExample from './ProjectExample.js';

export default class App {
    constructor( appRoot, projectRoot, packJSON ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;

        console.log( [ 
            'appRoot: ' + this.appRoot
            , 'projectRoot: ' + this.projectRoot 
            ].join("\n") );

        this.init();

        console.log();
    }

    init() {
        clear();

        this.project;
        this.prompt = inquirer.createPromptModule();
        this.welcome();

        this.system = 1;

        /*
        shell.exec(  [ 
            'cd ' + this.projectRoot
            , 'git config core.fileMode false && git config core.autocrlf false'
        ].join('&&') );
        */

        console.log();

        this.getSubFolder().then( ()=> {
            return new Promise( function( resolve ){
                setTimeout( resolve, 1);
            });
        }).then( () => {
            console.log();
            return this.getSubFolderLevel();
        }).then( () => {
            console.log();
            return this.getTargetFolder();
        }).then( () => {
            console.log();
            return this.getShowLog();
        }).then( () => {
            console.log();
            return this.getMultiThread();
        }).then( () => {
            console.log();

            let space = '  '

            this.copyPath = path.resolve( this.projectRoot, this.subfolder );
            this.targetPath = path.resolve( this.projectRoot, this.target_folder );

            console.log( `${space}源 目 录: ${this.copyPath}` );
            console.log( `${space}合并层级 : ${this.subfolder_level}` );
            console.log( `${space}目标目录: ${this.targetPath}` );
            console.log()
            console.log( `${space}显示日志: ${this.show_log}` );
            console.log( `${space}多 线 程: ${this.multi_thread}` );

            return new Promise( function( resolve ){
                setTimeout( resolve, 1);
            });
        }).then( () => {
            console.log();
            return this.getConfirm();
        }).then( ()=>{
            if( this.confirm == 'no' ) return;
            console.log( 'process merge', Date.now() );
            this.project = new ProjectExample( this );
        });
    }

    async getConfirm(){
        let data = await this.prompt( DATA.Q_CONFIRM );
        this.confirm = data.confirm;
    }

    async getMultiThread(){
        let data = await this.prompt( DATA.Q_MULTI_THREAD );
        this.multi_thread = data.multi_thread;
    }

    async getTargetFolder(){
        let data = await this.prompt( DATA.Q_TARGER_FOLDER );
        this.target_folder = data.target_folder;
    }

    async getShowLog(){
        let data = await this.prompt( DATA.Q_SHOW_LOG );
        this.show_log = data.show_log;
    }

    async getSubFolder(){
        let data = await this.prompt( DATA.Q_SUBFOLDER );
        this.subfolder = data.subfolder;
    }

    async getSubFolderLevel(){
        let data = await this.prompt( DATA.Q_SUBFOLDER_LEVEL );
        this.subfolder_level = data.subfolder_level;
    }

    async getExample(){
        let data = await this.prompt( DATA.Q_EXAMPLE );
        this.example = data.example;
    }
    fileExists( file ) {
        return fs.existsSync( file );
    }

    welcome() {
        console.log(
          chalk.yellow(
            figlet.textSync( CONST.APPNAME, { horizontalLayout: 'full' })
          )
        );
        console.log(
          chalk.bold.yellow(
            `${CONST.TITLE} - ${this.packJSON.version}`
          )
        );
        console.log();
        console.log( info( `github: ${this.packJSON.repository.url}` ) );

        console.log();
        console.log( info( '使用:' ) );
        console.log( info( '     方法1: 使用说明' ) );
        console.log();
        console.log( info( '     方法2: 使用说明' ) );
        console.log();

        /*
        console.log( this.appRoot );
        console.log( this.projectRoot );
        */
    }

}

export function init( APP_ROOT, PROJECT_ROOT, packJSON ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT, packJSON ); 
}

