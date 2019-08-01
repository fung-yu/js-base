import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Counter from './components/Counter';
import Todo from './components/Todo';
// react-redux 提供了一个Provider组件, 这里需要将store传入
import {Provider} from 'react-redux';
import store from './store'

class Root extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Counter/>
                    <Todo/>
                </div>
            </Provider>
        )
    }
}


ReactDOM.render(<Root/>, document.getElementById('root'))