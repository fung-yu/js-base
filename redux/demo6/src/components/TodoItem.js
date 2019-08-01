import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/action';

class TodoItem extends React.Component {
    render() {
        let { item } = this.props;
        return <li className="list-group-item">
            <input type="checkbox" checked={item.isSelected} onChange={(e) => {
                this.props.changeSelected(item.id)
            }}></input>
            {item.title}
            <button className="btn btn-xs pull-right" onClick={(e) => {
                this.props.deleteTodo(item.id)
            }}>&times;</button>
        </li>
    }
}

export default TodoItem;
