import React, {Component} from "react";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import StudentTitle from "./components/StudentTitle";

class App extends Component {
  
state = { 
  studentList :[{
    "number": "01",
    "name": "张三",
    "sex": "男",
    "age": 10,
    "date": "2020-12-04",
    "hobbies": ["足球", "篮球"],
    "college": "大前端"
}, {
    "number": "02",
    "name": "李四",
    "sex": "男",
    "age": 20,
    "date": "2030-12-05",
    "hobbies": ["足球", "橄榄球"],
    "college": "Java"
}, {
    "number": "03",
    "name": "王五",
    "sex": "男",
    "age": 30,
    "date": "2040-11-03",
    "hobbies": ["足球", "橄榄球", "篮球"],
    "college": "python"
}]
}

addList = async (student,callback) => {
  this.setState ( {
    studentList: [...this.state.studentList,student]
 },()=>{ callback() 
  console.log(this.state.studentList)}) 
//运用回调的方法 保证了上下两个操作的顺序 此处应该可以用 async await方法 暂不理解
//运用setState改变数据  将[...this.state.studentList,student] 打印到studentlist里面去
}

deleteStudent = (number) => {
  //利用number 找到studentList当中需要删除的项
  //最后再将处理后的数据重新setState给state

  const studentList = JSON.parse(JSON.stringify(this.state.studentList))
  
  const index =studentList.findIndex(student => student.number ===number)
  //找到索引  用findIndex（）方法
   studentList.splice(index,1)
   //这边使用splice方法  粗暴的将数据斗起来 

   this.setState({
    studentList:studentList
   },()=>{ 
    console.log(this.state.studentList)
   })
}

/*关于studentlist的部分 做个简单总结   因为这个阶段是父组件接受了来自另外一个子组件addstudent里面的数据。通过studentlist方法
*传递给了另外一个子组件studentlist，传递的具体方法就是给子组件加上studentlist方法 ，同样删除这些数据的方法也要给与studentlist组件
*思维模式：子组件通过父组件的方法得到数据 父组件给子组件删除数据的方法 但是方法具体内容由父组件定义，子组件继承
*


*/
render() { 

  return( 
    <div className={'container'}>
    <StudentTitle></StudentTitle>
     <AddStudent  addList={this.addList}></AddStudent>
     <StudentList studentList={this.state.studentList} deleteStudent={this.deleteStudent}></StudentList>
   
     </div>
  )

}


}

export default App;
