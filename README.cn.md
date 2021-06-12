# 精简服务器框架

只要简单修改即可进行后端应用开发.
要求 nodejs > 6.9.2, npm > 3.0
一个运行中的 mysql > 5.0, 用户名密码: root/root, 或修改 db.js 中的配置.

安装:

`npm install`

启动:

`npm start`

浏览器访问:

`http://localhost:8080/web`


# 文件目录说明

```
index.js            - 程序启动入口  
logs                - 日志目录  
www                 - web 前端文件目录  
lib                 - 源代码目录  
lib/db.js           - 数据库配置
lib/log.js          - 日志配置
lib/service-demo.js - 服务模板, 参考其中的说明
```

# 依赖模块说明

[express](http://expressjs.com/)

使用该模块分解 http 路由, 提供基础 http 相关 api.

[mysql](https://github.com/mysqljs/mysql)

mysql 驱动.

[log4js](https://github.com/log4js-node/log4js-node)

日志库


# 二次开发流程

1. 修改 lib/db.js 使之正确连接数据库.
2. 以 lib/service-demo.js 为模板, 复制该文件为新的模块.
3. 在新模块中写 api 接口.
4. 在 www 目录中写前端.