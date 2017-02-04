import React from 'react';
import axios from 'axios';
class Add extends React.Component{
  constructor(){
    super();
  }
  handleSubmit(e){
    e.preventDefault();
    console.log('handleSubmit...');
    let name = this.refs.name.value;
    let age = this.refs.age.value;
    let sex = this.refs.sex.value;
    let email = this.refs.email.value;
    console.log({name});
    axios.post('http://localhost:3000/persons',{name,age,sex,email})
    .then( res =>  {
      console.log(res);
      // browserHistory.push('/');//添加完跳转到首页
      // this.context.router.push('/');
      this.props.router.push('/')
    });
  }
  render(){
    return(
      <div>
        <h2>添加人员信息</h2>
        <button>×</button>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>姓名</label><input type="text" name="name" ref="name" />
          </div>
          <div>
            <label>年龄</label><input type="text" name="age" ref="age" />
          </div>
          <div>
            {/* <label>性别</label><input type="radio" value="男" name="sex" ref="mail" />男<input type="radio" value="女" name="sex" ref="remail" />女 */}
            <label>性别</label><input type="text" ref="sex"/>
          </div>
          <div>
            <label>Email</label><input type="text" name="email" ref="email" />
          </div>
          <button type='submit'>确定</button><button type='reset'>取消</button>
        </form>
      </div>
    )
  }
 }
 Add.contextTypes={
   router:React.PropTypes.object.isRequired
 }
export default Add;
