// 高级单例模式
var utils = (function () {
    // 解决所有类数组转化为数组（兼容所有浏览器）
    var toArray = function (likeAry) {
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
    var toJSON = function (str) {
        'JSON' in window ? JSON.parse(str) : eval('(' + str + ')')
    }
    //比较两个数字是否相等
    var numbersCloseEnoughToEqual = function (n1, n2) {
        if (!Number.EPSILON) {
            Number.EPSILON = Math.pow(2, -52);
        }
        return Math.abs(n1 - n2) < Number.EPSILON;
    }

    /**
     * 获取当前元素中的某一样式
     */
    var getCss = function (curEle, attr) {
        var value = null,
            reg = null;
        if (window.getComputedStyle) {
            value = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === 'opacity') {
                value = curEle.currentStyle['filter'];
                var reg = /^alpha\(opcity=(.+)\)$/;
                value = reg.test(value) ? reg.exec(value)[1] / 100 : 1;
            } else {
                value = curEle.currentStyle[attr];
            }
        }
        //去掉单位
        reg = /^-?\d+(\.\d)?(px|pt|rem|em)?$/i;
        reg.test(value) ? value = parseFloat(value) : null;
        return value;
    }
    /**
     * 给某一元素添加样式
     */
    var setCss = function (curEle, attr, value) {
        //opacity IE兼容问题
        if (attr === 'opacity') {
            curEle.style[attr] = value;
            curEle.style['filter'] = 'alpha(opacity=' + value * 100 + ')';
            return;
        }
        //如果是纯数字则，需要加单位px
        var reg = /^(zIndex|zoom|lineHeight|fontWeight)$/i;
        !isNaN(value) && !reg.test(value) ? value += 'px' : null;
        curEle.style[attr] = value;
    }

    /**
     * 批量添加样式
     */
    var setGroupCss = function (curEle, options) {
        if (Object.prototype.toString.call(options) !== '[object Object]')
            return;
        for (var attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(curEle, attr, options[attr]);
            }
        }
    }
    /**
     * 把上面放个方法集成成一个方法
     */
    var css = function () {
        var len = arguments.length;
        if (len >= 3) {
            setCss.apply(this, arguments);
            return;
        }
        if (len >= 2) {
            if (len === 2 && Object.prototype.toString.call(arguments[1]) === '[object Object]') {
                setGroupCss.apply(this, arguments);
                return;
            }
            return getCss.apply(this, arguments);
        }
    }


    /**
     * 获取当前元素距离body的上偏移和左偏移
     * 思路：
     * 1.获取当前元素的偏移量 以及当前元素的父级参照物
     * 2.判断父级参照物是否是BODY，如果不是则循环遍历...
     */
    var offset = function (curEle) {
        var topY = curEle.offsetTop,
            leftX = curEle.offsetLeft,
            parent = curEle.offsetParent;

        while (parent.tagName !== 'BODY') {
            if (!/MSIE 8/i.test(navigator.userAgent)) {
                topY += parent.clientTop;
                leftX += parent.clientLeft;
            }
            topY += parent.offsetTop;
            leftX += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return { X: leftX, Y: topY };
    }

    var boxModal = function (attr, value) {
        //只有scrollTop/scrollLeft可以修改，其他既是修改了也不会生效，所以我们可以这么写
        if (typeof value !== 'undefined') {
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        numbersCloseEnoughToEqual: numbersCloseEnoughToEqual,
        css: css,
        offset: offset,
        boxModal: boxModal
    }
})()