import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/action';
class TodoHeader extends React.Component{
    getUnfinishCount = () => {
        //过滤数组中没用选中的length

        return this.props.todos.filter(item=>!item.isSelected).length
    }
    render(){
        console.log(this.props);
        return <div>
            <h3>亲你有{this.getUnfinishCount()}件事没完成</h3>
            <input type="text" className="form-control" onKeyUp={(e)=>{
                if(e.keyCode === 13){
                    this.props.addTodo({id:Math.random(), title:e.target.value, isSelected: false});
                    e.target.value='';
                }
            }}></input>
        </div>
    }
}

export default connect(state=>({...state}), actions)(TodoHeader);