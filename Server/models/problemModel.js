const mongoose = require('mongoose');

// Define the schema
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  expectedoutput: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    required: true
  },
  solved: {
    type: Array
  },
  comments: {
    type: Array
  }
},{collection:'Problems'});

// Create a model using the schema
const ProblemModel = mongoose.model('Problems', ProblemSchema);

module.exports = ProblemModel;