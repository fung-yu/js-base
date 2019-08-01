function createStore(reducer) {//reducer是外界传入的，可以让reducer执行，执行后默认会返回初始化的状态
    let state;//默认还是undefined

    //组件获取状态的
    let getState = () => JSON.parse(JSON.stringify(state));

    //订阅状态发生变化时需要触发的函数
    let listeners = [];
    let subscribe = (fn) => {
        listeners.push(fn);
        return ()=>{
            listeners = listeners.filter(item=>item!==fn)//调第二次的时候可以把函数移除掉
        }
    }

    //用来组件派发动作的
    let dispatch = (action) => {
        state = reducer(state, action);//reducer是根据老状态和派发的动作返回一个新的状态，覆盖掉老状态
        listeners.forEach(item=>item());//状态变化时，重新执行订阅的事件
    }

    dispatch({});//初始化redux的默认状态
    return { getState, subscribe, dispatch}
}

let combineReducers = (reducers) => {
    return (state={}, action)=>{
        let obj = {};
        for (let key in reducers) {
            obj[key] = reducers[key](state[key],action)
        }
        return obj;
    }
}
export {createStore, combineReducers}