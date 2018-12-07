/**
 * 理解iframe中的一些相关信息
 * 
 */
var iframe = document.getElementById('iframe');
console.log('获取iframewindow iframeElement.contentWindow', getIframeWindow(iframe));
console.log('在父页面获取iframe的document element.contentDocument', getIframeDocument(iframe));



/**
 * 在父页面获取iframe的window对象
 * chrome：iframeElement. contentWindow 
 * firefox： iframeElement.contentWindow 
 * ie6：iframeElement.contentWindow
 */
function getIframeWindow(iframeElement){
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
    return  element.contentDocument || element.contentWindow.document;
};