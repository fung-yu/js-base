// function queryCode() {
//     var codeArea = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
//     let result = '';
//     for (let i = 0; i < 4; i++) {
//         let index = Math.round(Math.random() * 61);
//         let elem = codeArea.charAt(index);
//         result += elem;
//     }
//     return result;
// }

// function queryCode() {
//     var codeArea = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
//     let result = '';
//     for (let i = 0; i < 4; i++) {
//         let index = Math.round(Math.random()*61);
//         let elem = codeArea.charAt(index);
//         if (result.indexOf(elem)>-1){
//             i--;
//             continue;
//         }
//         result += elem;
//     }
//     return result;
// }

function queryCode() {
    var codeArea = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let result = '';
    while (result.length<4) {
        let index = Math.round(Math.random() * 61);
        let elem = codeArea.charAt(index);
        if(result.indexOf(elem) === -1){
            result += elem;
        }
    }
    return result;
}
let boxCode = document.getElementById('boxCode');
let link = document.getElementById('link');

boxCode.innerHTML = queryCode();

link.onclick = function () {
    boxCode.innerHTML = queryCode();
}