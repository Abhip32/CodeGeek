const { response } = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route('/getbardata').post(function (req, res) {
    let pass1=0;
    let db_connect = dbo.getDb();
    let fail=0;
    let data1=[];
    let unfair=0;
    db_connect
    .collection("TestData")
    .find().toArray().then((ans) => {
            for(i=0;i<ans.length;i++) {
                {
                    if(ans[i].case =="Success")
                    {
                        pass1=pass1+1;
                    }

                    else if(ans[i].case =="Failure"||ans[i].case =="none")
                    {
                        fail=fail+1;
                    }

                    else if(ans[i].case =="fail(unfair)")
                    {
                        unfair=unfair+1;
                    }
                }
            }
            data1.push(pass1)
            data1.push(fail)
            data1.push(unfair)
            res.send(data1)
            console.log(data1)
            

})

})


recordRoutes.route('/getpiedata').post(function (req, res) {    
    let datac=0;
    let datacpp=0;
    let data=[];
    let datajava=0;
    let datapython=0;
    let db_connect = dbo.getDb();

        db_connect
        .collection("Problems")
        .find().toArray().then((ans) => {
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
    let db_connect = dbo.getDb();

    db_connect
    .collection("Login_Credentials")
    .find().toArray().then((ans) => {
            var i =ans.length;
            res.send({users:i});
        })
})




// This section will help you get a single record by id
recordRoutes.route("/adminlogin").post(function (req, res) {
    let user=req.body.user;
	let pass=req.body.pass;
    let output="output";
    console.log("Admin Login")
    let db_connect = dbo.getDb();
    // Connect to collection
    db_connect
    .collection("Admin_Credentials")
    .find({ "name": user }).toArray().then ((ans) => {
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