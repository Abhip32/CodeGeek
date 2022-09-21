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
    var out="";

    let db_connect = dbo.getDb();
    var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:""};
    db_connect
    .collection("Login_Credentials").insertOne(myobj, function(err, res) {
        if (err) out="fail"
        else out="success"
        console.log("1 document inserted");
      });
      res.send("success");
})

  

module.exports = recordRoutes;
