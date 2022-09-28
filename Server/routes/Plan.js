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
recordRoutes.route("/getPlans").post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("Plans").find().toArray().then((ans)=>{
        res.send(ans);
    })
})

recordRoutes.route("/upPlans").post(function (req, res) {
    let level = req.body.level
    let duration = req.body.duration
    let price = req.body.price
    let db_connect = dbo.getDb();
    let out="";

    var myquery = { "level": level}
    var newvalues = { $set:{duration: duration, price: price}}

    db_connect
        .collection("Plans")
        .updateOne(myquery, newvalues, function(err, res){
            if (err) console.log(err)
            else console.log("sucess")
        })
        console.log(level+" "+duration+" "+price);
        res.send(out)
})



// This section will help you get a single record by id
module.exports = recordRoutes;
