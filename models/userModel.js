var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  hobby: {
    type: String,
    required: true
  },
  registrationdate: {
    type: Date,
    required: true
  },
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit);
}
