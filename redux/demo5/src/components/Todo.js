import React from 'react';
// import store from '../store';
import * as actions from '../store/action/todo';
import {connect} from 'react-redux';
//组件的更新有2中方式： 属性的更新和更新状态, 将redux中的数据转化成自己的状态
class Todo extends React.Component{
    render(){
        return <div>
            <input type="text" onKeyUp={(e)=>{
                if(e.keyCode === 13){
                    this.props.addTodo(e.target.value)
                    e.target.value = ''
                }
            }}/>
            <ul>
            {this.props.todos.map((item, index)=>(<li key={index}>{item}</li>))}
            </ul>
        </div>
    }
}

export default connect(state=>({todos:state.todo}), actions)(Todo);

