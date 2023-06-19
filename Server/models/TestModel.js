const mongoose = require('mongoose');

// Define the schema
const TestDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  case: {
    type: String,
    required: true
  }
},{collection:'TestData'});

// Create a model using the schema
const TestDataModel = mongoose.model('TestData', TestDataSchema);

module.exports = TestDataModel;