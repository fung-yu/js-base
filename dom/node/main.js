function pre(ele) {
    var pre = ele.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
}

function next(ele) {
    var next = ele.nextSibling;
    while (next && next.nodeType !== 1) {
        next = next.nextSibling;
    }
    return next;
}

function preAll(ele) {
    var preArray = [];
    var item = pre(ele);
    while (item) {
        preArray.unshift(item);
        item = pre(item);
    }
    return preArray;
}

function nextAll(ele) {
    var nextArray = [];
    var item = next(ele);
    while (item) {
        nextArray.push(item);
        item = next(item);
    }
    return nextArray;
}

function sibling(ele) {
    return [].concat(preAll(ele), nextAll(ele));
}

var first = document.getElementById('first');
console.log('first next', next(first));
console.log('first next all', nextAll(first));

var last = document.getElementById('last');
console.log('last pre', pre(last));
console.log('last pre all', preAll(last));


var middle = document.getElementById('middle');
console.log('sibling', sibling(middle));