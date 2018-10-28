Number.prototype.plus = function plus() {
    // if (arguments.length === 0) {
    //     return this;
    // }
    var value = Number(arguments[0]) || 0;
    return this + value;
}
Number.prototype.minus = function minus() {
    // if (arguments.length === 0) {
    //     return this;
    // }
    var value = Number(arguments[0]) || 0;
    return this - value;
}

var val = (3).plus(2).minus(1);
console.log(val);