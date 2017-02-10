import React from 'react';
import axios from 'axios';
class Form extends React.Component{
  constructor(){
    super();
    this.state={
      show:false,
      name:null,
      age:null,
      email:null,
      sexValue:0
    }
  }
  handleSubmit(e){
    e.preventDefault();
    console.log('handleSubmit...');
    let name = this.refs.name.value;
    let age = this.refs.age.value;
    let sex = this.state.sexValue;
    let email = this.refs.email.value;
    let postDate = { name,age,sex,email};
    this.props.action(postDate,this.props.type);
  }
  handleShow(){
    this.setState({
      show:!this.state.show
    })
  }
  handleBlur(e){
    let _id = e.target.getAttribute('id');
    let _target = document.getElementById(_id);
    let _value = _target.value.trim();
    if (_id === 'name') {
      if (_value.length===0) {this.setState({name: '姓名不能为空'})}else { this.setState({name: null}) }
    }
    if (_id === 'age') {
      if (Math.floor(_value) == _value && _value > 0) {this.setState({age:null})}else{ this.setState({age: '请输入一个大于0的整数'}) }
    }
    if(_id === 'email') {
      let re= /\w@\w*\.\w/;
      if (re.test(_value)) { this.setState({email: null}) }else { this.setState({email: '请输入正确的邮箱格式'}) }
    }
  }
  handleChange(e){
    this.setState({sexValue:e.target.value});

  }
  render(){
    let content = this.state.show ?
    <div className="customCover">

      <div className="customForm">

        <div className="clearfix">
          <h2 className="pull-left" style={{margin:'0'}}>{this.props.type==0 ? '添加成员信息' : '修改成员信息'}</h2>
          <span className="glyphicon glyphicon-remove pull-right" onClick={this.handleShow.bind(this)}></span>
        </div>

        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>姓名</label><input onBlur={this.handleBlur.bind(this)} type="text" id="name" ref="name" />
          </div>
          <p style={{color: 'red'}}>{this.state.name}</p>
          <div>
            <label>年龄</label><input onBlur={this.handleBlur.bind(this)} type="number" id="age" ref="age" />
          </div>
          <p style={{color: 'red'}}>{this.state.age}</p>
          <div>
            <label>性别</label>
            <input type="radio" value="0" name="sex" id="male" onChange={this.handleChange.bind(this)} defaultChecked /><label htmlFor="male">男</label>
            <input type="radio" value="1" name="sex" id="female" onChange={this.handleChange.bind(this)} /><label htmlFor="female">女</label>
          </div>
          <p style={{color: 'red'}}>{this.state.sex}</p>
          <div>
            <label>Email</label><input type="email" id="email" ref="email" onBlur={this.handleBlur.bind(this)} />
          </div>
          <p style={{color: 'red'}}>{this.state.email}</p>
          <button type='submit' className="btn btn-default">确定</button><a className="btn btn-default" onClick={this.handleShow.bind(this)} role="button">取消</a>
        </form>

      </div>

    </div> :null
    return(
      <div>
        {content}
      </div>
    )
  }
 }
export default Form;
