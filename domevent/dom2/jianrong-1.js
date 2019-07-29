Function.prototype.myBind = function myBind(context) {

  context = context || window;
  var _this = this,
    outerArg = Array.prototype.slice.call(arguments, 1);

  if ('bind' in Function.prototype) {
    outerArg.unshift(context);
    return _this.bind.apply(_this, outerArg);
  }
  return function () {
    var innerArg = Array.prototype.slice.call(arguments);
    outerArg = outerArg.concat(innerArg);
    _this.apply(context, outerArg);
  }
}


/**
 * on: 基于DOM2实现事件绑定（兼容所有浏览器）
 * off: 移除当前元素某个事件绑定的某个方法
 * 
 * @parameter
 * curEle:当前需要操作的元素
 * type： 需要绑定方法的事件类型
 * fn:需要绑定的方法
 * 
 * @return
 * 不需要返回值
 */

var on = function (curEle, type, fn) {
  if (document.addEventListener) {
    //标准浏览器
    curEle.addEventListener(type, fn, false);
    return;
  }
  // IE6~8
  //创建自定义事件池：没有才去创建（创建到当前元素的自定义属性上，如果以后再其他方法中需要使用这个事件池，直接获取使用即可）
  //每一个事件应该有一个自己独有的自定义事件池，防止事件之间的冲突。
  if (typeof curEle[type + 'Pond'] === 'undefined') {
    curEle[type + 'Pond'] = [];
    //只要执行on就说明当前元素的这个事件行为将要被触发，我们需要绑定方法，此时我们应该把run方法先放在内置的事件池中，
    //当行为触发时，先执行run方法，在run方法中在把我们自定义事件池中的方法执行
    // curEle.attachEvent('on' + type, function (e) {
    //   run.call(curEle, e);
    // });//把run方法放在内置事件池中，且只需要存放一次，所以代码写在这里。
    curEle.attachEvent('on' + type, run.myBind(curEle));

  }
  var ary = curEle[type + 'Pond'];
  //去重操作：增加之前首先看下当前自定义事件池中是否有这个方法，有责不增加
  for (var i = 0; i < ary.length; i++) {
    if (ary[i] === fn) {
      return;
    }

  }
  //向自定义的事件池中增加方法
  ary.push(fn);
}


var off = function (curEle, type, fn) {
  if (document.removeEventListener) {
    //标准浏览器
    curEle.removeEventListener(type, fn, false);
    return;
  }
  // IE6~8，从自定义事件池中把某个方法移除
  var ary = curEle[type + 'Pond'];
  if (!ary) return;
  for (var i = 0; i < ary.length; i++) {
    if (ary[i] === fn) {
      //这一项就是想移除的
      // ary.splice(i, 1);//会引发数组塌陷，我们删除的时候不能让原始数组中的索引改变
      ary[i] = null;
      break;
    }
  }
};
//run:把自定义事件池中存放的方法依次执行（并且处理this等问题）
var run = function (e) {
  //this：curEle
  if (typeof e.target === 'undefined') {
    e.target = e.srcElement;
    e.which = e.keyCode;
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
    e.preventDefault = function () {
      e.returnValue = false;
    }
    e.stopPropagation = function () {
      e.cancelBubble = true;
    }
  }
  var ary = this[e.type + 'Pond'];
  if (!ary) return;
  for (var i = 0; i < ary.length; i++) {
    var item = ary[i];
    if (item === null) {
      //当前这项在执行的过程中被off方法移除掉了(null不能执行，执行会报错。)
      ary.splice(i, 1);
      i--;
      continue;
    }
    item.call(this, e);
  }
}
