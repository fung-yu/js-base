(function () {
  var link = document.getElementById('link');

  link.onclick = function () {
    utils.boxModal('scrollTop', 0);
  }
  
  window.onscroll = function () {
    //当卷去的高度>=一屏幕的高度时候就显示这个按钮。
    var curScrollTop = utils.boxModal('scrollTop');
    var curClientHeight = utils.boxModal('clientHeight');
    if (curScrollTop >= curClientHeight) {
      utils.css(link, 'display', 'block');
    } else {
      utils.css(link, 'display', 'none');
    }
  }
})()

