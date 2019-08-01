import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Counter from "./components/Counter";
import Compute from "./components/Compute";
import Todo from "./components/Todo";

class Root extends React.Component{
    render() {
        return <div>
            <Counter/>
            <Compute/>
            <Todo/>
        </div>
    }
}

ReactDOM.render(<Root></Root>,document.getElementById('root'))