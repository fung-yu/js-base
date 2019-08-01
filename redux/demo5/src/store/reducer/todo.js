import * as Types from '../action-type';
function todo(state=[], action) {
    switch (action.type) {
        case Types.ADD_TODO:
            return [...state, action.text];
    }
    return state;
}
export default todo;