"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _constant = require("./data/constant.js");

var CONST = _interopRequireWildcard(_constant);

var _data = require("./data/data.js");

var DATA = _interopRequireWildcard(_data);

var _Project2 = require("./Project.js");

var _Project3 = _interopRequireDefault(_Project2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
            this.initEnv();
            this.processCopy();
        }
    }, {
        key: "initEnv",
        value: function initEnv() {
            this.cmd = _path2.default.resolve(this.app.sourcePath + "/" + this.app.re_pattern);

            this.processPath = _path2.default.resolve(this.app.sourcePath);
        }
    }, {
        key: "processCopy",
        value: function processCopy() {
            //this.files = [];
            this.count = 0;
            this.processFile = 0;

            this.copyMs = Date.now();
            this.traverse(this.processPath, []);
        }
    }, {
        key: "traverse",
        value: function traverse(dir) {
            var _this2 = this;

            var cur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            if (level > this.app.subfolder_level) return;

            _fsExtra2.default.readdir(dir, function (err, list) {
                list.map(function (itemName) {
                    var tmpPath = _path2.default.resolve(dir, itemName);

                    _fsExtra2.default.stat(tmpPath, function (err, stats) {

                        var tmpCur = cur.slice();
                        tmpCur.push(itemName);

                        if (level === _this2.app.subfolder_level) {
                            /*
                            console.log( 
                                //tmpPath
                                tmpCur
                                , stats.isDirectory()
                                , stats.isFile()
                                , stats.isSymbolicLink()
                            );
                            */

                            var sourcePath = tmpCur.slice();
                            sourcePath.unshift(_this2.app.sourcePath);
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

                            /*
                            console.log( '       ', sourcePath );
                            console.log( targetPath );
                            console.log( mkdir );
                            */

                            _fsExtra2.default.exists(mkdir, function (exists) {
                                //console.log( mkdir, exists );

                                if (!exists) {
                                    mkdirp(mkdir, function (err) {
                                        _this2.copyAction(sourcePath, targetPath);
                                    });
                                } else {
                                    _this2.copyAction(sourcePath, targetPath);
                                }
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
        key: "copyAction",
        value: function copyAction(source, target) {
            var _this3 = this;

            //source = path.resolve( [ source, '*' ].join('/') )
            /*
            console.log( '\ncopy action' );
            console.log( 'source', source );
            console.log( 'target', target );
            */

            var curCopyMs = Date.now();
            _fsExtra2.default.copy(source, target, function (err) {
                var passTime = ((Date.now() - _this3.copyMs) / 1000).toFixed(3);
                passTime += '秒';

                var curPassTime = ((Date.now() - curCopyMs) / 1000).toFixed(3);
                curPassTime += '秒';

                console.log(CONST.SPACE + '本次耗时:', curPassTime, '总耗时:', passTime, target);
                //console.log( err, target );
            });
        }
    }]);

    return ProjectExample;
}(_Project3.default);

exports.default = ProjectExample;