import * as Types from '../action-type';

//组件的更新有2中方式： 属性的更新和更新状态, 将redux中的数据转化成自己的状态
//ActionCreator 就是一个普通函数  返回一个action
function add(count) {
    return {type:Types.INCREMENT, count}
}
function minus(count) {
    return {type:Types.DECREMENT, count}
}
export {add, minus}

