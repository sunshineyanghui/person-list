import React from 'react';
import axios from 'axios';
import Add from './Add';
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
  handleClick(){
    this.setState({show:true})
  }
  render(){
    // console.log(this.state.persons);
    let personList = this.state.persons.map((person,i)=>(
      <tr key={i}>
        <td>{person.name}</td><td>{person.age}</td><td>{person.sex}</td><td>{person.email}</td>
      </tr>
    ))
    return(
      <div className="personCon">
        <table className="personList">
          <tr><td>姓名</td><td>年龄</td><td>性别</td><td>邮箱</td></tr>
          {personList}
        </table>
        <p onClick={this.handleClick.bind(this)}>增加新人员</p>
        {this.state.show ? <Add /> :true}
      </div>
    )
  }
}
export default Home;
