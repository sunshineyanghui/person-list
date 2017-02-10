import React from 'react';
import axios from 'axios';
import Form from './Form';
class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      persons: [],
      show:0
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/all')
    .then((res) => this.setState({persons:res.data.persons}))
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
      axios.post('http://localhost:3000/add',data)
        .then( res => {
          this.setState({persons: [...this.state.persons,res.data.persons]})
          this.refs.form.handleShow()
        })
    }else {
      axios.put(`http://localhost:3000/edit/${type}`,data)
        .then( res => {
          let index = this.state.persons.findIndex(function (person) {
            return person._id === type;
          })
          // console.log(res.data.person);
          this.setState({persons: [
            ...this.state.data.slice(0,index),
            Object.assign({}, res.data.persons, data),
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
            {this.state.persons.map((person,i)=>(
              <tr key={i}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.sex=== 0 ? '男' : '女'}</td>
                <td>{person.email}</td>
                <td>
                  <div className="action">
                    <button className="btn btn-default" type="submit" onClick={this.handleShow.bind(this,person._id)}>修改</button>
                     <button className="btn btn-default" type="submit" onClick={this.handleRemove.bind(this,person._id)}>删除</button>
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
