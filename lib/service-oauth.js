module.exports = function service(app, log, db, name) {

var access_token;
var userid;
var oauth_clientid = 'd8016ba77dc345dfa8681eeee7814d7f';
var oauth_secret = '22222995a0134b22a99956ee184cc527';
  
var uri_token = 'http://localhost:8080/xboson/oauth2/access_token';
var uri_main = 'http://localhost:90/web';
var uri_userinfo = 'http://localhost:8080/xboson/app/a297dfacd7a84eab9656675f61750078/ZYAPP_LOGIN/ZYMODULE_LOGIN/getuserinfo';
var uri_revoke_token = 'http://localhost:8080/xboson/oauth2/revoke_token'
  
log.info("OPEN", uri_main);
  

app.get("/oauth/code", function(req, resp) {
  var code = req.query.code;
  log.info("Code :", code);
  
  var url = [ uri_token,
    '?grant_type=authorization_code',
    '&client_id=', oauth_clientid,
    '&client_secret=', oauth_secret,
    '&code=', code];
  
  hget(url, function(err, data) {
    const parsedData = JSON.parse(data);
    if (parsedData.access_token) access_token = parsedData.access_token;
    resp.send('<pre>'+ JSON.stringify(parsedData, 0, 2) +'</pre><br/><a href="'+ uri_main +'">返回</a>');
    log.info("Token :", access_token);
  });
});


app.get("/oauth/userinfo", function(req, resp) {
  var url = [ uri_userinfo,
    '?openid=admin-pl',
    '&access_token=', access_token,
    '&ems=1',
  ];
  
  hget(url, function(err, data) {
    resp.send("USER INFO: <br/><pre>"+ JSON.stringify(JSON.parse(data), 0, 2) +"</pre>");
  });
});


app.get("/oauth/revoke_token", function(req, resp) {
  var url = [ uri_revoke_token,
    '?client_id=', oauth_clientid,
    '&client_secret=', oauth_secret,
    '&access_token=', access_token,
  ];
  
  hget(url, function(err, data) {
    resp.send("撤销令牌: <br/>"+ data);
  });
});


function hget(url, cb) {
  var http = require('http');
  
  http.get(url.join(''), function(res) {
    res.setEncoding('utf8');
    let rawData = [];
    res.on('data', (chunk) => { rawData.push(chunk); });
    res.on('end', () => {
      try {
        cb(null, rawData.join(''));
      } catch (e) {
        cb(e);
      }
    });
    res.on('error', cb);
  });
}


} // service END