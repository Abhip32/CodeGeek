const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//createexamid
//setcase
recordRoutes.route("/setcaseresult").post(function (req, res) {
    let db_connect = dbo.getDb();
    var id= req.body.id;
    var result=req.body.result;
    var lang= req.body.lang;
    console.log("Result : "+result);
    var myquery = { "id": id, "language": lang}
    var newvalues = { $set: {case: result}}

    db_connect.collection("TestData").updateOne(myquery, newvalues, function(err, res){
        if (err) out="fail"
        else out="success"
    })

    var myquery = { case: '' };
    db_connect.collection("TestData").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
            console.log("1 document deleted");
        })
    res.send("success");
})



// This section will help you get a single record by id
  recordRoutes.route("/CreateExamID").post(function (req, res) {
    let db_connect = dbo.getDb();
    var user= req.body.username;
    var date=req.body.date;
    var id=req.body.id;
    console.log("ads");
    var lang= req.body.lang;
        var myquery = { "_id": ObjectId(id)}
        if(lang=="c")
        {
            var newvalues = { $set: {C_certificate:"pending" } }
        }
        if(lang=="cpp")
        {
            var newvalues = { $set: {Cpp_certificate:"pending" } }
        }
        if(lang=="java")
        {
            var newvalues = { $set: {Java_certificate:"pending" } }
        }
        if(lang=="python3")
        {
            var newvalues = { $set: {Python_certificate:"pending" } }
        }
        console.log(user+" "+date+" "+lang+" "+id);

        var myobj = { name: user, date: date, id: id,language:lang,result:"pending",case:"none"};
        db_connect.collection("TestData").insertOne(myobj, function(err, res) {
          if (err) out="fail"
          else out="success"
          console.log("1 document inserted");
        });

        db_connect.collection("Login_Credentials").updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        });
      });

  

module.exports = recordRoutes;
