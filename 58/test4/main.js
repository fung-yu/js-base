~function () {
    let _array = [];
    function flatten(array) { 
        for(let item of array){
           if (typeof item ==='object' && item instanceof Array){
               flatten(item);
           }else{
               _array.push(item);
           }
        }
    } 
    let array = [1, 2, ['a', 'b', ['c', 'd', ['e'], ['f', 'm', { a: 1 }]]], 3, 4];
    flatten(array)
    console.log(_array);
}()