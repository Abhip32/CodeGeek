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
recordRoutes.route("/login").post(function (req, res) {
  let user=req.body.user;
	let pass=req.body.pass;
  let db_connect = dbo.getDb();
  db_connect
      .collection("Login_Credentials")
      .find({ "name": user })
      .toArray().then ((ans) => {
        if(ans.length!=0&&ans[0].password==pass)
        {
            res.status(200).send(ans);
        }
        else{
            res.status(404).send(ans);
        }
    })
});

  
module.exports = recordRoutes;
