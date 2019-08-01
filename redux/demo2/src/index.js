import React from 'react';
import ReactDom, {render} from 'react-dom';
import {createStore} from "./redux";
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

function reducer(state={number:0} ,action) {
    switch (action.type) {
        case INCREMENT:
            return {number: state.number + action.amount}
        case DECREMENT:
            return {number: state.number - action.amount}
    }
    return state;
}
let store = createStore(reducer);
//目的是将redux的状态映射到组件上，更改组件的状态久可以导致视图的刷新
class Counter extends  React.Component{
    constructor(){
        super();
        this.state = {
            number:store.getState().number
        }
    }
    componentDidMount(){//组件渲染完成
        this.unsubscribe = store.subscribe( () => {
            this.setState({
                number:store.getState().number
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        return (
            <div>
                <button onClick={()=>{
                    store.dispatch({type:INCREMENT,amount:3})
                }}>+</button>
                <p>{this.state.number}</p>
                <button onClick={()=>{
                    store.dispatch({type:DECREMENT,amount:3})
                }}>-</button>
            </div>
        )
    }
}
ReactDom.render(<Counter/>, document.getElementById('root'))