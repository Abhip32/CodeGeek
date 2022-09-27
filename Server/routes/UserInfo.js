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
recordRoutes.route("/UserInfo").post(function (req, res) {
    let data=[]
    let db_connect = dbo.getDb();

    db_connect
        .collection("Login_Credentials")
        .find().toArray().then ((ans) => {
            for(item of ans)
            {
            let sumc=0;
            let sumcpp=0;
            let sumjava=0;
            let sumpython=0;
            for(let i=0; i<item.c_points.length; i++)
            {
                sumc=parseInt(sumc, 10) + parseInt(item.c_points[i][0].marks, 10);
            }
            for(let i=1; i<item.cpp_points.length; i++)
            {
                sumcpp=parseInt(sumcpp, 10) + parseInt(item.cpp_points[i][0].marks, 10);
            }
            for(let i=1; i<item.java_points.length; i++)
            {
                sumjava=parseInt(sumjava, 10) + parseInt(item.java_points[i][0].marks, 10);
            }
            for(let i=1; i<item.python_points.length; i++)
            {
                sumpython=parseInt(sumpython, 10) + parseInt(item.python_points[i][0].marks, 10);
            }
            if(ans.length!=0)
            {
              data.push({pic:item.pic.toString("utf8"),name:item.name,email:item.email,phone:item.phone,bio:item.bio,id:item._id,
              c_points:sumc,cpp_points:sumcpp,python_points:sumpython,java_points:sumjava,C_certificate:item.C_certificate,
              Cpp_certificate:item.Cpp_certificate,Java_certificate:item.Java_certificate,Python_certificate:item.Python_certificate,linkc:item.linkc,linkcp:item.linkcp,linkj:item.linkj,linkp:item.linkp});     
            }
            }
            res.send(data);
        });
  });


  recordRoutes.route("/getProfilePic").post(function (req, res) {
    var user= req.body.user;
    let db_connect = dbo.getDb();

    db_connect
        .collection("Login_Credentials")
        .find({ "name": user }).toArray().then ((ans) => {
            if(ans.length!=0)
            {
                res.send(ans[0].pic.toString("utf8"))
            }
        });
  })



recordRoutes.route("/getPointsInfo").post(function (req, res) {
    let data=[];
    let db_connect = dbo.getDb();
    db_connect
    .collection("Login_Credentials")
    .find().toArray().then ((ans) => {
            for(item of ans)
            {
            let sumc=0;
            let sumcpp=0;
            let sumjava=0;
            let sumpython=0;
            for(let i=0; i<item.c_points.length; i++)
            {
                sumc=parseInt(sumc, 10) + parseInt(item.c_points[i][0].marks, 10);
            }
            for(let i=1; i<item.cpp_points.length; i++)
            {
                sumcpp=parseInt(sumcpp, 10) + parseInt(item.cpp_points[i][0].marks, 10);
            }
            for(let i=1; i<item.java_points.length; i++)
            {
                sumjava=parseInt(sumjava, 10) + parseInt(item.java_points[i][0].marks, 10);
            }
            for(let i=1; i<item.python_points.length; i++)
            {
                sumpython=parseInt(sumpython, 10) + parseInt(item.python_points[i][0].marks, 10);
            }
            if(ans.length!=0)
            {
              data.push({pic:item.pic.toString("utf8"),name:item.name,email:item.email,phone:item.phone,bio:item.bio,id:item._id,
              c_points:sumc,cpp_points:sumcpp,python_points:sumpython,java_points:sumjava,C_certificate:item.C_certificate,
              Cpp_certificate:item.Cpp_certificate,Java_certificate:item.Java_certificate,Python_certificate:item.Python_certificate,linkc:item.linkc,linkcp:item.linkcp,linkj:item.linkj,linkp:item.linkp});     
            }
            }
            res.send(data);
        });
    })



    recordRoutes.route("/getUserInfoAll").post(function (req, res) {
        var user= req.body.user;
        let db_connect = dbo.getDb();
        db_connect
        .collection("Login_Credentials")
        .find({ "name": user }).toArray().then ((ans) => {
                let sumc=0;
                let sumcpp=0;
                let sumjava=0;
                let sumpython=0;
                for(let i=1; i<ans[0].c_points.length; i++)
                {
                    sumc=parseInt(sumc, 10) + parseInt(ans[0].c_points[i][0].marks, 10);
                }
                for(let i=1; i<ans[0].cpp_points.length; i++)
                {
                    sumcpp=parseInt(sumcpp, 10) + parseInt(ans[0].cpp_points[i][0].marks, 10);
                }
                for(let i=1; i<ans[0].java_points.length; i++)
                {
                    sumjava=parseInt(sumjava, 10) + parseInt(ans[0].java_points[i][0].marks, 10);
                }
                for(let i=1; i<ans[0].python_points.length; i++)
                {
                    sumpython=parseInt(sumpython, 10) + parseInt(ans[0].python_points[i][0].marks, 10);
                }
                if(ans.length!=0)
                {
                    res.send({pic:ans[0].pic.toString("utf8"),email:ans[0].email,phone:ans[0].phone,bio:ans[0].bio,id:ans[0]._id,
                              c_points:sumc,cpp_points:sumcpp,python_points:sumpython,java_points:sumjava,C_certificate:ans[0].C_certificate,
                              Cpp_certificate:ans[0].Cpp_certificate,Java_certificate:ans[0].Java_certificate,Python_certificate:ans[0].Python_certificate,linkc:ans[0].linkc,linkcp:ans[0].linkcp,linkj:ans[0].linkj,linkp:ans[0].linkp,subscription:ans[0].subscription,duration:ans[0].duration,end:ans[0].end});     
                }
            });
        
            });


    




  

module.exports = recordRoutes;
