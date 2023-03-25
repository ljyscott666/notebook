import React, {Component} from "react";

class AddStudent extends Component {

   constructor()  {
    super()
    this.stateHandler = this.stateHandler.bind(this)
    //简化操作  用bind方法绑定this的指向 确保输入的key的value就是key 的指向
   }
 


    state ={ 
        number:'',
        name:"Tommy",
        sex:'male',
        age:'66',
        college:'大前端',

       hobbies: [
         {  
           id:1,
           title:'篮球',
           isChecked:false 
         },
         {  
            id:2,
            title:'足球',
            isChecked:false
         },
         {   
            id:3,
            title:'橄榄去' ,
            isChecked:false
         }     
  

       ]


    }
    
   origin = JSON.parse(JSON.stringify(this.state))


    stateHandler(e) {
      const value = e.target.value;
      const prop =e.target.name;

      
      this.setState ({
        [prop]:value
      })
      //用setState方法修改状态   运用 【prop】:valu的语法将键盘事件的值与
       //value值代表键盘此刻正输入的值 将该值与标签的name属性绑定 
    } 


    hobbyHandler(index,ev) {
        //当前操作需要获取被操作项目的索引和事件对象
        //把当前对应的index的那一项的排序取出来，用setState更改里面的false属性
        //用这个操作将所有值都显示在界面上  

  const isChecked = ev.target.checked
      const hobbies = [...this.state.hobbies] 
      hobbies[index].isChecked = isChecked
      //展开操作
      this.setState({
        hobbies:hobbies
      })
    //由于复选框跟单选框及其他的不同 用map方法展开复选框数组里面的标签和数据map两个参数
    //第一位当前值 第二个为当前值对应的index 
    //其实复选框的本质就是选中那个变化的且与众不同的值这里为isChecked属性
    // 通过得到 当前的键盘选中的复选框选项 和 得到当前的hobbies数组里面的数据
    //运用map的第二个参数得到排序  运用 hobbies[index].isChecked 来修改是否被选中isChecked属性的布尔值
    //修改后用setState来修改该状态 hobbies：
    }

   submit = (ev) => { 
    ev.preventDefault();
   //所有的数据包裹在form里面 在form里加上onSubmit事件 
   //onSubmit事件指向this.submit 意味着这个submit事件只触发该form里面的数据
   //通过点击事件可以得到所有的完整的对象型数据 该对象里面的state属性包含目标数据
   //通过filter（—）方法筛选出iSCheck为改变过的属性 此时，改变过的属性的选项仍未对象
   //通过map（）方法将实际需要的内容 当前选项的标题
   const hobbies = this.state.hobbies.filter(hobby=>hobby.isChecked)
    .map(hobby=>hobby.title);

   const formValue = {
    ...this.state,
    hobbies   
  
   } 
  //分两步 ，第一步通过。。。展开操作将原来的数据进行展示，第二步 得到复选框里面的数据并放在一起

   
   this.props.addList(formValue,()=>{this.setState(this.origin)})
    //addList方法是父组件APP给的 该方法有两个参数 一个形参和一个回调函数，通过这两个参数，保证了先执行formValue
    //里面的数据传出，再更新成原来的状态

}




render() { 

 
  return( 
    <div className="col-md-5">
    <form onSubmit={this.submit}>
        <div className="form-group">
            <label>学号</label>
            <input name="number" value={this.state.number} onChange={this.stateHandler} type="number" className="form-control" placeholder="请输入学号" />
        </div>
        <div className="form-group">
            <label>姓名</label>
            <input name="name" value={this.state.name} onChange={this.stateHandler} type="text" className="form-control" placeholder="请输入姓名"/>
        </div>
        <div className="form-group">
            <label>性别&nbsp;&nbsp;</label>
            <label className="checkbox-inline">
                <input name='sex'  checked={this.state.sex === 'male'} onChange={this.stateHandler} type="radio" value="male" /> 男
            </label>
            <label className="checkbox-inline">
                <input name='sex'  checked={this.state.sex === 'female'} onChange={this.stateHandler} type="radio" value="female" /> 女
            </label>
        </div>
        <div className="form-group">
            <label>年龄</label>
            <input name="age" value={this.state.age} onChange={this.stateHandler} type="text" className="form-control" placeholder="请输入年龄" />
        </div>
  
        <div className="form-group">  
            <label>爱好</label>
            
            {
            this.state.hobbies.map((hobby,index)=>{
                return (
                    <div className="checkbox" key={index}>
                        <label>
                            <input type="checkbox" checked={hobby.isChecked} onChange={this.hobbyHandler.bind(this,index)} value={hobby.title} />{hobby.title}
                        </label>
                    </div>
                )
            }) 
            }
           
        </div>
        <div className="form-group">
            <label>所属学院</label>
            <select name={'college'} value={this.state.college} onChange={this.stateHandler} className="form-control">
                <option value="大前端">大前端</option>
                <option value="Java">Java</option>
                <option value="python">python</option>
            </select>
        </div>
        <button  type="submit" className="btn btn-default">添加</button>
    </form>
</div>

  )

}


}

export default AddStudent;