
# mergefolder 文件目录合并工具

## 工具的作用
    合并指定层级的目录

## 全局安装
    sudo npm install -g mergefolder

## 使用
### 方法1: 切换到项目根目录, 然后执行命令 mergefolder
    cd projectRoot && mergefolder

### 方法2: 使用 mergefolder 路径, 支持相对路径
    mergefolder /var/www/your_project_root

## 参数配置文件 mergefolder.json
	如果运行命令的目录有 mergefolder.json，工具会尝试读取JSON的配置参数，自动填充输入参数

## mergefolder.json 说明
	{
		"sourceDir": "./testdata/map_tiles_develop/subfolder" //要合并文件的源目录
		, "outputDir": "./testdata/map_tiles_develop/map_tiles/default" //合并文件的目标目录
		, "mergeLevel": 2 //在那一层开始合并文件
		, "autostart": false //是否自动开始
	}

