function senCounter(?) {

  var numLet = 0, numSpa = 0, numWords = 0, senCnt;
  res.writeHead(200, {"Content-Type": "text/plain"});
  senCnt = decodeURI(req.url);
  numLet = senCnt.match(/\/(\w+)\/?(.+)?/i)[2].length;
  numSpa = senCnt.match(/\/(\w+)\/?(.+)?/i)[2].length;
  numWords = req.url.match(/\/(\w+)\/?(.+)?/i)[2].length;

 senCnt = "{letters: " + numLet + " spaces: " + numSpa + " words: " + numWords + "}";
}

module.exports = perform;
