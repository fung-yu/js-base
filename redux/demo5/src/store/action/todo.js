import * as Types from '../action-type';

function addTodo(text) {
    return {type:Types.ADD_TODO, text}
}

export {addTodo}