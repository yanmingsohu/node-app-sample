module.exports.connect = connect;

//
// 创建数据库连接
//
function connect(db_name) {
  switch (db_name) {
    case 'mysql':
      return mysql();

    case 'sqlserver':
    case 'oracle':
    default:
      throw new Error("无效的 DB: "+ db_name);
  }
}


function mysql() {
  //
  // mysql 驱动 api 文档: https://github.com/mysqljs/mysql
  //
  var mysql = require('mysql');
  //
  // mysql.createPool 可以创建连接池.
  // mysql.createConnection 创建单独的连接.
  //
  var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mysql',
    connectionLimit : 20, // 最大连接数
  });
  return connection;
}