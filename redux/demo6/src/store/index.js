import {createStore} from 'redux';
import reducer from './reducer';

let store = createStore(reducer);
//为了在控制台里打印store中的内容
window._store = store;

export default store;