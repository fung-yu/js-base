~function () {
    let url = 'http://www.58.com?a=1&a=2&a=3&b=4';
    function queryParam(url, itemX){
        let array = url.split('?')[1].split('&');
        let obj = {};
        for (let item of array) {
            let el = item.split('=');
            if (!obj[el[0]] || obj[el[0]].length === 0) {
                obj[el[0]] = [];
            }
            obj[el[0]].push(el[1]);
        }
        return obj[itemX];
    }
    queryParam(url, 'a');
}()