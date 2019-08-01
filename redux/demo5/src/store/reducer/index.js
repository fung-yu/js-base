import counter from './counter';
import todo from './todo';
import {combineReducers} from 'redux';

let reducers = combineReducers({counter, todo});
export default reducers;
