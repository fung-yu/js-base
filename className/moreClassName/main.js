/**
 * 处理多个类名的情况
 */
function getEleByClass(strClass, context) {
    context = context || document;
    strClass = strClass.replace(/^\s+|\s+$/, '');
    var classArray = strClass.split(/\s+/);
    var result = [];
    var nodeList = context.getElementsByTagName('*');

    for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList[i];
        for (var k = 0; k < classArray.length; k++) {
            var element = classArray[k];
            var reg = new RegExp('(^| +)' + element + '( +|$)');

            if (!reg.test(item.className)) break;
            if (reg.test(item.className) && k === classArray.length - 1) {
                result.push(item);
            }
        }
    }
    return result;
}
console.log(getEleByClass('box1    box2    '));