import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/action';
import TodoItem from './TodoItem';
class TodoList extends React.Component {

    filterData() {
        let todos = [];
        if (this.props.type === 'all') {
            todos = this.props.todos;
        } else if (this.props.type === 'unfinish') {
            todos = this.props.todos.filter((item) => !item.isSelected);
        } else {
            todos = this.props.todos.filter((item) => item.isSelected);
        }
        return todos;
    }

    render() {
        return <div>
            <ul className="list-group">
                {
                    this.filterData().map((item, index) => {
                        return <TodoItem
                            key={index}
                            item={item}
                            changeSelected={(id) => {
                                this.props.changeSelected(id);
                            }}
                            deleteTodo={(id) => {
                                this.props.deleteTodo(id);
                            }} />
                    })
                }

            </ul>
        </div>
    }
}
//一般情况下，组件分为2类， 智能组件（聪明组件）    木偶组件（傻子组件）或者 UI组件
export default connect(state => ({ ...state }), actions)(TodoList);