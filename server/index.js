const express = require('express');
const app = express();
const Person = require('./models/person');
const cors = require('cors');
app.use(cors());

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
app.get('/persons', function(req,res){
  Person.find().exec(function(err, persons) {
    res.json({persons})
  });
})
app.listen(3000,function(){
  console.log('running on port 3000...');
});
