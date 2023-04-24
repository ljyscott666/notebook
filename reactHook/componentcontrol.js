import React, {useState, useRef,useImperativeHandle,forwardRef} from "react"

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