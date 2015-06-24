function perform(mathProb) {
  var numRes;
  var num1 = Number(mathProb.match(/^(\d+)/)[0]);
  var oper = mathProb.match(/([*\+\-\/])\/?/)[1];
  var num2 = Number(mathProb.match(/(\d+)$\/?/)[1]);
  console.log(num1, oper, num2);
  switch(oper){
    case '+':
      var numRes = num1 + num2;
    break;
    case '-':
      var numRes = num1 - num2;
    break;
    case '*':
      var numRes = num1 * num2;
    break;
    case '/':
      var numRes = num1 / num2;
    break;
  }
  return numRes;
}

module.exports = perform;