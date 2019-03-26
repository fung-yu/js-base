~ function () {
    /**
     * 
     * @param {*} t : time 已经运动的时间
     * @param {*} b ：begin 当前运动方向的起始位置
     * @param {*} c ：change 当前运动方向的总距离
     * @param {*} d ：duration 当前运动的总时间
     */
    function linear(t, b, c, d) {
        return t / d * c + b;
    }
    /**
     * 
     * @param {*} curEle 当前要运动的元素
     * @param {*} target 当前元素运动的目标位置{xxx:xxx...}
     * @param {*} duration 当前运动的总时间（默认值1000MS）
     * @param {*} callback 回调函数（动画完成后我们处理什么事情）
     */
    function animate(curEle, target, duration, callback) {
        var t = 0,
            d = duration || 1000,
            b = {},
            c = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                b[key] = utils.css(curEle, key);
                c[key] = target[key] - b[key];
            }
        }
        clearInterval(curEle.animateTimer);
        curEle.animateTimer = setInterval(function () {
            t += 17;
            if (t >= d) {
                utils.css(curEle.target);
                clearInterval(curEle.animateTimer);
                // 动画完成后执行回调函数(验证是否为函数。是函数才执行),下面三种都是判断是否是函数
                // typeof callback === 'function'?callback():null;
                callback && callback();
                // callback && callback.call(curEle);

                return;
            }
            var cur = {};
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    cur[key] = linear(t, b[key], c[key], d);
                }
            }
            utils.css(curEle, cur);
        }, 17)
    }
    window.animate = animate;
}()