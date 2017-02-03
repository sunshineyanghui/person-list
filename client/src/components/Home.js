import React from 'react';
import axios from 'axios';
class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      persons: []
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/persons')
    .then((res) => this.setState({persons:res.data.persons}))
  }
  render(){
    // console.log(this.state.persons);
    let personList = this.state.persons.map((person,i)=>(
      <div key={i}>
        <span>{person.name}</span><span>{person.age}</span><span>{person.sex}</span><span>{person.email}</span>
      </div>
    ))
    return(
      <div>
        {personList}
      </div>
    )
  }
}
export default Home;
