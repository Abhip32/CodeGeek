// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CodeGeeks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

module.exports = mongoose.connection;
