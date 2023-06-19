const {response} = require("express");
const express = require("express");
const recordRoutes = express.Router();
const problemModel = require("../models/problemModel");
const userModel= require("../models/usermodel");
const testModel = require("../models/TestModel");
const ProblemModel = require("../models/problemModel");


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route('/getIdentifier').post(function (req, res) {
    var lang = req.body.lang;
    var i = 0;


    problemModel.find().then((ans) => {
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
        identifier: identifer,
        level: level,
        solved: [],
        comments: []
    };

    const problemData=new ProblemModel(myobj);
    problemData.save();

})


recordRoutes.route('/AdminPendingCcerti').post(function (req, res) {

    userModel.find({"C_Status": "pending"}).then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})


recordRoutes.route('/AdminPendingCppcerti').post(function (req, res) {

    userModel.find({"cpp_Status": "pending"}).then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminPendingJavacerti').post(function (req, res) {

    userModel.find({"java_Status": "pending"}).then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminPendingPythoncerti').post(function (req, res) {
    userModel.find({"python_Status": "pending"}).then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/getTestData').post(function (req, res) {
    testModel.find().then((ans) => {
        if (ans.length != 0) {
            res.send(ans)
        }
    })
})

recordRoutes.route('/AdminApprove').post(function (req, res) {
    var id = req.body.id;
    console.log(id)
    var lang = req.body.lang;
    var date = req.body.date;
    var name = req.body.name;
    var result = req.body.result;
    var myquery = { email:id };


    if (lang == "c") {
        if(result=="Approved")
        {
            var newvalues = {
                $set: {
                    c_Status: name+" "+lang+" "+date
                }
            }
        }
        else
        {
            var newvalues = {
                $set: {
                    c_Status: ""
                }
            }
        }
    }

    if (lang == "cpp") {
        if(result=="Approved")
        {
            var newvalues = {
                $set: {
                    cpp_Status: name+" "+lang+" "+date
                }
            }
        }
        else
        {
            var newvalues = {
                $set: {
                    cpp_Status: ""
                }
            }
        }
    }

    if (lang == "java") {
        if(result=="Approved")
        {
            var newvalues = {
                $set: {
                    java_Status: name+" "+lang+" "+date
                }
            }
        }
        else
        {
            var newvalues = {
                $set: {
                    java_Status: ""
                }
            }
        }
    }

    if (lang == "python3") {
        if(result=="Approved")
        {
            var newvalues = {
                $set: {
                    python_Status: name+" "+lang+" "+date
                }
            }
        }
        else
        {
            var newvalues = {
                $set: {
                    python_Status: ""
                }
            }
        }
    }


    userModel.updateOne(myquery, newvalues, function (err, res) {
        if (err)
        {
            console.log(err);
        } 
        else
        {
            console.log("1 document updated");
            testModel.deleteMany({email:id,language:lang}).then((data)=>{
                console.log(data);
            });
        }   
    })
})


module.exports = recordRoutes;
