// model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your schema fields here
  name: String,
  password: String,
  pic: {
    data: Buffer,
    contentType: String
  },
  email: String,
  phone: String,
  c_points:Array,
  cpp_points:Array,
  java_points:Array,
  python_points:Array,
  c_Status: String,
  cpp_Status: String,
  java_Status: String,
  python_Status: String,
  bio:String,
}, { collection: 'Login_Credentials' });

const UserModel = mongoose.model('Login_Credentials', userSchema);

module.exports = UserModel;
