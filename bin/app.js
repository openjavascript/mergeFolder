"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require("figlet");

var _figlet2 = _interopRequireDefault(_figlet);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _constant = require("./data/constant.js");

var CONST = _interopRequireWildcard(_constant);

var _data = require("./data/data.js");

var DATA = _interopRequireWildcard(_data);

var _ProjectExample = require("./ProjectExample.js");

var _ProjectExample2 = _interopRequireDefault(_ProjectExample);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var App = function () {
    function App(appRoot, projectRoot, packJSON) {
        _classCallCheck(this, App);

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;

        console.log(['appRoot: ' + this.appRoot, 'projectRoot: ' + this.projectRoot].join("\n"));

        this.init();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            (0, _clear2.default)();

            this.project;
            this.prompt = _inquirer2.default.createPromptModule();
            this.welcome();

            this.system = 1;

            /*
            shell.exec(  [ 
                'cd ' + this.projectRoot
                , 'git config core.fileMode false && git config core.autocrlf false'
            ].join('&&') );
            */

            new Promise(function (resolve) {
                setTimeout(resolve, 1);
            }).then(function () {
                _this.readConfigJson(DATA.Q_CONFIG_FILE[0].default);

                if (_this.config) {
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getConfigFile();
            }).then(function () {
                if (_this.config && _this.config.sourceDir) {
                    _this.subfolder = _this.config.sourceDir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getSubFolder();
            }).then(function () {
                if (_this.config && _this.config.mergeLevel) {
                    _this.subfolder_level = _this.config.mergeLevel;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getSubFolderLevel();
            }).then(function () {
                if (_this.config && _this.config.outputDir) {
                    _this.target_folder = _this.config.outputDir;
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getTargetFolder();
                /*}).then( () => {
                    console.log();
                    return this.getRePattern();*/
                /*}).then( () => {
                    console.log();
                    return this.getShowLog();*/
                /*}).then( () => {
                    console.log();
                    return this.getMultiThread();*/
            }).then(function () {
                console.log();

                var space = '  ';

                _this.sourcePath = _path2.default.resolve(_this.projectRoot, _this.subfolder);
                _this.targetPath = _path2.default.resolve(_this.projectRoot, _this.target_folder);

                console.log(CONST.SPACE + "\u6E90 \u76EE \u5F55: " + _this.sourcePath);
                console.log(CONST.SPACE + "\u76EE\u6807\u76EE\u5F55: " + _this.targetPath);
                console.log(CONST.SPACE + "\u5408\u5E76\u5C42\u7EA7: " + _this.subfolder_level);
                console.log();
                //console.log( `${CONST.SPACE}文件过滤: ${this.re_pattern}` );
                /*
                console.log()
                console.log( `${CONST.SPACE}显示日志: ${this.show_log}` );
                console.log( `${CONST.SPACE}多 线 程: ${this.multi_thread}` );
                */

                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                if (_this.config && _this.config.autostart) {
                    _this.confirm = 'yes';
                    return new Promise(function (resolve) {
                        setTimeout(resolve, 1);
                    });
                }
                console.log();
                return _this.getConfirm();
            }).then(function () {

                if (_this.confirm == 'no') return;
                _this.project = new _ProjectExample2.default(_this);
            });
        }
    }, {
        key: "getConfigFile",
        value: async function getConfigFile() {
            var data = await this.prompt(DATA.Q_CONFIG_FILE);
            this.config_file = data.config_file;
            this.readConfigJson(this.config_file);
        }
    }, {
        key: "readConfigJson",
        value: function readConfigJson(fileName) {
            var configFilePath = _path2.default.resolve([this.projectRoot, fileName].join('/'));
            if (_fsExtra2.default.existsSync(configFilePath)) {
                this.config = _fsExtra2.default.readJsonSync(configFilePath);
            }
        }
    }, {
        key: "getRePattern",
        value: async function getRePattern() {
            var data = await this.prompt(DATA.Q_RE_PATTERN);
            this.re_pattern = data.re_pattern;
        }
    }, {
        key: "getConfirm",
        value: async function getConfirm() {
            var data = await this.prompt(DATA.Q_CONFIRM);
            this.confirm = data.confirm;
        }
    }, {
        key: "getMultiThread",
        value: async function getMultiThread() {
            var data = await this.prompt(DATA.Q_MULTI_THREAD);
            this.multi_thread = data.multi_thread;
        }
    }, {
        key: "getTargetFolder",
        value: async function getTargetFolder() {
            var data = await this.prompt(DATA.Q_TARGER_FOLDER);
            this.target_folder = data.target_folder;
        }
    }, {
        key: "getShowLog",
        value: async function getShowLog() {
            var data = await this.prompt(DATA.Q_SHOW_LOG);
            this.show_log = data.show_log;
        }
    }, {
        key: "getSubFolder",
        value: async function getSubFolder() {
            var data = await this.prompt(DATA.Q_SUBFOLDER);
            this.subfolder = data.subfolder;
        }
    }, {
        key: "getSubFolderLevel",
        value: async function getSubFolderLevel() {
            var data = await this.prompt(DATA.Q_SUBFOLDER_LEVEL);
            this.subfolder_level = data.subfolder_level;
        }
    }, {
        key: "getExample",
        value: async function getExample() {
            var data = await this.prompt(DATA.Q_EXAMPLE);
            this.example = data.example;
        }
    }, {
        key: "fileExists",
        value: function fileExists(file) {
            return _fsExtra2.default.existsSync(file);
        }
    }, {
        key: "welcome",
        value: function welcome() {
            console.log(_chalk2.default.yellow(_figlet2.default.textSync(CONST.APPNAME, { horizontalLayout: 'full' })));
            console.log(_chalk2.default.bold.yellow(CONST.TITLE + " - " + this.packJSON.version));
            console.log();
            console.log(info("github: " + this.packJSON.repository.url));

            console.log();
            console.log('使用:');
            console.log('     方法1: 切换到项目根目录, 然后执行命令 mergefolder');
            console.log(info('         cd projectRoot && mergefolder '));
            console.log();
            console.log('     方法2: 使用 mergefolder 路径, 支持相对路径');
            console.log(info('         mergefolder /var/www/your_project_root '));
            console.log();

            /*
            console.log( this.appRoot );
            console.log( this.projectRoot );
            */
        }
    }]);

    return App;
}();

exports.default = App;
function init(APP_ROOT, PROJECT_ROOT, packJSON) {
    var AppIns = new App(APP_ROOT, PROJECT_ROOT, packJSON);
}