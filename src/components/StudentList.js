import React, {Component} from "react";

class StudentList extends Component {
//render  使成为 提交


 rmStudent = (ev,index) => { 
    ev.preventDefault();
    this.props.deleteStudent(index)
    //由于是子组件 肯定用数据都在this.props里面
 
      
 }

render() { 

  const { studentList} = this.props

  let totalAge = 0 ;
  let aveAge = 0 ;

  studentList.forEach(hobby => totalAge += Number(hobby.age))

  aveAge = Math.floor(totalAge / studentList.length)
//这个地方也可以用设计一个方法 就是个遍历总数后的简单计算 
  return( 
    <div className="col-md-6 col-md-offset-1">
    <table className="table table-striped table-hover">
       <thead>
       <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
           
            <th>爱好</th>
            <th>所属学院</th>
            <th>操作</th>
        </tr></thead>
        <tbody>
          {
          studentList.map((hobby)=>{
            return (
              <tr key={hobby.number}>
                <td>{hobby.number}</td>
                <td>{hobby.name}</td>
                <td>{hobby.sex}</td>
                <td>{hobby.age}</td>
                <td>{hobby.college}</td>
                <td>{hobby.hobbies.map((a,index)=><span key={index}>{a}</span>)}</td>
                
                 

                     <td  >
                     <a href="www.baidu.com" onClick={(index,ev)=>{this.rmStudent(index,ev)}}>删除</a>
                     
                     </td>

   
              </tr>
            )
          })
          }
        </tbody>
    </table>

     {studentList.length >0 ? null : <p className="text-center">none</p> } 



    <p key={11}>总共有：{studentList.length}</p>
    <p>平均年纪：{aveAge}</p>
</div>
// {studentList.length >0 ? null : <p className="text-center">none</p> } 为条件判断语句
// <a href="www.baidu.com" onClick={(index,ev)=>{this.rmStudent(index,ev)}}>删除</a> 这本组件内设计rmStudent方法，该方法是开关
//通过该方法找到具体的索引值，然后调用父组件的删除方法
  )

}


}

export default StudentList;