const express = require("express");
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const ProblemModel = require("../models/problemModel");
const UserModel = require("../models/usermodel");


const ProblemController ={
    getAllProblems : async (req,res) =>{
        ProblemModel.find({"language":req.query.language}).then ((ans) => {
            res.status(200).send(ans)
         });
      },

    
    getProblemDetails : async (req, res) =>{
        ProblemModel.find({"identifier":req.query.id}).then ((ans) => {
            res.status(200).send(ans)
         });
    },

    addComment:async (req, res) =>{
            console.log("adsads")
            const email= req.body.params.email;
            const name= req.body.params.name;
            const identi=req.body.params.identi;
            const comm=req.body.params.comment;
            const myquery = { "identifier": identi}
            let newvalues = { $addToSet: {comments:{userEmail:email,comment:comm,name:name} }}
        
            ProblemModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
                console.log("1 comment inserted");
               
            })
            res.send("success");
            },

    getComments:async (req, res) =>{
        const id=req.query.identi;
        try{
            ProblemModel.find({"identifier":id}).then((data)=>{
                res.status(200).json(data)
            })
    
        }
        catch(err){
            console.log(err);
        }
    },
    AddSolved:async (req, res) =>{
    var id= req.body.id;
    var identi=req.body.identi;
    var lang=req.body.lang;

    var myquery = { "identifier": identi, "language":lang }
    var newvalues = { $addToSet: {solved: id} }

    ProblemModel.updateOne(myquery, newvalues, function(err, res){
            if (err) out="fail"
            else out="success"
            console.log("1 document inserted");
        });
      res.send("success");
    },

    AddPoints:async (req,res)=>{
        var id= req.body.id;
        var identi=req.body.identi;
        var lang=req.body.lang;
        console.log(id, identi, lang);
        
        var myquery = { "email": id}
        if(lang == "c")
        {
            var newvalues = { $addToSet: {c_points:[{pid:identi,marks:5}] } }
            UserModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
            });
        }
        if(lang == "cpp")
        {
            var newvalues = { $addToSet: {cpp_points:[{pid:identi,marks:5}] } }
            UserModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
            });
        }

        if(lang == "java")
        {
            var newvalues = { $addToSet: {java_points:[{pid:identi,marks:5}] } }
            UserModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
            });
        }
        if(lang =="python3")
        {
            var newvalues = { $addToSet: {python_points:[{pid:identi,marks:5}] } }
            UserModel.updateOne(myquery, newvalues, function(err, res){
                if (err) out="fail"
                else out="success"
            });
        }
    
    }
}

module.exports = ProblemController;
