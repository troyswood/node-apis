// must run the following:
// npm install request
// npm install MD5

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
   	case 'calc':
   		res.writeHead(200, {"Content-Type": "text/plain"});
			var mathProb = req.url.match(/\/(\w+)\/?(.+)?/i)[2];   	
   		console.log(mathProb);
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
					var numRes = Number(num1) * Number(num2);
					break;
				case '/':				
					var numRes = Number(num1) / Number(num2);
					break;
			}
			res.end(numRes+"\n");
			case 'counts':
				break;

			//console.log("RESULT = " + numRes);


   	break;
   }

 // /Counts/A%20Sentence%20here
 // decodeURI("http://hello%20there.com")

  }
}


