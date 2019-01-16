(function () {
    /**
     * 需求：验证18~65岁的年龄
     * 分为三个阶段
     * 1. 18或者19 (18|19)
     * 2. 20~59  ([2-5]\d)
     * 3. 60~65  (6[0-5])
     */
    var reg = /^((18|19)|([2-5]\d)|(6[0-5]))$/;
    console.log(reg.test('12'));
    console.log(reg.test('62'))
    console.log(reg.test(234));

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
    var str = '我是1989年10月24出生';
    var reg = /\d+/g;
    console.log('myExecAll: ', reg.myExecAll(str));
    //等价于string.match()方法
    console.log('string.match', str.match(reg));
    /**
     * 封装一个方法可以获取小分组的内容
     */
    function getLitterClass(reg, str) {
        var ary = reg.exec(str),
            result = [];

        if (!reg.global) {
            return ary;
        }

        while (ary) {
            result.push(ary);
            ary = reg.exec(str);
        }
        return result;
    }

    var str00 = '我是{0}，我爱{1}，2017年是狗年么？'
    var reg00 = /\{(\d+)\}/g;
    console.log('00', getLitterClass(reg00, str00));


    /**
     * 需求：单词首字母大写
     */
    var strToUpper = 'my name is feng-da-yu, i am 27 years old. i am girl!';
    strToUpper.replace(/-/g, '_'); //把中线换成下划线
    strToUpper.replace(/\b(\w)(\w*)\b/g, function () {
        return arguments[1].toUpperCase() + arguments[2]; //把第一个字符变成大写，然后拼接返回字符串
    });
    strToUpper.replace(/_/g, '-'); //把之前的下划线变回减号



    /**
     * 时间模板引擎
     */
    String.prototype.myFormatTime = function myFormatTime() {
        var ary = this.match(/\d+/g);
        var template = arguments[0] || '{0}年{1}月{2}日  {3}时{4}分{5}秒';
        template.replace(/\{(\d+)\}/g, function () {
            var value = ary[arguments[1]] || '0';
            value.length < 2 ? value = '0' + value : null;
            return value;
        });
        return template;
    }
    //'2017-11-07'.myFormatTime() => 2017年11月07日
    var timeStr = '2017-11-07';
    console.log('2017-11-07', timeStr.myFormatTime());
    timeStr.myFormatTime('{1}月{2}日');
    timeStr.myFormatTime('{1}-{2}  {3}:{4}');


    /**
     * 去除字符串首尾空格
     * str.trim() 可以去除首尾空格，但是不兼容
     * str.trimLeft() 去除左边的空格
     * str.trimRight() 去除右边的空格
     */
    String.prototype.myTrim = function myTrim(){
       return this.replace(/^\s+|\s+$/g, '');
    }

    '  wo shi hao ren   '.myTrim();

    /**
     * 地址栏解析
     */
    String.prototype.myQueryURLParameter = function myQueryURLParameter(){
        var obj = {};
        this.replace(/([^?&=#]+)=([^?&=#]+)/g,function(){
            obj[arguments[1]] = arguments[2];
        })
        this.replace(/#([^?&=#]+)/g,function(){
            obj['HASH'] = arguments[1];
        });
        return obj;
    }

     var urlStr = 'http://www.fengyu.com/index.html?name=fengyu&age=28&sex=1#teacher';
     urlStr.myQueryURLParameter();
})()