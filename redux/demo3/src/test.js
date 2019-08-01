let createStore = require('./redux');
function reducer(state={number:0}, action) {
    switch (action.type) {
        case 'ADD':
            return {number: state.number + action.a}
    }
    return state;
}

let store = createStore(reducer);
store.subscribe(function () {
    console.log(store.getState());
});
store.dispatch({type:'ADD',a:1})
store.dispatch({type:'ADD',a:1})
store.dispatch({type:'ADD',a:1})