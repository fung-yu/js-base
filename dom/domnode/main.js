/* 
 *   获取当前元素的所有元素子节点
 *   @parameter: 
 *      id:当前元素的id
 *  @return
 *      所有元素子节点
 * by fung 
*/
function children(id) {
    var ele = document.getElementById(id);
    var childrenNodes = ele.childNodes;
    var result = [];
    for (let i = 0; i < childrenNodes.length; i++) {
        var nodeType = childrenNodes[i].nodeType;
        nodeType === 1 ? result.push(childrenNodes[i]):null;
    }
    return result;
}


console.log(children('course'));