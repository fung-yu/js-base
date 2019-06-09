~function () {
  Function.prototype.myBind = function myBind(context = window, ...outer) {
    if ('bind' in this) {
      return this.bind(...arguments);
    }
    return (...inner) => this.apply(context, outer.concat(inner));
  }

  let on = function (curEle, type, fn) {
    if (document.addEventListener) {
      curEle.addEventListener(type, fn, false);
      return;
    }
    if (typeof curEle['pond' + type] === 'undefined') {
      curEle['pond' + type] = [];
      curEle.attachEvent('on' + type, run.myBind(curEle));
    }

    let pondAry = curEle['pond' + type];
    for (let i = 0; i < pondAry.length; i++) {
      if (pondAry[i] === fn) {
        return;
      };
    }
    pondAry.push(fn);
  }

  let off = function (curEle, type, fn) {
    if (document.removeEventListener) {
      curEle.removeEventListener(type, fn, false);
      return;
    }
    let pondAry = curEle['pond' + type];
    if (!pondAry) return;
    for (let i = 0; i < pondAry.length; i++) {
      if (pondAry[i] === fn) {
        pondAry[i] = null;
        break;
      }
    }
  }

  let run = function (e) {
    e = e || window.event;
    if (!e.target) {
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
    let pondAry = this['pond' + e.type];
    if (!pondAry) return;
    for (let i = 0; i < pondAry.length; i++) {
      let item = pondAry[i];
      if (item === null) {
        pondAry.splice(i, 1);
        i--;
        continue;
      }
      item.call(this, e);
    }

  }

  window.$event = {
    on: on,
    off: off
  }

}()


/**
 * 编译这个文件
 * 1.npm install babel-preset-latest babel-preset-stage-2 
 * 2.新建一个.babelrc 文件
 *    {
 *        "presets":[
 *            "latest","stage-2"
 *         ],
 *        "plugins": []
 *    }
 * 3.babel bind-es6.js -o bind-es5.js
 * 4.引用的时候直接引用bind-es5.js
 *  $event.on()
 *  $event.off()
 */