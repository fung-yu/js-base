// 数组去重方案整理
var _array = [6, 6, true, 'true', true, 'true', NaN, 'NaN', NaN, 'NaN', false, null, undefined, 'undefined', null, 'null', false, true, 'true',{},{}];
var newArray = [];

// 方案一 for  indexOf
// for(var i = 0; i < _array.length; i++){
//     if(newArray.indexOf(_array[i]) == -1){
//         newArray.push(_array[i]);
//     }
// }
// console.log('newArray', newArray);

// 方案二 for for splice
// for (var i = 0; i < _array.length; i++) {
//     for (let j = i+1; j < _array.length; j++) {
//         if(_array[i] === _array[j]){
//             _array.splice(j, 1);
//                 j--;//删除后先--  然后在++  等于没有变
//         } 
//     } 
// }
// console.log(_array);

// 方案三 利用对象属性不能重复的特点来实现
var arrayObj = {};
// for (let i = 0; i < _array.length; i++) {
//     arrayObj[_array[i]] = _array[i];
// }
// for (const key in arrayObj) {
//     newArray.push(arrayObj[key]);
// }
// console.log(newArray);


// 方案四：es6 set
// newArray = Array.from(new Set(_array));
// console.log(newArray);

// 方案五：es6 Set
// newArray = [...new Set(_array)];
// console.log(newArray);
//[6, true, "true", NaN, "NaN", false, null, undefined, "undefined", "null", {…}, {…}]

// 方案六：先排序，在比较,sort:默认情况下，sort方法按升序排列数组项，即最小的值位于最前面、最大的值排在最后面。
// sort方法排序原理：sort方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值，sort()方法比较的也是字符串
// _array = _array.sort();
// console.log(_array);
// for (let i = 0; i < _array.length-1; i++) {
//     if(_array[i] !== _array[i+1]){
//         newArray.push(_array[i]);
//     }
// }
// console.log(newArray);
//[6, "NaN", NaN, NaN, "NaN", {…}, {…}, false, null, "null", true, "true", true, "true", "undefined"]

// 方案七： includes
// for (let i = 0; i < _array.length; i++) {
//     if(!newArray.includes(_array[i])){
//         newArray.push(_array[i]);
//     }
// }
// console.log(newArray);
//[6, true, "true", NaN, "NaN", false, null, undefined, "undefined", "null", {…}, {…}]

// 方案八：利用对象属性不重复
// for (let i = 0; i < _array.length; i++) {
//     if(!arrayObj[_array[i]]){
//         newArray.push(_array[i]);
//         arrayObj[_array[i]] = _array[i];
//     }
// }
// console.log(newArray);

// 方案九：filter
// _array = _array.filter(function(item, index, _array) {
//     return _array.indexOf(item, 0) === index;
// });
// console.log(_array); 

//利用对象属性的唯一性实现
// function distinct(array) {
//     var obj = {};
//     for (let i = 0; i < array.length; i++) {
//         const item = array[i];
//         if(typeof obj[item] != 'undefined'){
//             /*发明已经出现
//             *让数组的最后一项放置在要删除的这个位置
//             *然后删除最后一项
//             *抵消i的i++
//             */
//             array[i] = array[array.length-1];
//             array.length--;
//             i--;
//             continue;
//         }
//         obj[item] = item;
//     }
//     obj = null;//内存销毁
//     return array;
// }
// console.log(_array);

/*
*把数组去重的方法写在内置类的prototype上，成为公共的方法
*/
Array.prototype.myDistinct = function myDistinct() {
    //this是指array当前要处理的那个数组。
    var obj = {};
    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (typeof obj[item] != 'undefined') {
            /*发明已经出现
            *让数组的最后一项放置在要删除的这个位置
            *然后删除最后一项
            *抵消i的i++
            */
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;//内存销毁
    return this;//可以实现链式调用
}

_array.myDistinct();//因为是这么调用的，所以在distinct方法内部的this就是_array
console.log(_array);