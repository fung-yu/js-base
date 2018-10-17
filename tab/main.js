var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('li');
var divList = tabBox.getElementsByTagName('div')

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


for (var index = 0; index < tabList.length; index++) {
    tabList[index].myIndex = index;
    tabList[index].onmouseover = function(params) {
        for(var j = 0; j < tabList.length; j++){
            tabList[j].className = divList[j].className = '';
        }
        this.className = 'active';
        divList[this.myIndex].className = 'active';
    }; 
}
