/**
 * JS中动画：
 *    步长固定,但是多长时间运动完成不固定
 */
// var oBox = document.getElementById('box');
// var target = utils.boxModal('clientWidth') - oBox.offsetWidth;

// var timer = setInterval(function () {
//     var curLeft = utils.css(oBox, 'left');
//     curLeft += 10;
//     utils.css(oBox, 'left', curLeft);
//     if (curLeft >= target) {
//         utils.css(oBox, 'left', target);
//         clearInterval(timer);
//         timer = null;
            // return;
//     }
// }, 17);


/**
 * JS动画
 * 固定时间动画
 * 1. target:目标值
 * 2. begin： 起始值
 * 3. change: target - start
 * 4. duration: 总时间
 * 5. 已经运动的时间
 * time/duration => 已经走了百分之多少的距离
 * time/duration*change => 已经运动的距离
 * time/duration*change + begin => 当前元素的位置
 */

//匀速公式：计算当前元素应该运动到的位置
function linear(t, b, c, d) {
    return t / d * c + b;
}
var oBox = document.getElementById('box');
var target = utils.boxModal('clientWidth') - oBox.offsetWidth;
var time = 0,
    duration = 1000,
    begin = utils.css(oBox, 'left'),
    change = utils.boxModal('clientWidth') - oBox.offsetWidth - begin;
var timer = setInterval(function () {
    time += 17;
    if (time >= duration) {
        utils.css(oBox, 'left', target);
        clearInterval(timer);
        timer = null;
        return;
    }
    var curLeft = linear(time, begin, change, duration);
    utils.css(oBox, 'left', curLeft);
}, 17);