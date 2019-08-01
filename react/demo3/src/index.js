import React from 'react';
import ReactDom, {render} from 'react-dom';
// //react有2部分组成,一个叫react包，react-dom语法都是ES6。
// //import 语法要放置到页面的最顶部
// //ReactDom中就有一个方法比较常用叫render
//
// //react元素，JSX元素   javascript+xml   html也是xml的一种   javascript+html
// //jsx html部分和原生html基本一样，不是完全一样
// //jsx最终会通过babel进行转义，React.createElement写法
//
// //jsx渲染过程
// //1. 将jsx转换成react元素
// //2. 将react元素变成一个虚拟对象
// //3. 通过render方法渲染出一个对象
//
// function ReactElement(type,props) {
//     this.type = type;
//     this.props = props;
// }
// function createElement(type,props={},...childrens){
//     childrens.length===1?childrens = childrens[0]:void 0;
//     return new ReactElement(type,{...props,children:childrens})
// }
//
// let render = (eleObj,container)=>{
//     // 先取出第一层 进行创建真实dom
//     let {type,props} = eleObj;
//     let elementNode = document.createElement(type); // 创建第一个元素
//     for(let attr in props){ // 循环所有属性
//         if(attr === 'children'){ // 如果是children表示有嵌套关系
//             if(typeof props[attr] == 'object'){ // 看是否是只有一个文本节点
//                 props[attr].forEach(item=>{ // 多个的话循环判断 如果是对象再次调用render方法
//                     if(typeof item === 'object'){
//                         render(item,elementNode)
//                     }else{ //是文本节点 直接创建即可
//                         elementNode.appendChild(document.createTextNode(item));
//                     }
//                 })
//             }else{ // 只有一个文本节点直接创建即可
//                 elementNode.appendChild(document.createTextNode(props[attr]));
//             }
//         }else if(attr === 'className'){ // 是不是class属性 class 属性特殊处理
//             elementNode.setAttribute('class',props[attr]);
//         }else{
//             elementNode.setAttribute(attr,props[attr]);
//         }
//     }
//     container.appendChild(elementNode)
// };
//
// render(<h1 className='red'>dayuer<span>性别女</span></h1>, document.getElementById('root'))

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