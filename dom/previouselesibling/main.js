/*
* 获取当前节点的哥哥元素节点
* @parameter
*   当前元素
* @return
*   返回哥哥节点
*/  
function previousElementSibling(ele) {
    var previous = ele.previousSibling;
    while (previous && previous.nodeType!==1) {
        previous = previous.previousSibling;
    }
    return previous;
}

var ele = document.getElementById('last');
console.log(previousElementSibling(ele));