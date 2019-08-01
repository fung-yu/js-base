import {createStore} from '../redux';

function reducer(state={number:0}, action) {
    switch (action.type) {
        case 'ADD':
            return {number: state.number + action.amount};
        case 'MINUS':
            return {number: state.number - action.amount};
    }
    return state;
}

export default createStore(reducer);