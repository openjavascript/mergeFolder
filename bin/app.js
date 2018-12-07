"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

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

        console.log();
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

            console.log();

            this.getSubFolder().then(function () {
                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                console.log();
                return _this.getSubFolderLevel();
            }).then(function () {
                console.log();
                return _this.getTargetFolder();
            }).then(function () {
                console.log();
                return _this.getShowLog();
            }).then(function () {
                console.log();
                return _this.getMultiThread();
            }).then(function () {
                console.log();

                var space = '  ';

                _this.copyPath = _path2.default.resolve(_this.projectRoot, _this.subfolder);
                _this.targetPath = _path2.default.resolve(_this.projectRoot, _this.target_folder);

                console.log(space + "\u6E90 \u76EE \u5F55: " + _this.copyPath);
                console.log(space + "\u5408\u5E76\u5C42\u7EA7 : " + _this.subfolder_level);
                console.log(space + "\u76EE\u6807\u76EE\u5F55: " + _this.targetPath);
                console.log();
                console.log(space + "\u663E\u793A\u65E5\u5FD7: " + _this.show_log);
                console.log(space + "\u591A \u7EBF \u7A0B: " + _this.multi_thread);

                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                console.log();
                return _this.getConfirm();
            }).then(function () {
                if (_this.confirm == 'no') return;
                console.log('process merge', Date.now());
                _this.project = new _ProjectExample2.default(_this);
            });
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
            return _fs2.default.existsSync(file);
        }
    }, {
        key: "welcome",
        value: function welcome() {
            console.log(_chalk2.default.yellow(_figlet2.default.textSync(CONST.APPNAME, { horizontalLayout: 'full' })));
            console.log(_chalk2.default.bold.yellow(CONST.TITLE + " - " + this.packJSON.version));
            console.log();
            console.log(info("github: " + this.packJSON.repository.url));

            console.log();
            console.log(info('使用:'));
            console.log(info('     方法1: 使用说明'));
            console.log();
            console.log(info('     方法2: 使用说明'));
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