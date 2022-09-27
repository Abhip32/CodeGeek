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
recordRoutes.route("/SignUp").post(function (req, res) {
    let user=req.body.user;
	let pass=req.body.pass;
    let pic=req.body.pic;
    if(pic=="")
    {
        pic="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
    }
    let email=req.body.email;
    let phoneno=req.body.phoneno;
    let bio=req.body.bio;
    let sub=req.body.subscription;
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    console.log(sub+" "+month);

    if(sub=="Basic"&&month+1<=12)
    {
        let end=`${day}-${month+1}-${year}`;
        console.log(end);
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"1",end:end};
    }
    if(sub=="Basic"&&month+1>12)
    {
        console.log(sub);
        let end=`${day}-${month+1-12}-${year+1}`;
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"1",end:end};
    }


    if(sub=="Lite"&&month+3<=12)
    {
        console.log(sub);
        let end=`${day}-${month+3}-${year}`;
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"3",end:end};
    }

    if(sub=="Lite"&&month+3>12)
    {
        console.log(sub);
        let end=`${day}-${month+3-12}-${year+1}`;
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"3",end:end};
    }

    if(sub=="Pro"&&month+6<=12)
    {
        console.log(sub);
        let end=`${day}-${month+6}-${year}`;
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"6",end:end};
    }

    if(sub=="Pro"&&month+6>12)
    {
        console.log(sub);
        let end=`${day}-${month+6-12}-${year+1}`;
        var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:sub,duration:"6",end:end};
    }
    
    var out="";

    let db_connect = dbo.getDb();
   
    db_connect
    .collection("Login_Credentials").insertOne(myobj, function(err, res) {
        if (err) out="fail"
        else out="success"
        console.log("1 document inserted");
      });
      res.send("success");
})

  

module.exports = recordRoutes;
