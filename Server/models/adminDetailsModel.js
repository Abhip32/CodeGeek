const mongoose = require('mongoose');

// Define the schema
const AdminDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},{collection:'Admin_Credentials'});

// Create a model using the schema
const AdminDetailsModel = mongoose.model('Admin_Credentials', AdminDetailsSchema);

module.exports = AdminDetailsModel;