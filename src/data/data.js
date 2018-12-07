
import {
    APPNAME
} from './constant.js';

export const Q_EXAMPLE = [
    { 
        "name": "example"
        , "type": "input"
        , "message": "示例输入"
    }
];

export const Q_SUBFOLDER = [
    { 
        "name": "subfolder"
        , "type": "input"
        , "message": "请输入要合并子目录的文件夹，无需更改请按回车"
        , "default": "map_tiles_dev"
    }
];


export const Q_SUBFOLDER_LEVEL = [
    { 
        "name": "subfolder_level"
        , "type": "input"
        , "message": "请输入要合并文件夹的层次，无需更改请按回车"
        , "default": 1
    }
];

export const Q_SHOW_LOG = [
    { 
        "name": "show_log"
        , "type": "list"
        , "message": "显示日志(log)?"
        , "choices": [ 'yes', 'no' ]
        , "default": 'yes'
    }
];

export const Q_TARGER_FOLDER = [
    { 
        "name": "target_folder"
        , "type": "input"
        , "message": "请输入要复制到那个文件夹"
        , "default": "./map_tiles/map_tiles"
    }
];

export const Q_MULTI_THREAD = [
    { 
        "name": "multi_thread"
        , "type": "list"
        , "message": "是否启用多线程"
        , "choices": [ 'yes', 'no' ]
        , "default": 'no'
    }
];

export const Q_CONFIRM = [
    { 
        "name": "confirm"
        , "type": "list"
        , "message": "开始合并文件？"
        , "choices": [ 'yes', 'no' ]
        , "default": 'yes'
    }
];









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
