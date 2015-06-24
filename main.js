// must run the following:
// npm install request
// npm install MD5
// npm install firebase
// to test use:
// curl localhost:8888/gravatarUrl/samer.buna@gmail.com
// curl localhost:8888/Calc/4+5
// curl localhost:8888/Counts/A%20Sentence%20here

var fs = require("fs"),
  http = require("http"),
  request = require('request'),
  url = require('url'),
  Calc = require('./calc'),
  Firebase = require('firebase'),
  md5 = require('MD5');

http.createServer(responseHandler).listen(process.env.PORT);

var fbRef = new Firebase(process.env.FB_URL);
var fbEntriesRef = fbRef.child("entries");
var totalsRef = fbRef.child("totals");

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (err,data) {
      res.end(data);
    });
  } else {
    var apiEndpoint = req.url.match(/\/(\w+)\/?(.+)?/i)[1];
    var apiValue = req.url.match(/\/(\w+)\/?(.+)?/i)[2];
    var apiResult;
    res.writeHead(200, {"Content-Type": "text/plain"});
    switch(apiEndpoint) {
      case 'gravatarUrl':
        apiResult = md5(apiValue);
        res.end('http://www.gravatar.com/avatar/'+ apiResult+"\n")
        break;
      case 'Calc':
        apiResult = Calc(apiValue);
        res.end(apiResult+"\n");
        break;
      default:
        apiResult = null;
        res.end();
    }

    fbEntriesRef.push({
      apiEndPoint: apiEndpoint,
      apiValue: apiValue,
      apiResult: apiResult,
      timestamp: Firebase.ServerValue.TIMESTAMP,
      ipAddress: req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    var useCounter = totalsRef.child(apiEndpoint);
    useCounter.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
  }
}