// must run the following:
// npm install request
// npm install MD5
// to test use:
// curl localhost:8888/gravatarUrl/samer.buna@gmail.com
// curl localhost:8888/Calc/4+5
// curl localhost:8888/Counts/A%20Sentence%20here

var fs = require("fs"),
    http = require("http"),
    request = require('request'),
    url = require('url');

http.createServer(responseHandler).listen(8888);

var md5 = require('MD5');

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  if (req.url === "/") {
  	res.end();
  } else {

   switch(req.url.match(/\/(\w+)\/?(.+)?/i)[1]){
  	case 'gravatarUrl':
			res.writeHead(200, {"Content-Type": "text/plain"});
			var gravEmail = req.url.match(/\/(\w+)\/?(.+)?/i)[2];
			res.end('http://www.gravatar.com/avatar/'+ md5(gravEmail)+"\n") 
			break;
   	case 'Calc':
   		res.writeHead(200, {"Content-Type": "text/plain"});
			var mathProb = req.url.match(/\/(\w+)\/?(.+)?/i)[2];   	
			var num1 = mathProb.match(/(\w)\/?/)[0];  
			var oper = mathProb.match(/(\D)\/?/)[1];  
			var num2 = mathProb.match(/(\w)\/?/)[1];  
			switch(oper){
				case '+':
					var numRes = Number(num1) + Number(num2);
					break;
				case '-':
					var numRes = Number(num1) - Number(num2);
					break;
				case '*':
					var numRes = parseInt(num1) * parseInt(num2);
					break;
				case '/':				
					var numRes = parseInt(num1) / parseInt(num2);
					break;
			}		
			res.end(numRes+"\n");
			break;
		case 'Counts':
			//console.log("got here!");
			
			res.end("got here"+"\n");
		break;

		//console.log("RESULT = " + numRes);
  }
 // /Counts/A%20Sentence%20here
 // decodeURI("http://hello%20there.com")

  }
}


