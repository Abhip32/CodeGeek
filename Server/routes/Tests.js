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
  recordRoutes.route("/CreateTest").post(function (req, res) {
    let Paper=req.body.Paper
    let Event=req.body.Event
    let Date = req.body.Date
    let Language = req.body.Language
    let company = req.body.company
    let companylogo = req.body.companylogo
    let companyemail = req.body.companyemail
    let createdby=  req.body.createdby
    let cpic= req.body.admin

    let db_connect = dbo.getDb();
    var myobj = { Questions : Paper,Event:Event,Date:Date,Language:Language,company:company,companylogo:companylogo,companyemail:companyemail,createdby:createdby,AdminPic:cpic};
    db_connect
        .collection("Events")
        .insertOne(myobj, function(err, res) {
            if (err) out="fail"
            else out="success"
            console.log("1 document inserted");
          });
  })


  recordRoutes.route("/getQuestions").post(function (req, res) {

    let db_connect = dbo.getDb();
    db_connect
        .collection("Events")
        .find().toArray().then((ans)=>{
            res.send(ans);
        })
  })

  recordRoutes.route("/getTest").post(function (req, res) {
    let para=req.body.name;
    let db_connect = dbo.getDb();
    db_connect
    .collection("Events")
        .find({"Event":para}).toArray().then ((ans) => { 
          res.send(ans)
        });
})

recordRoutes.route("/submit").post(function (req, res) {
  let answers=req.body.answers;
  let user=req.body.user;
  let event=req.body.event;
  console.log(event+" "+user);

  let db_connect = dbo.getDb();
  var myquery = { "Event": event}
  var newvalues = { $addToSet: {Submissions:[{answers:answers,user:user}] } }

  db_connect
      .collection("Events")
      .updateOne(myquery, newvalues, function(err, res){
          if (err) out="fail"
          else out="success"
          console.log(out);
      });
})

recordRoutes.route("/testdetails").post(function (req, res) {
  let event=req.body.event

  let db_connect = dbo.getDb();

  db_connect
      .collection("Events")
      .find({ "Event": event}).toArray().then((ans)=>{
        res.send(ans[0].Submissions);
      })
})


recordRoutes.route("/delev").post(function (req, res) {
  let event=req.body.event

  let db_connect = dbo.getDb();

  db_connect
      .collection("Events")
      .deleteOne({ "Event": event})
})
  module.exports = recordRoutes;