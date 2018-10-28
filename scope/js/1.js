function fn() {
    var i = 1;
    return function(n) {
        console.log(n+ i++);
    }
}
var f = fn();
f(10);
fn()(10)
f(20)
fn()(20)