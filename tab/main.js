// var tabBox = document.getElementById('tabBox');
// var tabList = tabBox.getElementsByTagName('li');
// var divList = tabBox.getElementsByTagName('div')

//方法一：自定义属性方法
// console.log(tabList);
// for (var i = 0;i < tabList.length; i++){
//     tabList[i]._f_index = i;
//     tabList[i].onclick = function () {
//         console.dir(this);
//         changeTabHandle(this._f_index);
//     }  
// }

// 方法二：var --> let
// for(let i=0; i<tabList.length; i++){
//     tabList[i].onclick = function() {
//         changeTabHandle(i);
//     }
// }

// 方法三：匿名函数
// for(var i=0; i<tabList.length; i++){
//     ~function (i) {
//         tabList[i].onclick = function () {
//             changeTabHandle(i);
//         }
//     }(i)
// }

// 方法四：闭包
// for(var i=0; i<tabList.length; i++){
//     tabList[i].onclick = function (i) {
//         return function() {
//             changeTabHandle(i);
//         }
//     }(i)
// }


// function changeTabHandle(n) {
//     for(var i=0; i<tabList.length; i++){
//         tabList[i].className = '';
//         divList[i].className = '';
//     }
//     tabList[n].className = 'active';
//     divList[n].className = 'active'; 
// }

// 不清空所有的className,而是清空上次的
//属性标记
// beforeIndex = 0;

// for(var i=0; i<tabList.length; i++){
//     tabList[i]._f_index = i;
//     tabList[i].onclick = function() {

//         tabList[beforeIndex].className = '';
//         divList[beforeIndex].className = '';
//         tabList[this._f_index].className = 'active';
//         divList[this._f_index].className = 'active';
//         beforeIndex = this._f_index;
//     }
// }

// for(let i=0; i<tabList.length; i++){
//     tabList[i].onclick = function (params) {
//         tabList[beforeIndex].className = '';
//         divList[beforeIndex].className = '';
//         tabList[i].className = 'active';
//         divList[i].className = 'active';
//         beforeIndex = i;
//     }
// }


// for (var index = 0; index < tabList.length; index++) {
//     tabList[index].myIndex = index;
//     tabList[index].onmouseover = function(params) {
//         for(var j = 0; j < tabList.length; j++){
//             tabList[j].className = divList[j].className = '';
//         }
//         this.className = 'active';
//         divList[this.myIndex].className = 'active';
//     }; 
// }

/**
 * 结构是这样的，就可以实现批量修改
 * <div class='tabBox'>
 *      <ul class = 'tab'>
 *          <li class = 'active'></li>
 *      </ul>
 *      <div class='active'></div>
 * </div>
 */

// ~ function () {
//     var tabBoxList = utils.getElementsByClassName('tabBox');
//     for (var i = 0; i < tabBoxList.length; i++) {
//         var element = tabBoxList[i];
//         change(element);
//     }
//     function change(tabBox) {
//         var tab = utils.getElementsByClassName('tab', tabBox)[0],
//             tabList = utils.children(tab, 'li'),
//             conList = utils.children(tabBox, 'div'),
//             _prevIndex = 0;

//         for (var i = 0; i < tabList.length; i++) {
//             tabList[i].myIndex = i;
//             tabList[i].onclick = function () {
//                 tabList[_prevIndex].className = '';
//                 conList[_prevIndex].className = 'con';

//                 this.className = 'active';
//                 conList[this.myIndex].className = 'con active';
//                 _prevIndex = this.myIndex;
//             }

//         }
//     }

// }()


/**
 * 实现插件，组件的封装，必用构造函数模式
 */
(function(){
    function ChangeTab(tabBox) {
        this.tabBox = tabBox;
        this.init();
    }
    ChangeTab.prototype = {
        constructor: ChangeTab,
        change: function () {
            var _this = this;
    
            for (var i = 0; i < _this.tabList.length; i++) {
                _this.tabList[i].myIndex = i;
                _this.tabList[i].onclick = function () {
                    _this.tabList[prevIndex].className = '';
                    _this.conList[prevIndex].className = 'con';
    
                    this.className = 'active';
                    _this.conList[this.myIndex].className = 'con active';
                    _this.prevIndex = _this.prevIndex = this.myIndex;
                }
    
            }
    
        },

        init: function () {
            var tabBox = this.tabBox;
            var tab = utils.children(tabBox, 'ul')[0];
            this.tabList = utils.children(tab, 'li');
            this.conList = utils.children(tabBox, 'div');
            this.prevIndex = 0;
            this.change();
        }
    }
    window.CT = ChangeTab;
})()

new ChangeTab();