// 时间字符串格式化
// 2018-4-4 16:26:8变成 04月04日 16时26分

var _time = '2018-4-4 16:26:8';
var result_getTimeFormat = getTimeFormat(_time);
console.log(result_getTimeFormat);

var result_getTimeFormat_reg = getTimeFormat_reg(_time);
console.log(result_getTimeFormat_reg);

var formatTime = _time.formatTime();
console.log('formatTime',formatTime);

console.log('2018'.formatTime('{0}-{1}-{2} {3}:{4}'));
// 方案一：split方法
function getTimeFormat(_time) {
    var _timeToArray = _time.split(' ');
    var dateStr = _timeToArray[0];
    var timeStr = _timeToArray[1];
    var month = dateStr.split('-')[1].padStart(2, '0');
    var day = dateStr.split('-')[2].padStart(2, '0');
    var hour = timeStr.split(':')[0].padStart(2, '0');
    var minutes = timeStr.split(':')[1].padStart(2, '0');
    return `${month}月${day}日 ${hour}时${minutes}分`
}

// 方案二：正则表达式
function getTimeFormat_reg(_time) {
    var all = _time.split(/(?:-| |:)/g);
    for (let i = 0; i < all.length; i++) {
        let keepTwo = all[i].padStart(2, '0');
        all.splice(i, 1, keepTwo);
    }
    return `${all[1]}月${all[2]}日 ${all[3]}时${all[4]}分`;
}







