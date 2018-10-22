// function queryAllId(id) {
//     var allElements = document.getElementsByTagName('*');
//     // console.log(allElements);
//     result = [];
//     for (let i = 0; i < allElements.length; i++) {
//         if (allElements[i].id === id) {
//             result.push(allElements[i]);
//         }
//     }
// }

function queryAllId(id) {
    var allElements = document.getElementsByTagName('*');
    result = [];
    for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].id === id) {
            result.push(allElements[i]);
        }
    }
}
// console.log(queryAllId('haha'));

// 方法二 :浏览器会把id，自动定义成变量
console.log(haha);
