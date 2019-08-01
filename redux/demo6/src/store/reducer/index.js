import * as Types from '../action-types';
let initState = {
    type:'all',//默认全部显示
    todos:[
        {isSelected:true, title:'今天吃药了么？', id:1},
        {isSelected:false, title:'今天吃药了么？', id:2}

    ]
};

function reducer(state=initState, action){
    switch(action.type){
        case Types.ADD_TODO:
            return {...state, todos:[...state.todos, action.todo]};
        case Types.CHANGE_SELECTED:
            let todos = state.todos.map((item,index)=>{
                if(item.id === action.id){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            return {...state, todos};
        case Types.DELETE_TODO:
            let _todos = state.todos.filter((item)=>item.id!==action.id);
            return {...state, todos: _todos};
        case Types.CHANGE_CURRENT_TYPE:
            return {...state, type: action.val};
    }
    return state;
}

export default reducer;