// var count = 0;
// setTimeout(function () {
//     console.log(++count);
// }, 1000);


// setInterval(function () {
//     console.log(++count);
// }, 1000);


/**
 * 定时器的返回值：当我们设置定时器（不管是setTimeout还是setInterval），
 * 都会有一个返回值，返回值是一个数字，
 * 代表当前是在浏览器中设置的第几个定时器（返回的是定时器序号）
 * 1.setTimeout/setInterval虽然是处理不同需求的定时器，但是都是浏览器的定时器，所以设置的时候，返回的序号是依次排列的。
 * 2.setInterval设置定时器会有一个返回值，不管执行多少次，这个代表序号的返回值不变（设置定时器就有返回值，执行多少次是定时器的处理）
 * 
 */

// var timer1 = setTimeout(function () {

// }, 1000);
// console.log(timer1); //1

// var timer2 = setInterval(function () {

// }, 1000);
// console.log(timer2); //2


/**
 * 定时器的清除
 * clearTimeout(序号)/clearInterval(序号)
 * 定时器需要手动清除（也可以关闭浏览器）
 */
// var timer1 = setTimeout(function () {

//     //当方法执行完成之后，定时器没用了，我们清除定时器即可
//     //clearTimeout(timer1);//timer1就是定时器的编号
//     //clearInterval(timer1);//使用它也可以清除掉

//     clearTimeout(timer1);//在浏览器内部把定时器清除掉了（相当于银行业务员在系统中清除我们的排队号）
//     timer1 = null;// 我们手动把之前存储序号的变量赋值为null（相当于我们把排队号那个纸条撕毁扔掉）
// }, 1000);


// var timer2 = setInterval(function () {

// }, 1000);
// console.log(timer2); //2



/**
 * 用setTimeout模拟setInterval的效果（递归）
 */
var oBox = document.getElementById('box');
var target = utils.boxModal('clientWidth') - oBox.offsetWidth;
var step = 50;

function move() {
    clearTimeout(oBox.timer);
    var curLeft = utils.css(oBox, 'left');
    curLeft += step;
    if (curLeft >= target) {
        utils.css(oBox, 'left', target);
        return;
    }
    
    utils.css(oBox, 'left', curLeft);

    oBox.timer = setTimeout(move, 17);
    
}
move();
