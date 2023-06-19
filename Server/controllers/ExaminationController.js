const express = require("express");
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const ProblemModel = require("../models/problemModel");
const UserModel = require("../models/usermodel");
const TestDataModel = require("../models/TestModel");


const ExaminationController ={
    setExamId: async (req,res) =>{
        var user= req.body.username;
        var date=req.body.date;
        var id=req.body.id;
        console.log("ads");
        var lang= req.body.lang;
            var myquery = { "email": id}
            if(lang=="c")
            {
                var newvalues = { $set: {c_Status:"pending" } }
            }
            if(lang=="cpp")
            {
                var newvalues = { $set: {cpp_Status:"pending" } }
            }
            if(lang=="java")
            {
                var newvalues = { $set: {java_Status:"pending" } }
            }
            if(lang=="python3")
            {
                var newvalues = { $set: {python_Status:"pending" } }
            }
            console.log(user+" "+date+" "+lang+" "+id);
    
            const myobj = { name: user, date: date, email: id,language:lang,result:"pending",case:"none"};
            const newTestData = new TestDataModel(myobj);
            const data = await newTestData.save();    
            UserModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
            });
    
    },

    setCaseResults: async (req,res) =>{
        var id= req.body.id;
        var result=req.body.result;
        var lang= req.body.lang;
        console.log("Result : "+result);
        var myquery = { "email": id, "language": lang}
        var newvalues = { $set: {case: result}}
    
        TestDataModel.updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
        })
    
        var myquery = { case: '' };
        TestDataModel.deleteOne(myquery, function(err, obj) {
            if (err) throw err;
                console.log("1 document deleted");
            })
        res.send("success");

    },

    getQuestion:async (req, res) =>{
        const lang=req.body.lang;
        console.log(lang);
        ProblemModel.find({language:lang}).then((ans)=>{

            // Check if there are any problem models with language "C"
            if (ans.length > 0) {
            // Select a random index
            const randomIndex = Math.floor(Math.random() * ans.length);
    
            // Retrieve the randomly selected problem model
            const randomProblemModel = ans[randomIndex];
    
            res.send(randomProblemModel)
        }  
        })
    }
}

module.exports = ExaminationController;
