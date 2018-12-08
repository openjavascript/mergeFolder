"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Q_CONFIRM = exports.Q_MULTI_THREAD = exports.Q_RE_PATTERN = exports.Q_TARGER_FOLDER = exports.Q_SHOW_LOG = exports.Q_SUBFOLDER_LEVEL = exports.Q_SUBFOLDER = exports.Q_CONFIG_FILE = exports.Q_EXAMPLE = undefined;

var _constant = require("./constant.js");

var Q_EXAMPLE = exports.Q_EXAMPLE = [{
    "name": "example",
    "type": "input",
    "message": "示例输入"
}];

var Q_CONFIG_FILE = exports.Q_CONFIG_FILE = [{
    "name": "config_file",
    "type": "input",
    "message": "请输入配置文件路径",
    "default": "mergefolder.json"
}];

var Q_SUBFOLDER = exports.Q_SUBFOLDER = [{
    "name": "subfolder",
    "type": "input",
    "message": "请输入要合并子目录的文件夹，无需更改请按回车",
    "default": "subfolder"
}];

var Q_SUBFOLDER_LEVEL = exports.Q_SUBFOLDER_LEVEL = [{
    "name": "subfolder_level",
    "type": "input",
    "message": "请输入要合并文件夹的层次，无需更改请按回车",
    "default": 1
}];

var Q_SHOW_LOG = exports.Q_SHOW_LOG = [{
    "name": "show_log",
    "type": "list",
    "message": "显示日志(log)?",
    "choices": ['yes', 'no'],
    "default": 'yes'
}];

var Q_TARGER_FOLDER = exports.Q_TARGER_FOLDER = [{
    "name": "target_folder",
    "type": "input",
    "message": "请输入要复制到那个文件夹",
    "default": "./output"
}];

var Q_RE_PATTERN = exports.Q_RE_PATTERN = [{
    "name": "re_pattern",
    "type": "input",
    "message": "请输入要合并的文件过滤语法",
    "default": "**/*.pbf"
}];

var Q_MULTI_THREAD = exports.Q_MULTI_THREAD = [{
    "name": "multi_thread",
    "type": "list",
    "message": "是否启用多线程",
    "choices": ['yes', 'no'],
    "default": 'no'
}];

var Q_CONFIRM = exports.Q_CONFIRM = [{
    "name": "confirm",
    "type": "list",
    "message": "开始合并文件？",
    "choices": ['yes', 'no'],
    "default": 'yes'
}];

/*
export const Q_INIT_PUBLIC = [
    { 
        "name": "init_public"
        , "type": "list"
        , "message": "是否需要初始化前端public目录"
        , "choices": [ 'yes', 'no' ]
        , "default": 'no'
    }
];


export const Q_IP_LIST = [
    { 
        "name": "ip"
        , "type": "input"
        , "message": "请输入静态资源HOST/IP, 无须设置请按回车。"
    }
];

export const Q_PORT_LIST = [
    { 
        "name": "port"
        , "type": "input"
        , "message": "请输入静态资源端口号, 无须设置请按回车。"
    }
];

export const Q_PASSWORD = [
    { 
        "name": "password"
        , "type": "password"
        , "message": "请输入数据库密码, 无须设置请按回车。"
    }
];
*/