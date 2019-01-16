/**
     * 正则的exec方法有他的局限性。每次只能捕获一个。
     * 现在我们封装一个myExecAll()方法可以捕获所有满足需求的字符串
     */
RegExp.prototype.myExecAll = function myExecAll() {
    //this:正则
    var str = arguments[0] || '',
        result = [];
    ary = this.exec(str);
    //进来先验证正则里面是不是包含g
    if (!this.global) {
        return ary;
    }

    while (!!ary) {
        result.push(ary[0]);
        ary = this.exec(str);
    }
    return result;
}

/**
 * 
 */