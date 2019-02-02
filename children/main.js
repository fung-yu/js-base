/**
 * 我们可以获取指定元素的所有“元素子节点”，并且我们还可以指定标签名。
 * 例如我们指定标签名是span
 * 方法一
 */
// function children(curEle, tagName) {
//     var result = [];
//     var childList = curEle.childNodes;
//     for (var i = 0; i < childList.length; i++) {
//         var item = childList[i];
//         item.nodeType === 1 ? result.push(item) : null;
//     }
//     if (typeof tagName !== 'undefined') {
//         for (let k = 0; k < result.length; k++) {
//             if(result[k].tagName.toLowerCase()!==tagName.toLowerCase()){
//                 result.splice(k,1);
//                 k--;
//             }
//         }
//     }
//     return result;
// }

/**
 * 方法二
 */
function children(curEle, tagName) {
    var result = [];
    var childList = curEle.childNodes;
    for (var i = 0; i < childList.length; i++) {
        var item = childList[i];
        if (item.nodeType === 1) {
            if (typeof tagName !== 'undefined') {
                if (item.tagName.toLowerCase() === tagName.toLowerCase()) {
                    result.push(item);
                }
                continue;
            }
            result.push(item);
        }
    }
    return result;
}
console.log(children(box, 'span'));