//
// [demo 说明]
//
// 该文件为服务脚本模板, 必须导出一个这样签名的函数用作服务初始化;
// 文件名: 'service-[1].js' [1] 将作为服务路径中的前缀(服务组).
//
module.exports = function service(app, log, db, name) {

//
// [API 接口 "/demo/t1"]
// 完整的服务接口参考: http://expressjs.com/en/guide/routing.html
//
app.get("/demo/t1", function(req, resp) {
  //
  // 返回一个字符串可以用 resp.send("xxxx") 但只能调用一次.
  //
  resp.write("<p>is working !<p>");
  if (req.query) {
    resp.write("<p>parameter:");
    resp.write(JSON.stringify(req.query));
    resp.write("<p>");
  }
  resp.end();
});


//
// [API 接口 "/demo/select"]
// 做一个简单的查询, 客户端使用 ajax 调用该接口.
// req 请求对象; resp 应答对象; next 方便返回错误, 或进入下一个处理函数 (参考 express api).
//
app.get("/demo/select", function(req, resp, next) {
  //
  // 这里查询 mysql 提示表中的 10 条数据.
  // 单个 query 不需要 close; 除非使用 db.getConnection(...)
  //
  db.query('select * from mysql.help_topic limit 10', function(error, results, fields) {
    if (error) {
      //
      // 返回给客户端错误, 约定 code 总是在正确时返回 0, 错误时返回非 0.
      //
      resp.json({ code: 1, error: error.message });
      return;
    }
    //
    // 将结果集/元数据发送给客户端
    //
    resp.send('<pre>'+ JSON.stringify({ code: 0, results: results, fields: fields}, 0, 2) +'</pre>');
  });
});



} // service END