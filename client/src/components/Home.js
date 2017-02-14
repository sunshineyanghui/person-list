import React from 'react';
import axios from 'axios';
import Form from './Form';
class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      data: [],
      // type 状态用来控制表单具体是新增还是修改，0是新增，其他均为_id
      type: null
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/all')
    .then((res) => this.setState({data:res.data.people}))
  }
  handleShow(num){
    this.setState({type: num})
    this.refs.form.handleShow();
  }
  handleRemove(_id){
    var r=confirm("确定要删除该人员信息吗？");
    if(r){
      axios.delete(`http://localhost:3000/del/${_id}`)
        .then( res => {
          alert(res.data.status);
          var newList = this.state.data.filter(function (person) {
            return person._id !== _id
          })
          this.setState({data:newList})
        })
        .catch( err => alert('删除失败') )
    }else {
      alert('取消删除')
    }
  }

  editPerson(data,type){
    if (type===0) {
      axios.post(`http://localhost:3000/add`,data)
        .then( res => {
          console.log(res.data);
          this.setState({data: [...this.state.data,res.data.person]})
          this.refs.form.handleShow()
        })
    }else {
      axios.put(`http://localhost:3000/edit/${type}`,data)
        .then( res => {
          let index = this.state.data.findIndex(function (person) {
            return person._id === type;
          })
          // console.log(res.data.person);
          this.setState({data: [
            ...this.state.data.slice(0,index),
            Object.assign({}, res.data.person, data),
            ...this.state.data.slice(index+1)]});
          this.refs.form.handleShow();
        })
    }
  }

  render(){
    // console.log(this.state.persons);
    return(
      <div className="personCon">
        <table className="table table-hover clearfix">
          <thead>
            <tr><td>姓名</td><td>年龄</td><td>性别</td><td>邮箱</td><td>操作</td></tr>
          </thead>
          <tbody>
            {this.state.data.map((item)=>(
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.sex=== 0 ? '男' : '女'}</td>
                <td>{item.email}</td>
                <td>
                  <div className="action">
                    <button className="btn btn-default" type="submit" onClick={this.handleShow.bind(this,item._id)}>修改</button>
                     <button className="btn btn-default" type="submit" onClick={this.handleRemove.bind(this,item._id)}>删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="clearfix">
          <button className="btn btn-default pull-right" type="submit" onClick={this.handleShow.bind(this,0)}>添加新成员</button>
        </div>

        <Form ref="form" type={this.state.type} action={this.editPerson.bind(this)}/>
      </div>
    )
  }
}
export default Home;
