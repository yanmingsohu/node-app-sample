var express = require('express');
var fs      = require('fs');
var plib    = require("path");
var db      = require('./lib/db.js');
var log     = require("./lib/log.js");

//
// 浏览器访问 http://localhost:[HTTP_PORT]
//
const HTTP_PORT = 90;

initApp();


function initApp() {
  var applog = log.create("app", "all");
  applog.info("App Startup");

  var basePath    = __dirname + '/lib';
  var dirs        = fs.readdirSync(basePath);
  var servicePatt = new RegExp("service-([a-zA-Z]*).js");
  var dbconn      = db.connect("mysql");
  var app         = express();

  //
  // lib 目录中 'service-' 前缀的脚本作为服务端脚本自动加载.
  // 文件系统文档: http://nodejs.cn/api/fs.html
  //
  dirs.forEach(function(name) {
    var match = servicePatt.exec(name);
    if (!match) return;

    try {
      var serviceName = match[1];
      var file        = plib.join(basePath, name);
      var service     = require(file);
      var slog        = log.create(serviceName, 'all');

      service(app, slog, dbconn, serviceName);

      applog.info("Load Service:", '['+ serviceName +']', 'from', name);
    } catch(err) {
      applog.error("Load Service fail:", err);
    }
  });

  //
  // 托管 www 目录中的静态文件.
  //
  app.use('/web', express.static('www'));

  var server = app.listen(HTTP_PORT, function() {
    applog.info('Listening on port %d', HTTP_PORT);
  });
  
  //
  // 脚本出错, 服务器不会退出, 而是记录错误.
  //
  process.on('uncaughtException', (err) => {
    applog.error(1, `捕获到异常：${err}\n`);
  });
}