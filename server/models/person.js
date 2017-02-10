var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    name: { type: String },
    age: { type: Number},
    sex:{ type: Number },
    email:{ type: String }
  }
);

module.exports = mongoose.model('Person', PostSchema);
