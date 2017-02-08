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
    axios.get('http://localhost:3000/persons')
    .then((res) => this.setState({persons:res.data.persons}))
  }
  handleShow(){
    this.setState({

    })
    this.refs.form.handleShow();
  }
  render(){
    // console.log(this.state.persons);
    return(
      <div className="personCon">
        <table className="table table-hover">
          <thead>
            <tr><td>姓名</td><td>年龄</td><td>性别</td><td>邮箱</td><td>操作</td></tr>
          </thead>
          <tbody>
            {this.state.persons.map((person,i)=>(
              <tr key={i}>
                <td>{person.name}</td><td>{person.age}</td><td>{person.sex}</td><td>{person.email}</td>
                <td>
                  <div className="action">
                    <button className="btn btn-default" type="submit">修改</button>
                     <button className="btn btn-default" type="submit">删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-default" type="submit" onClick={this.handleShow.bind(this)}>添加新成员</button>
        <Form ref="form" />
      </div>
    )
  }
}
export default Home;
