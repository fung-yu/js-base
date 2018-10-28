// function add() {
//     var ary = Array.prototype.slice.call(arguments);
//      return eval(ary.join('+'));
// }
function add() {
    var ary = Array.from(arguments);
    return eval(ary.join('+'));
}
console.log(add(1, 2, 3));