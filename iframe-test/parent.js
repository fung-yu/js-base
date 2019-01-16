/**
 * 理解iframe中的一些相关信息
 * 
 */
var iframe = document.getElementById('iframe');
// console.log('获取iframewindow iframeElement.contentWindow', getIframeWindow(iframe));
console.log('在父页面获取iframe的document element.contentDocument', getIframeDocument(iframe));



/**
 * 在父页面获取iframe的window对象
 * chrome：iframeElement. contentWindow 
 * firefox： iframeElement.contentWindow 
 * ie6：iframeElement.contentWindow
 */
function getIframeWindow(iframeElement) {
    return iframeElement.contentWindow;
    //   return iframeElement.contentWindow || iframeElement.contentDocument.parentWindow;
}

/**
 * 在父页面获取iframe的document
 * chrome：iframeElement.contentDocument
 * firefox：iframeElement.contentDocument
 * ie：element.contentWindow.document
 * 备注：ie没有iframeElement.contentDocument属性。
 */
function getIframeDocument(element) {
    console.dir(element);
    return element.contentDocument || element.contentWindow.document;
};


/**
 * 由于各种所有权的不同，尝试确定iframe何时装载完毕是一个很有趣的实验。
 * 非ie浏览器提供了许多有用的方法。
 *      它们让iframe元素拥有load事件，这样我们就可以确定iframe何时装载完毕。
 * 由于iframe元素包含于父级页面中，你也不用担心跨域的限制。
 * 装载本地数据的iframe可以使用监听装载外部数据的iframe完成事件的相同方法。
 * 下面代码在所有非ie浏览器中均适用。
 */

function noIE() {
    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    iframe.onload = function () {
        alert("Iframe is now loaded.");
    };
    document.body.appendChild(iframe);
}


/**
 * 下面的代码能正常运行于所有的浏览器之上。
 * 由于iframe元素包含于父级页面中，因此以上方法均不存在跨域问题。
 * 实际上IE提供了onload事件，但必须使用attachEvent进行绑定。
 */
function iframeOnload() {
    var iframe = document.createElement("iframe");
    iframe.src = "simpleinner.htm";
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
            alert("Local iframe is now loaded.");
        });
    } else {
        iframe.onload = function () {
            alert("Local iframe is now loaded.");
        };
    }
    document.body.appendChild(iframe);
}


//调整iframe的高度


function setFrameHeight() {
    var iframe = document.getElementById('iframe');
    
    var iframeDoc = getIframeDocument(iframe);
    console.log(iframeDoc);
    // var childHeight = iframeDoc.childNodes[1].offsetHeight;
    // iframe.height = childHeight;
}

if (iframe.attachEvent) {
    iframe.attachEvent("onload", function () {
        // alert("Local iframe is now loaded in IE.");
        setFrameHeight();
    });
} else {
    iframe.onload = function () {
        // alert("Local iframe is now loaded in not IE.");
        // setFrameHeight();
        var iframe = document.getElementById('iframe');
        var iframeDoc = getIframeDocument(iframe);
        // console.log(iframeDoc);
    };
}


