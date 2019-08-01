//使用redux流程

//1. 定义当前项目有什么功能  （常量）
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//2. 定义当前项目的默认状态，状态放到reducer中
function reducer(state={number:0}, action) {
    switch (action.type) {
        case INCREMENT:
            return {number: state.number + action.amount}
        case DECREMENT:
            return {number: state.number - action.amount}
    }
    return state;
}
//3. 创建一个容器
let store = createStore(reducer);
//4. 可以在外面进行派发动作

//5. 默认渲染一次
function render() {
    text.innerHTML = store.getState().number;
}
render()//初始化
//6. 订阅状态
store.subscribe(render);//当状态变化时，触发render函数

add.addEventListener('click', function () {
    store.dispatch({type:INCREMENT, amount:3})
}, false)

minus.addEventListener('click', function () {
    store.dispatch({type:DECREMENT, amount:3})
}, false)