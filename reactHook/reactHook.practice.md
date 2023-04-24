
 REACT-ROUTE
<Link to='/'>Home </Link>
<Link to="/" > List </Link>
link是哪个链接本身显示的内容  可以理解成栏目名 to属性指定跳转的链接

<Router path='/home' component={Home}></Router>

path是被匹配的路径url  component说明其是哪个组件会被展示 当匹配成功后
 

 <Router component={notFound} ></Router>
当没有匹配到时设置notFound 页面 404
 

 <Router path='/home' component={Home} exact></Router>
 exact是精准匹配 就是必须一模一样才能匹配得到






什么是hook   特殊函数   让函数式组件拥有类组件特性 

为什么要hook

学习成本、数据共享、多个业务逻辑代码会在同一个生命周期函数

hook只能在函数组件中使用   放在函数式组件最外层 放在return上

不能放在条件语句 循环语句 和子函数中


useState 可以在函数组件中保存状态的hook函数

[]= useState()

参数：保存状态的初始值

返回值：   一个数组   当前保存的状态和修改当前保存状态的方法 两个返回值

const [agestate, setAgeState ] =useState(0)

个人认为钩子的就是个封装好的 自带dispatch和action的reducer


特定：在一个函数式组件中可以多次调用
数据类型：简单、对象、数组型 、函数型 所有的都可以
set操作也是异步的  不能直接修改state的原始值 当然 想同一个操作多次执行也得使用回调




useEffect 状态管理hook

相当于 挂载 更新 卸载三个生命周期的集合
 

 useEffect(()=>{ aaa  return()=>{} },[])

 ()=>{ aaa  return()=>{} }第一个参数是个回调函数， 回调体外部执行更新与挂载 return后，里面执行卸载操作。

 []里面放的是依赖 ， 只有当【】里面的数据发生更新时才触发

 可以把代码函数化 一个useEffect只写一个功能，避免像componentDidMount里面，同一个周期写一堆方案造成混乱。


 useContext

 const UserContext = createContext({})
 const {Provider,Consumer } =UserContext 
 用createContext（）拿出上下文
 然后注册provider和consumer


 function Header () {
      return (
    <Consumer>
    {
       value => {
        return(
            <div>
            <p>value.name</p>
            </div>
        )
       }
    }
    </Consumer>
)

 }
 Header是子组件 ，利用consumer包裹回调函数 在回调函数里面就可以调用提供者 provider里面的数据了


 function App()
 return{
  <div>
     <Provider value={{'name':'syy','age':18}}>
     <Header />
     
     
     </Provider>
     //这里也可以用 <UserContext.Provider> 就是说不解构
     //userContext而是打点调用也可以，可以解决多个生产者问题

  </div>
 }
 app是父组件 也是生产者 通过provider包裹向下传递了 value属性给被provider包裹的组件，也就是其子组件

 
 function Header () {

const userInfo = useContext(UserContext)

      return (
 <Consumer>   
    {
      value  => {
        return(
            <div>
            <p>value.name</p>
            </div>
        )
       }
    }

  // <p>{userInfo.name}</p> 跟上面一样的
  // 用useContext钩子是好事，但是懂context这个东西本身更加重要
  //context是让不知道哪个层级的子组件可以调用指定某层父组件的方法
//useContext是防止嵌套，让用户想使用哪一个生产者提供的数据都可以
 </Consumer>
   
  )
}



useReducer（）
用来接管一部分useState的场景, 用来处理数据，传递两个参数
第一个是处理数据的手段，第二个是处理数据的类型,不同数据 但是相同操作就可以使用useReducer来操作

用法：const [Numstate,dispacch] = useReducer(reducer, {num:0})

e.g  

funtion reducer（Numstate，action)  {
  switch(action.type) {
    case 'add':
      return {...Numstate,num:state.num+1}
    case 'sub':
       return {...Numstate,num:state.num-1} 
    default:
       return {...Numstate}
  }
}

 以上就是处理数据的手段，我估计后面可以跟reducer里面的方法一样写成createReducer类似的，但是目前不知道 还不会

 functon Home() {
   const [Numstate,dispacch] = useReducer(reducer, {num:0})
    return(
        <div>
    <button onClick={()=>{dispatch({type:'add'})}} >+1</button>
       </div>
    )
 }



useCallback

前置知识：  const Memecomponent = memo(component)
memo方法可以让其他组件不受 重新渲染的那个组件影响 使其局部更新 不影响整体

useCallback=(()=>{},[])
参数1：函数
参数2：依赖，以数组形式展示
当参数2里面的依赖发生变化时  参数1才会发生对于函数的改变，对应的组件才会被重新渲染




useMemo
useCallback的底层是通过useMemo进行实现的

useMemo(()=>{ return anything },[])


const decrement = useMemo(()={
  return ()=> {setAgeState(ageState-1)}
},[ageState])

解读上述这个例子，当ageState发生改变，useMemo执行return后面的句子
看似和useCallback一样  实际上不一样，useCallback执行的一定是个函数。但是useMemo可以是任何符合语法的内容。
useMemo何useCallback都是用来优化性能


useRef 获取元素相关操作

useRef可以获取元素 也可以保存状态

const oP = useRef（）
//const oP = createRef（）
在获取元素方面 useRef 和createRef是同样能力的 都是通过current属性来查看内容 都是通过ref方法来给到对应元素，但是useRef可以保存状态包括元素、数值等
console.log(oP.current) //可以通过current属性 元素内容
<p ref={oP}>p element</p>

useRef 可以用于获取元素 
       可以保存数据
       保存的数据除非手动修改，否则不会改变





useImplerativeHandle 
function Home(props, oHome) {
  
    const oInput = useRef() 
    //自己获取自己的input元素的控制权  
    useImperativeHandle(oHome,()=>{
        return { 
            setValue:()=>{
                oInput.current.value="selfcontrol"
            }
        }
    })
    //useImperativeHandle 
    //第一个参数是其他组件要控制本组件传递的参数，
    //第二个参数是一个函数 里面要有return  return后面的就是自己愿意暴露的内容
    //愿意暴露的内容可以自己设定方法，把控制权留在本组件内
//通过 useImperativeHandle来过滤对其他组件暴露的内容，可以让组件自己设置暴露的方法
return(
    <div>
        <h2>Home zujian</h2>
        <input ref={oInput}></input>
    
    </div>
 )
// <input ref={oInput}></input>让input被自己内部的oInput接管
}

const ForwardHome = forwardRef(Home)

function App() {

const oHome =useRef()

function BtnClick() {
oHome.current.value = 'sdsdasdsdasdads'

  }


    return(
      <div>
        <ForwardHome ref={oHome} ></ForwardHome>
        <button onClick={()=>{BtnClick()}}></button>
      </div>

    )
}
//解释一下这个流程 ， 首先app里面用useRef获取了 Home组件本身
//然后通过forwardRef将Home组件变成了可互相访问的ForwardHome组件
//然后再通过传参的方式 将oHome的操作挂载在home中的input上





useLayoutEffect
useLayoutEffect绝大多数情况跟useEffect等效 但是useLayoutEffect比useEffect永远都先发生，在还没有渲染时就执行了，在修改样式时使用场景。