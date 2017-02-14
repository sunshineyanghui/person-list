const express = require('express');
const app = express();
const Person = require('./models/person');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/person');
var db = mongoose.connection;

db.once('open', function(){
  Person.find().exec(function(err, persons) {
    console.log(persons);
  });
});

db.on('error',function (err) {
  console.log(err);
});//on当什么时候 当报错的时候
//首页展示所有person
app.get('/all', function(req,res){
  Person.find().exec(function(err, people) {
    res.json({people})
  });
})
//向数据库添加一条
app.post('/add',function (req,res) {
  let name = req.body.name;
  let age = req.body.age;
  let sex = req.body.sex;
  let email = req.body.email;
  const person = new Person({name: name, age: age,sex:sex,email:email});
  person.save(function(err, person){
    // console.log('saved!');
    res.json({person})
  });
})
//删除
app.delete('/del/:_id',function (req, res) {
    var _id = req.params._id;
    Person.findByIdAndRemove(_id,function (err) {
      if (err) {return console.log(err)};
      res.json({status:'success'})
    })
  });
//编辑
app.put('/edit/:_id', function (req, res) {
    var _id = req.params._id;
    Person.findByIdAndUpdate(_id, req.body, function (err, person) {
      if (err) {return console.log(err)};
      // 注意这里返回的是未更新前的文档
      res.json({person})
    })
  })
app.listen(3000,function(){
  console.log('running on port 3000...');
});
