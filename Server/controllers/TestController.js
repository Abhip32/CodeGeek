var nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const UserModel = require("../models/usermodel");
const cryptr = new Cryptr('myTotallySecretKey');
const fs = require('fs');
const eventModel = require('../models/eventModel');


const TestControllers = {
    createTest: async (req, res) => {
        let Paper = req.body.Paper
        let Event = req.body.Event
        let Date = req.body.Date
        let Language = req.body.Language
        let company = req.body.company
        let companylogo = req.body.companylogo
        let companyemail = req.body.companyemail
        let createdby = req.body.createdby
        let cpic = req.body.admin

        console.log(companyemail,createdby)
        var myobj = {
            Questions: Paper,
            Event: Event,
            Date: Date,
            Language: Language,
            company: company,
            companylogo: companylogo,
            companyEmail: companyemail,
            createdBy: createdby,
            AdminPic: cpic
        };
        const eventData = new eventModel(myobj);
        eventData.save();
    },
    getTest: async (req, res) => {
        var email = req.body.email;
        eventModel.find({
            "Submissions.email": {
                $nin: [email]
            }
        }).then((ans) => {
            res.send(ans)
        });
    },

    getTestQuestions: async (req, res) => {
        let para = req.body.name;


        eventModel.find({"Event": para}).then((ans) => {
            res.send(ans)
        });
    },
    submitTest: async (req, res) => {
        let answers = req.body.answers;
        let user = req.body.user;
        let event = req.body.event;
        console.log(event + " " + user + " " + answers);

        var myquery = {
            "Event": event
        }
        var newvalues = {
            $addToSet: {
                Submissions: {
                    answers: answers,
                    email: user
                }
            }
        }

        eventModel.updateOne(myquery, newvalues, function (err, res) {
            if (err) 
                out = "fail"
             else 
                out = "success"
            
            console.log(out);
        });
    },

    testDetails: async (req, res) => {
        let event = req.body.event


        eventModel.find({"Event": event}).then((ans) => {
            res.send(ans[0].Submissions);
        })

    },

    delev: async (req, res) => {
        let event = req.body.event


        db_connect.collection("Events").deleteOne({"Event": event})
    }


}


module.exports = TestControllers;
