/**
 * 处理多个类名的情况
 * 方法一
 */
function getEleByClass(strClass, context) {
    context = context || document;
    if ('getElementsByClassName' in document) {
        return utils.toArray(context.getElementsByClassName(strClass));
    }
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


/**
 * 方法二：假设法
 */
function getEleByClass(strClass, context) {
    context = context || document;
    if ('getElementsByClassName' in document) {
        return utils.toArray(context.getElementsByClassName(strClass));
    }
    var result = [],
        nodeList = context.getElementsByTagName('*');
    strClass = strClass.replace(/^ +| +$/g, '').split(/ +/);
    for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList[i],
            itemClass = item.className,
            flag = true; //先假设strClass在当前节点中
        for (var k = 0; k < strClass.length; k++) {
            var element = strClass[k],
                reg = new RegExp('(^| +)' + element + '( +|$)');
            if (!reg.test(itemClass)) {
                flag = false;
                break;
            }
        }
        flag ? result.push(item) : null;
    }
    return result;
}

console.log(getEleByClass('box1    box2    '));

/**
 * 方法三  排除法
 * 如果不在nodelist列表中，就把这条从列表中删除
 */
function getEleByClass(strClass, context) {
    context = context || document;
    if (strClass === '') return [];
    if ('getElementsByClassName' in document) {
        return utils.toArray(context.getElementsByClassName(strClass));
    }
    strClass = strClass.replace(/^ +| +$/g, '').split(/ +/);
    var nodeList = utils.toArray(context.getElementsByTagName('*'));

    for (var i = 0; i < strClass.length; i++) {
        var item = strClass[i],
            reg = new RegExp('(^| +)' + item + '( +|$)');
        for (var k = 0; k < nodeList.length; k++) {
            var element = nodeList[k];
            if (!reg.test(element.className)) {
                nodeList.splice(k, 1);
                k--;
            }
        }
    }
    return nodeList;
}

/**
 * 在node原型上扩展该方法，不建议这么做！
 * 使用排除法
 */
Node.prototype.queryElementsByClassName = function queryElementsByClassName(){
    //this --> context
    if(arguments.length === 0) return [];
    var strClass = arguments[0];
    if ('getElementsByClassName' in document) {
        return utils.toArray(context.getElementsByClassName(strClass));
    }

    strClass = strClass.replace(/^ +| +$/g, '').split(/ +/);
    var nodeList = utils.toArray(this.getElementsByTagName('*'));

    for (var i = 0; i < strClass.length; i++) {
        var item = strClass[i],
            reg = new RegExp('(^| +)' + item + '( +|$)');
        for (var k = 0; k < nodeList.length; k++) {
            var element = nodeList[k];
            if (!reg.test(element.className)) {
                nodeList.splice(k, 1);
                k--;
            }
        }
    }

    return nodeList;
}
document.queryElementsByClassName('   box1   box3');