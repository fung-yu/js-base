/**
 * 只处理一个类名的情况
 */
function getEleByClass(strClass, context) {
    context = context || document;
    strClass = strClass.replace(/^\s+|\s+$/,'');
    var result = [];
    var nodeList = context.getElementsByTagName('*');
    /**
     * 正则也可以这么写：
     * var reg = new RegExp('(^| +)'+strClass+'( +|$)');
     * var reg = new RegExp('(^|\\s+)'+strClass+'(\\s+|$)');
     * */
    var reg = new RegExp('(^| +)'+strClass+'( +|$)');
    for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList[i];
        reg.test(item.className)?result.push(item):null;
    }
    return result;
}
console.log(getEleByClass('box1'));