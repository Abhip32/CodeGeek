const {response} = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route('/getIdentifier').post(function (req, res) {
    var lang = req.body.lang;
    var i = 0;

    let db_connect = dbo.getDb();

    db_connect.collection("Problems").find().toArray().then((ans) => {
        for (item of ans) {
            if (lang == item.language) {
                i++;
            }
        }
        res.send({
            count: i + 1
        });
    });

})

recordRoutes.route('/addProblem').post(function (req, res) {
    let problem = req.body.problem
    let language = req.body.language
    let description = req.body.description
    let identifer = req.body.identifer
    let ouput = req.body.ouput
    let level = req.body.level

    var myobj = {
        title: problem,
        description: description,
        language: language,
        expectedoutput: ouput,
        identifer: identifer,
        level: level,
        solved: [],
        comments: []
    };
    let db_connect = dbo.getDb();

    db_connect.collection("Problems").insertOne(myobj, function (err, res) {
        if (err) 
            out = "fail"
         else 
            out = "success"
        
        console.log("1 document inserted");

    });
    res.send("success");

})


recordRoutes.route('/AdminPendingCcerti').post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("Login_Credentials").find({"C_certificate": "pending"}).toArray().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})


recordRoutes.route('/AdminPendingCppcerti').post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("Login_Credentials").find({"Cpp_certificate": "pending"}).toArray().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminPendingJavacerti').post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("Login_Credentials").find({"Java_certificate": "pending"}).toArray().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminPendingPythoncerti').post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("Login_Credentials").find({"Python_certificate": "pending"}).toArray().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/getTestData').post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect.collection("TestData").find().toArray().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminApprove').post(function (req, res) {
    let db_connect = dbo.getDb();
    var id = req.body.id;
    var lang = req.body.lang;
    var date = req.body.date;
    var name = req.body.name;
    var result = req.body.result;
    var myquery = { _id: ObjectId(id) };

    if (lang == "c") {
        var newvalues = {
            $set: {
                C_certificate: result,
                linkc: name+" "+lang+" "+date
            }
        }
    }

    if (lang == "cpp") {
        var newvalues = {
            $set: {
                Cpp_certificate: result,
                linkcp: name+" "+lang+" "+date
            }
        }
    }

    if (lang == "java") {
        var newvalues = {
            $set: {
                Java_certificate: result,
                linkj: name+" "+lang+" "+date
            }
        }
    }

    if (lang == "python3") {
        var newvalues = {
            $set: {
                Python_certificate: result,
                linkp: name+" "+lang+" "+date
            }
        }
    }

    db_connect
    .collection("Login_Credentials")
    .updateOne(myquery, newvalues, function (err, res) {
        if (err)
        {
            console.log(err);
        } 
        else
        {
            console.log("1 document updated");
        }   
    })
})


module.exports = recordRoutes;
