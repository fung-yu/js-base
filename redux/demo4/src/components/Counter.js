import React from 'react';
import store from '../store';
//组件的更新有2中方式： 属性的更新和更新状态, 将redux中的数据转化成自己的状态
export default class Counter extends React.Component{
    constructor(){
        super();
        this.state = {n: store.getState().counter.number}
    }
    componentDidMount() {
        this.un = store.subscribe(()=>{
            this.setState({n:store.getState().counter.number})
        });
    }

    componentWillUnmount() {//组件销毁时，需要将其监听的函数移除掉
        this.un();
    }

    render(){
        return <div>
            <button onClick={()=>{
            store.dispatch({type:'ADD', amount:1})}
            }>+</button>
            <span>{this.state.n}</span>
            <button onClick={()=>{
                store.dispatch({type:'MINUS', amount:1})}
            }>-</button>
        </div>
    }
}

