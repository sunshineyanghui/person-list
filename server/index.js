const express = require('express');
const app = express();
const Person = require('./models/person');
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/person');

var db = mongoose.connection;

db.once('open', function(){
  let person = new Person({name: 'James Bond', age: '30',sex:'男',email:'james.bond@secretagent.com'});
   person.save(function(err){
     if(err) console.log(err);
   })
  console.log('success!')
});

db.on('error',function (err) {
  console.log(err);
});//on当什么时候 当报错的时候
app.get('/', function(req,res){
  res.send('hello world');
})
app.listen(3000,function(){
  console.log('running on port 3000...');
});
