/**
 * 实现多张图片懒加载
 */
var moreImgRender = (function () {
  var _newsBox = document.getElementById('newsBox');
  var _newsData = null;

  function queryData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'list.json', false); //同步请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        _newsData = utils.toJSON(xhr.responseText);
      }
    }
    xhr.send(null);
  }

  function bindHTML() {
    if (!_newsData) return;
    var str = ``;
    for (var i = 0; i < _newsData.length; i++) {
      var item = _newsData[i];
      str += `<li>
              <a href="${item.link}">
                <div class="imgBox">
                  <img src="" alt="" data-img="${item.figure}">
                </div>
                <div class="content">
                  <p class="title">${item.title}</p>
                  <span>${item.comment}</span>
                </div>
              </a>
            </li>`;
    }
    _newsBox.innerHTML = str;
  }

  function computed() {
    var imgList = _newsBox.getElementsByTagName('img');
    for (var i = 0; i < imgList.length; i++) {

      /**
       * 1.获取当前图片
       * 2.计算判断当前图片是否已经全部显示
       */
      var curImg = imgList[i];
      var curBox = curImg.parentNode;
      if (curImg.isLoad) continue;
      var bHeight = utils.boxModal('clientHeight') + utils.boxModal('scrollTop');
      var aHeight = curBox.offsetHeight + utils.offset(curBox).Y;
      if (bHeight >= aHeight) {
        lazyImg(curImg);
      }

    }
  }

  function lazyImg(curImg) {
    curImg.isLoad = true;
    var tempImg = new Image();
    tempImg.onload = function () {
      curImg.src = this.src;
      curImg.style.display = 'block';
      imagFade(curImg);
      tempImg = null;
    }
    tempImg.src = curImg.getAttribute('data-img');
  }

  //imagFade 让当前图片渐现出来
  function imagFade(curImg) {
    var n = 0;
    var timer = setInterval(function () {
      if (n > 1) {
        clearInterval(timer);
        timer = null;
        return;
      }
      n += 0.05;
      utils.css(curImg, 'opacity', n);

    }, 17); //17MS是执行定时器动画相对比较理想的间隔时间
  }

  return {
    init: function () {
      // queryData();
      // bindHTML();
      window.onload = computed;
      window.onscroll = computed;
    }
  }
})();

moreImgRender.init();