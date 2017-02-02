var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    name: { type: String },
    age: { type: String},
    sex:{ type:String },
    email:{ type:String }
  }
);

module.exports = mongoose.model('Person', PostSchema);
