
const { MongoClient } = require("mongodb");
const Db = "mongodb+srv://codegeek:rNNzS3JAh7C99j6Y@codegeekcluster.dtntnaw.mongodb.net/test";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("CodeGeeks");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};
