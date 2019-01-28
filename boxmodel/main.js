/**
 * 获取某一元素的样式（不管是行内样式还是内嵌样式或者外联样式都可以获得）。
 * curEle:当前元素。
 * attr：要获取的属性。
 * .box {
 *    opacity: 0.2;//在普通浏览器中这么写
 *    filter： alpha(opacity=20) //opacity在IE6~8不兼容，所以在IE低版本中这么写。
 * }
 */
function getCss(curEle, attr) {
  var value = null;
  var regCom = null;
  if ('getComputedStyle' in window) {
    value = window.getComputedStyle(curEle, null)[attr];
  } else {
    //在IE6~8中，处理透明度
    if (attr === 'opacity') {
      value = curEle.currentStyle['filter'];
      //把获得的结果转化为和opcity一样的结果
      var reg = /^alpha\(opcity=(.+)\)$/;
      reg.test(value) ? value = reg.exec(value)[1] / 100 : value = 1;
    } else {
      value = curEle.currentStyle[attr];
    }
  }
  //取消获取的单位，比如获取的是12px=>12
  // var temp = parseFloat(value);
  // !isNaN(temp) ? value = temp : null;

  //如果是复合值比如padding:10px 20px 30px 20px;
  // 我们不去单位
  regCom = /^-?\d+(\.\d)?(px|pt|rem|em)?$/i;
  regCom.test(value) ? value = parseFloat(value) : null;
  return value;
}

console.log(getCss(box, 'padding'));
console.log(getCss(box, 'paddingLeft'));

function setCss(curEle, attr, value) {
  if (attr === 'opacity') {
    curEle.style.opacity = value;
    curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
    return;
  }
  /**
   * 如果传递的是数字大部分是需要加单位的，但是只有某些特殊的是不需要加单位的。
   * 比如 opacity（需要做兼容处理） zoom lineHeight等
   */
  var reg = /^(zIndex|zoom|lineHeight|fontWeight)$/i;
  !isNaN(value) && !reg.test(value) ? value += 'px' : null;
  curEle.style[attr] = value;
}

setCss(box, 'opacity', '0.1');


var obj = utils.offset(box),
  left = obj.left,
  t = obj.top;
console.log(left, t);
