const { response } = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const AdminDetailsModel = require("../models/adminDetailsModel");
const UserModel = require("../models/usermodel");
const ProblemModel = require("../models/problemModel");
const TestDataModel = require("../models/TestModel");
const eventModel = require("../models/eventModel");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;





// This section will help you get a single record by id
recordRoutes.route("/adminlogin").post(function (req, res) {
    let user=req.body.user;
	let pass=req.body.pass;
    let output="output";
    console.log(pass)

    AdminDetailsModel.find({ "name": user }).then ((ans) => {
        if(ans.length!=0&&ans[0].password==pass)
        {
            res.send(ans[0]);
        }
        else{
            res.send("error");
        }
    }).catch((err) => {
    console.log(err.Message);
})
})



    
module.exports = recordRoutes;