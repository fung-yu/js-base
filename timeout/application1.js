/**
 * 同步异步编程应用
 */
// 6 6 6 6 6
// for (var i = 1; i <=5; i++) {
//     setTimeout(function(){
//         console.log(i);
//     }, 10);

//  }


// 6 6 6 6 6
// for (var i = 1; i <=5; i++) {
//    setTimeout(function(){
//        console.log(i);
//    }, i*10);

// }

// 6 6 6 6 6
// for (var i = 1; i <= 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, (5 - i) * 10);

// }


/**
 * 下面2种方法可以输出  5  4 3 2 1
 */

// for (let i = 1; i <= 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, (5 - i) * 10);

// }

for (var i = 1; i <= 5; i++) {
    (function(i){
        setTimeout(function () {
            console.log(i);
        }, (5 - i) * 10);
    })(i);

}