function foo(x) {
    x.push(4);
    console.log("1", x);
    x = [4, 5, 6];
    x.push(7);
    console.log("2", x);
}
var a = [1, 2, 3];
foo(a);
/**
 * 结果是：[1,2,3,4]而不是[4,5,6,7].
 * 说明：我们不能通过引用x来改变引用a的指向。只能更改a和x共同指向的值。
 * 由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
 */
console.log('3a', a);


/**
 * 如果要将a的值变为[4,5,6,7],必须更改x指向的数组，而不是为x赋值一个新的数组。
 */

function fooChange(x) {
    x.push(4);
    console.log("1c", x);
    x.length = 0;//清空数组
    x.push(4, 5, 6, 7);
    console.log(x);
}

var a = [1, 2, 3];
fooChange(a);
console.log('ca', a);