var iframe = document.getElementById('iframe');
getIframeDocument(iframe);

function getIframeDocument(element) {
    console.log(element.contentDocument);
    return element.contentDocument || element.contentWindow.document;
};