import React from "react";
import  {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as CounterActions from '../Store/Reducer/Actions/Counter.action'

function Counter(props) {
  console.log(props)
    return (

  <div>
    <button onClick={props.increment}>+1</button>
    <button onClick={()=>{props.increment_n(5)}}>+5</button>
    <span>{props.count}</span>
    <button onClick={props.decrement}>-1</button>
  </div>
//1、()=>{props.dispatch({type:'increment'})}通过dispatch方法定义一个指令，该指令是个字符串类型，指令是个对象
//2、在组件里面只发送指令 ，指令是个对象 在reducer里面做指令的具体操作，指令的名称通过type传递字符串的形式进行定义
//3、当我们调用dispatch方法就会将指令传回到对应的reducer当中

// <button onClick={()=>{props.dispatch({type:'increment_n',payload:5})}}>+5</button>
//这里的payload（负载）是为了进一步解释dispatch里面的指令
//dispatch 里面有两个参数 一个是type用来解释指令名称 第二个是payload 用来来设定指令怎么发生这个行为

    )
}


/*bindActionCreators({
    increment() {
       return {type:'increment'}},

},dispatch)
*/
//9、bindActionCreators 里面传入两个参数，第一个是个对象，对象类型，里面可以放任意内容
//一般是放指令函数返回就是返回type：‘’ ，本质上是将这个函数拼接到dispatch上，也就是拼接到发送指令的方法上
//这样可以节约自动生成函数不需要专门做一个dispatch函数
//由于会有大量内容一般为了便于理解，从外部引入该部分内容


//export default connect((state)=>({
//   count:state.count
//}))(Counter)

const mapStateToProps = state => ({
    count:state.count 
})
//用来将store里面的数据以props的形式传递，或者说传给props,
//本质是从store里面获取数据，state就是代表store里面的数据，通过props传递给当前组件
const mapDispatchToProps = dispatch=> ({
       ...bindActionCreators(CounterActions,dispatch)
})
//将dispatch函数，交给props
//该函数是个回调函数可以自己调用自己，所以再里面可以自己定义若干函数，分别进执行

//8、由于dispatch里面的函数本质上都是重复执行dispatch函数，react可以有自动生成dispatch指令函数的方法
//所以把上述的注释掉来理解
 /*  const mapDispatchToProps = dispatch=> ({
    increment() {
        dispatch({type:'increment'})
    },
    decrement() {
        dispatch({type:'decrement'})
    },
    increment_n(payload) {
        dispatch({type:'increment_n',payload })
    }
})
*/

export default connect(mapStateToProps,mapDispatchToProps)(Counter)
//connect两个参数 第一个参数是回调函数 从store里面调用状态 第二个也是回调函数从里面要dispatch就是发出指令然后将这些都来了再次调用，将这些传给reducer传过去
//本质就是个回调

/* 7、<button onClick={()=>{props.dispatch({type:'increment'})}}>+1</button>
<button onClick={()=>{props.dispatch({type:'increment_n',payload:5})}}>+5</button>
<span>{props.count}</span>
<button onClick={()=>{props.dispatch({type:'decrement'})}}>-1</button>
*/