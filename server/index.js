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
app.get('/persons', function(req,res){
  Person.find().exec(function(err, persons) {
    res.json({persons})
  });
})
//向数据库添加一条
app.post('/persons',function (req,res) {
  res.json(req.body)
  let name = req.body.name;
  let age = req.body.age;
  let sex = req.body.sex;
  let email = req.body.email;
 　const person = new Person({name: name, age: age,sex:sex,email:email});
  person.save(function(){
    console.log('saved!');
  });
})
app.listen(3000,function(){
  console.log('running on port 3000...');
});
