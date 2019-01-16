// 高级单例模式
var utils = (function () {
    // 解决所有类数组转化为数组（兼容所有浏览器）
    function toArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry)
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                var cur = likeAry[i];
                ary.push(cur);
            }
        }
        return ary;
    }
    //解决JSON.parse在IE6~7中不兼容的问题
    function toJSON(str) {
        'JSON' in window ? JSON.parse(str) : eval('(' + str + ')')
    }
    //比较两个数字是否相等
    function numbersCloseEnoughToEqual(n1, n2) {
        if (!Number.EPSILON) {
            Number.EPSILON = Math.pow(2, -52);
        }
        return Math.abs(n1 - n2) < Number.EPSILON;
    }
    return {
        toArray: toArray,
        toJSON: toJSON,
        numbersCloseEnoughToEqual: numbersCloseEnoughToEqual
    }
})()