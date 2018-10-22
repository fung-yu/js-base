function next(ele) {
    var next = ele.nextSibling;
    while (next && next.nodeType !== 1) {
        next = next.nextSibling;
    }
    return next;
}

var ele = document.getElementById('first');
console.log(next(ele));