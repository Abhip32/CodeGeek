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

recordRoutes.route('/getbardata').post(function (req, res) {
    let pass1=0;
    let fail=0;
    let data1=[];
    let unfair=0;


})


recordRoutes.route('/getpiedata').post(function (req, res) {    
    let datac=0;
    let datacpp=0;
    let data=[];
    let datajava=0;
    let datapython=0;


        ProblemModel.find().then((ans) => {
            for(i=0;i<ans.length;i++) {
                {
                    if(ans[i].language =="c")
                    {
                        datac=datac+1;
                    }

                    if(ans[i].language =="cpp")
                    {
                        datacpp=datacpp+1;
                    }

                    if(ans[i].language =="java")
                    {
                        datajava=datajava+1;
                    }

                    if(ans[i].language =="python3")
                    {
                        datapython=datapython+1;
                    }
                }
            }
            data.push(datac)
            data.push(datacpp)
            data.push(datajava)
            data.push(datapython)
            res.send(data)
            console.log(data)
            

        })
     
})

recordRoutes.route("/usersdata").post(function (req, res) {


    UserModel.find().then((ans) => {
            var i =ans.length;
            res.send({users:i});
        })
})



recordRoutes.route("/testdata").post(function (req, res) {
    let countfail=0;
    let countsuccess=0;
    let countnone=0;
    let noEvents=0;

    eventModel.find().then((ans) => {
      noEvents=ans.length;  
    })
    
    TestDataModel.find().then((ans) => {
        for (i in ans){
            if(ans[i].case == "none")
            {
                countnone++;
            }

            if(ans[i].case == "Success")
            {
                countsuccess++;
            }
            
            if(ans[i].case == "fail(unfair)")
            {
                countfail++;
            }
        }

            res.send([countfail, countsuccess, countnone,noEvents])
        })
})




// This section will help you get a single record by id
recordRoutes.route("/adminlogin").post(function (req, res) {
    let user=req.body.user;
	let pass=req.body.pass;
    let output="output";
    console.log("Admin Login")

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