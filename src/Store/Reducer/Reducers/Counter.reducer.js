import { DECREMENT, INCREMENT, INCREMENT_N } from "../../ActionTypes/Counter.actions.types"

const initialState = {
    count:20
}




export default  function CounterReducer(state = initialState,action) {
    switch(action.type) {
      case INCREMENT:
        return {
            count:state.count+1
         }
       case DECREMENT:
        return { 
            count:state.count-1
        }
        case INCREMENT_N:
        return { 
            count:state.count+action.payload
        }
        default: return state
    }
  
}
//4、通过action接收组件调用dispatch后发送过来的指令 
//5、通过action.type获取指令
//6、进行swtich操作 ，在switch里面进行处理操作
//最后达到修改目的，重新在界面上进行渲染



//将countrreducer里面的条件分支，将字符串类型设置为常量，因为字符串多次使用会麻烦，也因为字符串不提示
//所以要将increment等设置为常量 便于使用和提示报错
//也可以将常量放在单独模块里便于管理