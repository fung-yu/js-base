import React from 'react';
import * as actions from '../store/action/counter';
//利用react-redux需要导出一个连接后的组件
import {connect} from 'react-redux';

class Counter extends React.Component{
    // constructor(){
    //     super();
    //     this.state = {n: store.getState().counter.num}
    // }
    // componentDidMount() {
    //     store.subscribe(()=>{
    //         this.setState({n: store.getState().counter.num});
    //     })
    // }

    render(){
        return <div>
            <button onClick={()=>{
            // store.dispatch(actions.add(10))
                this.props.add(1)
                }}>+</button>
            {this.props.num}
            <button onClick={()=>{
            // store.dispatch(actions.minus(10));
                this.props.minus(2)
            }}>-</button>
        </div>
    }
}

//connect执行时有两个”函数“，
//1. mapStateToProps  将redux中的状态映射成属性
//2. mapDispatchToProps 将dispatch方法映射成属性
//3. 这两个组件的返回值会作为当前组件的属性
let mapStateToProps = (state) => {//这个函数的参数是state
    return {...state.counter};
}

let mapDispatchToProps = (dispatch) =>{//这个函数的参数是dispatch
    return {
        add: (count)=>{
            dispatch(actions.add(count))
        },
        minus: (count)=>{
            dispatch(actions.minus(count))
        }
    }
}
let bindActionCreators = (actions) => {
    //为什么可以直接传入一个actions，在内部会用这个函数进行包装
    return (dispatch)=>{
        let obj = {};
        for(let key in actions){
            obj[key] = (...args) => {
                dispatch(actions[key](...args));
            }
        }
        return obj;
    }
}
// connect中的mapDispatchToProps可以传入一个actionCreator对象
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);//第二次执行的参数是当前组件
export default connect(state=>({...state.counter}), bindActionCreators(actions))(Counter);//第二次执行的参数是当前组件
