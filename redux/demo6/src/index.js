import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './bootstrap.min.css';

import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

