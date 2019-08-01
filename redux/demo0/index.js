//redux 统一的状态管理,不能直接更改状态
function createStore(reducer){//将状态放在一个盒子里 别人改不了
    let state;
    function dispatch(action) {//派发  参数是action动作，规定action是一个对象，这个对象必须有一个type属性{type:'自定义'}
        state = reducer(state, action);//调用写好的方法，这个方法会返回一个新的状态
    }
    dispatch({});//
    let getState =  () => JSON.parse(JSON.stringify(state));
    return {getState, dispatch}
}
let initState = {
    titleState: {color:'red', text:'标题'},
    contentState: {color:'green', text:'内容'}
};
//宏 常量
const CHANGE_TITLE_TEXT = 'change_title_text';
let store = createStore(reducer); //创建容器时需要传递一个管理员
function  reducer(state=initState, action) {//管理员，负责如何更改状态的
    switch (action.type) {//更改状态，要有一个新的状态覆盖掉
        case CHANGE_TITLE_TEXT:
            return {...state, titleState:{...state.titleState,text:action.text}};
    }
    return state;
}

function renderTitle(){
    let title = document.querySelector('.title');
    title.innerHTML = store.getState().titleState.text;
    title.style.color = store.getState().titleState.color;
}
function renderContent() {
    let content = document.querySelector('.content');
    content.innerHTML = store.getState().contentState.text;
    content.style.color = store.getState().contentState.color;
}
function renderApp() {
    renderTitle();
    renderContent();
}

renderApp();

setTimeout(()=>{
    store.dispatch({type:CHANGE_TITLE_TEXT, text: '长标题'})//除了type，我们叫其他属性payload
    renderApp();//每次派发完都需要render
},3000)