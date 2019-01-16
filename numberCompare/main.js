var a = 0.1 + 0.2;
var b = 0.3;
utils.numbersCloseEnoughToEqual(a, b); //true
utils.numbersCloseEnoughToEqual(0.00000000001, 0.00000000002);//false