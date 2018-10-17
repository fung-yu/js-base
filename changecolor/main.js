var box = document.getElementById('box');
var list = box.getElementsByTagName('li');
var color = ['red', 'blue', 'yellow'];
for(var i=0; i<list.length; i++){
    // 隔2行
    // if(i%2 === 0){
    //     list[i].style.color='blue';
    // }else{
    //     list[i].style.color = 'red';
    // }

    //隔三行
    // if(i%3 === 1){
    //     list[i].style.color = 'red';
    // }else if(i%3 === 2){
    //     list[i].style.color = 'blue';
    // }else{
    //     list[i].style.color = 'black'
    // }

    // switch (i%3) {
    //     case 0:
    //         list[i].style.color = 'red';
    //         break;
    //     case 1:
    //         list[i].style.color = 'blue';
    //         break;
    //     default:
    //         list[i].style.color = 'black'
    //         break;
    // }

    // 利用数组，修改颜色
    // list[i].style.color = color[i%color.length];

    // 利用样式类
    // 样式表：优先级依次递减
    // 行内
    // ID
    // 样式类
    // 标签

    list[i].className = 'bg'+i%3;
    // 划过样式,方案一 修改ID 方案一和方案二都是利用的样式优先级实现的
    // list[i].onmouseover = function (params) {
    //     this.id = 'hover';
    // }
    // list[i].onmouseout = function(params) {
    //     this.id = '';
    // }
    

    // 划过样式，方案二 添加行内样式
    // list[i].onmouseover = function (params) {
    //     this.style.backgroundColor = 'yellow';
    // }
    // list[i].onmouseout = function(params) {
    //     this.style.backgroundColor = '';
    // }


    // 把原有的样式保存起来
    // list[i].myOldClass = list[i].className;
    // list[i].onmouseover = function (params) {   
    //     this.className = 'hover';
    // }
    // list[i].onmouseout = function (params) {
    //     this.className = this.myOldClass;
    // }
    
    //方案三 添加class  hover
    list[i].onmouseover = function (params) {
        this.className += ' hover';
    }
    list[i].onmouseout = function (params) {
        this.className = this.className.replace('hover', '');
    }
}

// var csstext = getRealStyle(list[0], 'width')

// function getRealStyle(elem, styleName) {
//     var realStyle = null;
//     //微软
//     if (elem.currentStyle){
//         realStyle = elem.currentStyle[styleName]
//     }
//     //w3c
//     else if(window.getComputedStyle){
//         realStyle = window.getComputedStyle(elem, null)[styleName];
//     }
//     return realStyle;
// }



