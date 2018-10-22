function sum() {
    var sum = null;
    for (let i = 0; i < arguments.length; i++) {
        let element = arguments[i];
        element = Number(element);
        isNaN(element)? null: sum += element;
    }
    return sum;
}
console.log(sum(10, '20', 50));


let sum_es6 = (...arg) => {
    arg = arg.filter(item => !isNaN(item));
    return eval(arg.join('+'));
}
console.log(sum_es6(20, '10'));
