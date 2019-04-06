var bannerRender = (function () {
  var container = document.getElementById('container'),
    wrapper = utils.getElementsByClassName('wrapper', container)[0],
    focusBox = utils.getElementsByClassName('focusBox', container)[0],
    arrow = utils.children(container, 'a'),
    arrowLeft = arrow[0],
    arrowRight = arrow[1];
  var bannerData = null,
    wrapperList = null,
    focusList = null,
    wrapperImgList = null;

  // 获取数据
  function queryData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'json/banner.json', false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        bannerData = utils.toJSON(xhr.responseText);
      }
    }
    xhr.send(null);
  }

  // 绑定数据
  function bindData() {
    if (!bannerData) return;
    var str = ``,
      strFocus = ``;
    for (let i = 0; i < bannerData.length; i++) {
      var item = bannerData[i];
      str += `<li class="slide">
                <img src="" data-img="${item.img}" alt="">
            </li>`;

      strFocus += `<li class="${i === bannerData.length - 1 ? 'last' : ''}"></li>`;
    }

    wrapper.innerHTML = str;
    focusBox.innerHTML = strFocus;

    //获取所有的li和img
    wrapperList = wrapper.getElementsByTagName('li');
    focusList = focusBox.getElementsByTagName('li');
    wrapperImgList = wrapper.getElementsByTagName('img');
  }

  // 设置默认展示
  function initDefult(index) {
    index = index || 0;
    utils.css(wrapperList[index], {
      opacity: 1,
      zIndex: 1
    });

    focusList[index].className += ' select';
  }

  // 图片延迟加载
  function computed() {
    if (!wrapperImgList) return;
    for (let i = 0; i < wrapperImgList.length; i++) {
      var curImg = wrapperImgList[i];
      if (curImg.isLoad) continue;
      lazyImg(curImg);
    }
  }

  function lazyImg(curImg) {
    curImg.isLoad = true;
    var tempImg = new Image;
    tempImg.onload = function () {
      curImg.src = this.src;
      curImg.style.display = 'block';
      tempImg = null;
    }
    tempImg.src = curImg.getAttribute('data-img');
  }

  //实现轮播图的自动切换
  var step = 0,//记录当前展示的是第几个slide（索引）从0开始。
    prevStep = 0,//记录上一个展示的slide索引。
    autoInterval = 2000,//自动切换 的时间因子
    autoTimer = null,//自动切换的定时器
    count = 0;//总共的slide数量

  function autoMove() {
    step++;
    if (step === count) step = 0;
    change();
  }

  // 轮播图公共的切换方法
  function change() {
    var curSlide = wrapperList[step],
      prevSlide = wrapperList[prevStep];
    //当前展示的slide变成1
    utils.css(curSlide, 'zIndex', 1);
    //让上一个展示的slide层级变成0
    utils.css(prevSlide, 'zIndex', 0);

    // 当前展示的slide透明度从0~1(动画)
    animate(curSlide, { opacity: 1 }, 200, function () {
      //上一个slide隐藏（透明度为0）
      utils.css(prevSlide, 'opacity', 0);
    });
    //当前展示的这个slide就是下一次切换的上一个slide
    prevStep = step;

    selectFocus();
  }
  //焦点对齐
  function selectFocus() {
    for (let i = 0; i < focusList.length; i++) {
      var item = focusList[i];
      if (i === focusList.length - 1) {
        item.className = i === step ? 'last select' : 'last';
        continue;
      }
      item.className = i === step ? 'select' : '';
    }
  }

  //鼠标划入划出banner区域控制自动切换的暂停和开始
  function bindMouseEvent() {
    //onmouseenter会组织事件的冒泡传播
    container.onmouseenter = function () {
      clearInterval(autoTimer);
      arrowLeft.style.display = arrowRight.style.display = 'block';
    }
    container.onmouseleave = function () {
      autoTimer = setInterval(autoMove, autoInterval);
      arrowLeft.style.display = arrowRight.style.display = 'none';
    }

  }

  //滑过焦点实现切换
  function bindFocus() {
    for (var i = 0; i < focusList.length; i++) {
      focusList[i].myIndex = i;
      focusList[i].onmouseenter = function () {
        step = this.myIndex;
        change();
      }

    }
  }

  //点击左右按钮切换
  function bindArrow(){
    arrowLeft.onclick = function(){
      step --;
      if(step < 0){
        step = count -1;
      }
      change();
    };
    arrowRight.onclick = autoMove;
  }

  return {
    init: function () {
      queryData();
      bindData();
      initDefult(step);
      window.onload = computed;//当页面加载完成后做图片延迟加载

      //实现轮播图的切换
      count = bannerData.length;
      autoTimer = setInterval(autoMove, autoInterval);

      //其他切换方式
      bindMouseEvent();
      bindFocus();
      bindArrow();
    }
  }
})();

bannerRender.init();