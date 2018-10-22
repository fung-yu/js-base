var urlstr = "http://www.test/?name='ww'&sex='female'&xx='nocare'";
console.log(getURLParams(urlstr));
// console.log(getURLParams_replace(urlstr));
// function getURLParams(urlstr) {
//     var obj = {};
//     var afterpart = urlstr.split('?')[1];
//     var itemsArray = afterpart.split('&');
//     for (let i = 0; i < itemsArray.length; i++) {
//         var element = itemsArray[i];
//         elementArray = element.split('=');
//         obj[elementArray[0]] = elementArray[1];
//     }
//     return obj; 
// }

// function getURLParams_replace(urlstr) {
//     let afterpart = urlstr.split('?')[1];
//     var itemsArray = afterpart.split('&');
//     // itemsArray.join(',').replace(/=/g, ':');
//     for (let i = 0; i < itemsArray.length; i++) {
//         let element = itemsArray[i];
//         itemsArray[i] = element.replace('=', ':');
//     }
//     var jsonstr = '{'+itemsArray.toString()+'}';
//     return JSON.parse(jsonstr);
// }

function getURLParams(str) {
    var newA = document.createElement('a');
    newA.setAttribute('href', str);
    var search = newA.search.substr(1);
    var hash = newA.hash.substr(1);
    var result = {};
    hash ? result.hash = hash : null;
    searchArray = search.split('&');
    searchArray.forEach(element => {
        var array = element.split('=');
        result[array[0]] = array[1];
    });
    return result;
}