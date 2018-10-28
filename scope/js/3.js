
function fn(i) {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn(10);
f(20);
fn(10)(20)
f(30)
fn(20)(10)
f(40)