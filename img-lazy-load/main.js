/**
 * 单张图片懒加载的步骤有：
 * 1.img标签的src不存放图片的地址，我们把真实的图片地址放在img自定义的标签data-img中
 * 
 * 2.为了保证当前图片没有真实地址的时候，浏览器中出现叉叉或者出现alt中的内容，
 *    我们一般都会把图片先隐藏（display:none或者opacity:0）,
 *    等到后期把真实图片加载出来了，再让当前图片显示。
 */

/**
 * 需求1： 当默认图片显示完全的时候，开始加载图片。
 * 那么问题来了，什么时候是图片显示完全？
 * 
 */

/**
 * 方法一：
 * 我们认为当图片底部距离显示屏幕的底部大于0的时候，是显示完全。
 */
var imgBox = document.getElementById('imgBox');
var curImg = imgBox.getElementsByTagName('img')[0];

function computed() { 
  if(imgBox.myIsLoad) return;
  var A = imgBox.offsetHeight + utils.offset(imgBox).Y;
  var B = utils.boxModal('clientHeight') + utils.boxModal('scrollTop');
  if (A <= B) {
    imgBox.myIsLoad = true;
    var tempImg = new Image();
   
    tempImg.onload = function () {
      //证明图片可以正常加载（onerror是图片无法正常加载）
      curImg.src = this.src;
      utils.css(curImg, 'display', 'block');
    }
    //部分IE浏览器需要把赋值SRC的操作放在事件绑定的下面才可以
    tempImg.src = curImg.getAttribute('data-img');
  }
}

computed();
window.onscroll = computed;
