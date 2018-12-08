"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _Project2 = require("./Project.js");

var _Project3 = _interopRequireDefault(_Project2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _progress = require('cli-progress');
var _colors = require('colors');
var mkdirp = require('mkdirp');

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var Glob = require("glob").Glob;

var ProjectExample = function (_Project) {
    _inherits(ProjectExample, _Project);

    function ProjectExample(app) {
        _classCallCheck(this, ProjectExample);

        return _possibleConstructorReturn(this, (ProjectExample.__proto__ || Object.getPrototypeOf(ProjectExample)).call(this, app));
    }

    _createClass(ProjectExample, [{
        key: "init",
        value: function init() {
            //console.log( 'ProjectExample', Date.now() )
            this.initEnv();
            //this.initProgress();
            this.calcMatchFile();
        }
    }, {
        key: "initEnv",
        value: function initEnv() {
            this.cmd = _path2.default.resolve(this.app.copyPath + "/" + this.app.re_pattern);

            this.processPath = _path2.default.resolve(this.app.copyPath);
        }
    }, {
        key: "traverse",
        value: function traverse(dir) {
            var _this2 = this;

            var cur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            if (level > this.app.subfolder_level) return;

            _fs2.default.readdir(dir, function (err, list) {
                list.map(function (itemName) {
                    var tmpPath = _path2.default.resolve(dir, itemName);

                    _fs2.default.stat(tmpPath, function (err, stats) {

                        var tmpCur = cur.slice();
                        tmpCur.push(itemName);

                        if (level === _this2.app.subfolder_level) {

                            console.log(
                            //tmpPath
                            tmpCur, stats.isDirectory(), stats.isFile(), stats.isSymbolicLink());

                            var sourcePath = tmpCur.slice();
                            sourcePath.unshift(_this2.app.copyPath);
                            sourcePath = _path2.default.resolve(sourcePath.join('/'));

                            var targetPath = tmpCur.slice();
                            targetPath.unshift(_this2.app.targetPath);
                            if (stats.isDirectory()) {
                                targetPath.pop();
                            }

                            targetPath = _path2.default.resolve(targetPath.join('/'));

                            var mkdir = targetPath;

                            if (stats.isFile()) {
                                mkdir = _path2.default.resolve(mkdir, '..');
                            }

                            console.log('       ', sourcePath);
                            console.log(targetPath);
                            console.log(mkdir);

                            _fs2.default.exists(mkdir, function (exists) {
                                console.log(mkdir, exists);

                                if (!exists) {
                                    mkdirp(mkdir, function (err) {
                                        if (err) console.error(err);else console.log('pow!');
                                    });
                                } else {}
                            });

                            return;
                        }

                        if (stats.isDirectory()) {
                            _this2.traverse(tmpPath, tmpCur, level + 1);
                        }
                    });
                });
            });
        }
    }, {
        key: "calcMatchFile",
        value: function calcMatchFile() {
            //this.files = [];
            this.count = 0;
            this.processFile = 0;

            var p = this;

            //this.traverse( this.processPath, [ this.app.subfolder ] );
            this.traverse(this.processPath, []);

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
    }, {
        key: "initProgress",
        value: function initProgress() {
            this.bar = new _progress.Bar({
                format: '计算文件数量 |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
                barCompleteChar: "\u2588",
                barIncompleteChar: "\u2591",
                hideCursor: true
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
    }]);

    return ProjectExample;
}(_Project3.default);

exports.default = ProjectExample;