var obj = {
  tagName: 'OBJ'
};

function fn() {
  console.log(this.tagName, arguments);
}

// document.body.onclick = fn; //this:body

document.body.onclick = function (e) {
  fn.call(obj, e);
} // 这个方式是可以的。


//bind：不仅把this预先处理为obj了，对于fn原本拥有的一些参数也传递给了FN，不仅如此而且，我们还可以自己传递一些参数
//自己传递的参数不会覆盖默认的，先把自己传递的传递给FN，FN最后一项参数才是默认的E
// document.body.onclick = fn.bind(obj, 100, 200);
document.body.onclick = fn.bind();//this--> window

Function.prototype.myBind = function myBind(context) {
  //this: fn(当前我们需要预先处理this的函数)
  //context:我们需要预先改变this值，如果不传默认值为window
  //arguments：存储包含context在内的所有的实参（只能接受自己在执行myBind时候传递的参数）
  context = context || window;
  var outerArg = Array.prototype.slice.call(arguments, 1);
  console.log(context, arguments, outerArg);

  var _this = this;
  return function(){
    //=>_this: fn
    //=>arguments: 返回的匿名函数接收到的参数
    var innerArg = Array.prototype.slice.call(arguments);
    outerArg = outerArg.concat(innerArg);
    _this.apply(context, outerArg);
  }
}
// fn.myBind(obj, 100, 200);
document.body.onclick = fn.myBind(obj, 100, 200);

