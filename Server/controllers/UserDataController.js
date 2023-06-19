var nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const UserModel = require("../models/usermodel");
const cryptr = new Cryptr('myTotallySecretKey');
const fs = require('fs');




const userDataControllers = {
        getUserData: async (req, res) => {
            var user= req.body.user;
            console.log(user)
            UserModel.find({ "email": user }).then ((ans) => {
                    let sumc=0;
                    let sumcpp=0;
                    let sumjava=0;
                    let sumpython=0;
                    for(let i=1; i<=ans[0].c_points.length; i++)
                    {
                        sumc=parseInt(sumc, 10) + parseInt(ans[0].c_points[0].marks, 10);
                    }
                    for(let i=1; i<=ans[0].cpp_points.length; i++)
                    {
                        sumcpp=parseInt(sumcpp, 10) + parseInt(ans[0].cpp_points[0].marks, 10);
                    }
                    for(let i=1; i<=ans[0].java_points.length; i++)
                    {
                        sumjava=parseInt(sumjava, 10) + parseInt(ans[0].java_points[0].marks, 10);
                    }
                    for(let i=1; i<=ans[0].python_points.length; i++)
                    {
                        sumpython=parseInt(sumpython, 10) + parseInt(ans[0].python_points[0].marks, 10);
                    }
                    console.log(sumc);
                    if(ans.length!=0)
                    {
                        res.send({phone:ans[0].phone,bio:ans[0].bio,name:ans[0].name,
                                  c_points:sumc,cpp_points:sumcpp,python_points:sumpython,java_points:sumjava,C_certificate:ans[0].c_Status,
                                  Cpp_certificate:ans[0].cpp_Status,Java_certificate:ans[0].java_Status,Python_certificate:ans[0].python_Status});     
                    }
                });

    },

    }


    module.exports = userDataControllers;
