const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    message:{
      type :String,
      required : true
    },
},{
  timestamps : true
})

const User = mongoose.model('uimessage',Users);
module.exports = User;
