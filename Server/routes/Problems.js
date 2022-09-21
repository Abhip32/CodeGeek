const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;




// This section will help you get a single record by id
  recordRoutes.route("/getCProblems").post(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("Problems")
        .find({language: "c" }).toArray().then ((ans) => {
            res.send(ans)
         });
  })


  recordRoutes.route("/getCppProblems").post(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("Problems")
        .find({language: "cpp" }).toArray().then ((ans) => {
            res.send(ans)
         });
  })


  recordRoutes.route("/getJavaProblems").post(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("Problems")
        .find({language: "java" }).toArray().then ((ans) => {
            res.send(ans)
         });
  })

  recordRoutes.route("/getPythonProblems").post(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("Problems")
        .find({language: "python3" }).toArray().then ((ans) => {
            res.send(ans)
         });
  })

  recordRoutes.route("/addpoints/c").post(function (req, res) {
    var id= req.body.id;
    var identi=req.body.identi;
    let db_connect = dbo.getDb();
    var myquery = { "_id": ObjectId(id)}
    var newvalues = { $addToSet: {c_points:[{pid:identi,marks:5}] } }

    db_connect
        .collection("Login_Credentials")
        .updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        });
  })

  recordRoutes.route("/addpoints/cpp").post(function (req, res) {
    var id= req.body.id;
    var identi=req.body.identi;
    let db_connect = dbo.getDb();
    var myquery = { "_id": ObjectId(id)}
    var newvalues = { $addToSet: {cpp_points:[{pid:identi,marks:5}] } }

    db_connect
        .collection("Login_Credentials")
        .updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        });
  })


  recordRoutes.route("/addpoints/java").post(function (req, res) {
    var id= req.body.id;
    var identi=req.body.identi;
    let db_connect = dbo.getDb();
    var myquery = { "_id": ObjectId(id)}
    var newvalues = { $addToSet: {java_points:[{pid:identi,marks:5}] } }

    db_connect
        .collection("Login_Credentials")
        .updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        });
  })

  recordRoutes.route("/addpoints/python").post(function (req, res) {
    var id= req.body.id;
    var identi=req.body.identi;
    let db_connect = dbo.getDb();
    var myquery = { "_id": ObjectId(id)}
    var newvalues = { $addToSet: {python_points:[{pid:identi,marks:5}] } }

    db_connect
        .collection("Login_Credentials")
        .updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        });
  })

  recordRoutes.route("/addsolved").post(function (req, res) {
    var id= req.body.id;
    var identi=req.body.identi;
    var lang=req.body.lang;
    let db_connect = dbo.getDb();
    var myquery = { "identifier": identi, "language":lang }
    var newvalues = { $addToSet: {solved: id} }

    db_connect
    .collection("Problems")
    .updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
            console.log("1 document inserted");
        });
      res.send("success");
    });





 





  

module.exports = recordRoutes;
