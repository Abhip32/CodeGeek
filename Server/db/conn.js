// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://codegeek:oCfEMjzUKB5mX3sy@ac-pkke7rb-shard-00-00.dtntnaw.mongodb.net:27017,ac-pkke7rb-shard-00-01.dtntnaw.mongodb.net:27017,ac-pkke7rb-shard-00-02.dtntnaw.mongodb.net:27017/CodeGeeks?ssl=true&replicaSet=atlas-zmj7ta-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

module.exports = mongoose.connection;
