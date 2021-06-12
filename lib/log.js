var log4js = require('log4js');

log4js.configure({
  appenders: {
    //控制台输出
    'console': { 
      type: 'console' 
    }, 
    //文件输出
    'file1': {
      type: 'file', 
      filename: 'logs/file1.log', 
      maxLogSize: 1024,
      backups:3,
      category: 'normal' 
    }
  },
  categories: { 
    default: { appenders: ['console', 'file1'], level: 'all' }
  },
});


module.exports.create = create;


//
// 创建日志, 默认日志名 'none' 默认日志级别 'info',
// 日志级别可用: trace, debug, info, warn, error, fatal, all
//
function create(logName, level) {
  var logger = log4js.getLogger(logName || 'none');
  logger.level = level || 'INFO';
  return logger;
}