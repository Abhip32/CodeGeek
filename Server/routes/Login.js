const express = require("express");
var nodemailer = require('nodemailer');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const { createHash, publicDecrypt } = require('crypto');

function CheckPassword(inputtxt) 
{ 
var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
console.log(inputtxt);
if(inputtxt.match(paswd)) 
{ 
    return true;
    }
    else
    { 
    return false;
}
}  




// This section will help you get a single record by id
recordRoutes.route("/login").post(function (req, res) {
  let user=req.body.user;
	let pass=req.body.pass;
  let db_connect = dbo.getDb();
  const date = new Date();

  db_connect
      .collection("Login_Credentials")
      .find({ "name": user })
      .toArray().then ((ans) => {
        if(ans.length!=0&&cryptr.decrypt(ans[0].password)==pass&&date<=ans[0].end)
        {
          res.status(200).send(ans);
        }
        else if(ans.length!=0&&cryptr.decrypt(ans[0].password)==pass&&(date>ans[0].end||end==''))
        {
          res.status(305).send(ans);
        }
        else{
            res.status(404).send(ans);
        }
    })
});

recordRoutes.route("/glogin").post(function (req, res) {
  let email=req.body.email
  let db_connect = dbo.getDb();
  const date = new Date();
  db_connect.collection("Login_Credentials").find({"email": email}).toArray().then((ans)=>{
    console.log(ans);
    if(ans.length!=0&&date<=ans[0].end)
    {
      console.log(ans[0].name)
      res.send(ans[0].name)
    }
    else if(ans.length!=0&&date>ans[0].end)
    {
      res.send("Subscription")
    }
    else
    {
      res.send("failed")
    }
  })
})



  recordRoutes.route("/Otp").post(function (req, res) {
    let email=req.body.email; 
    let db_connect = dbo.getDb();
    console.log(email);
    var val = Math.floor(1000 + Math.random() * 9000);

    db_connect.collection("Login_Credentials").find({"email": email}).toArray().then((ans)=>{
      console.log(ans);
      if(ans.length!=0)
      {
        console.log(ans[0].name)
        var transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: {
            user: 'CodeGeek1332@outlook.com',
            pass: 'CodeGeek@1332'
          }
        });
        
        var mailOptions = {
          from: 'CodeGeek1332@outlook.com',
          to: email,
          subject: `Password Recovery OTP`,
          text: 'Your OTP is '+" "+val
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.send({user:ans[0].name,val:val})
      }
      else if(ans.length==0)
      {
        res.send("Error")
      }
    })
})

recordRoutes.route("/chgp").post(function (req, res) {
  let user=req.body.user;
  let password=cryptr.encrypt(req.body.pass);
  if(!CheckPassword(cryptr.decrypt(password)))
  {
      res.send("Check if a password between 7 to 15 characters which contain at least one numeric digit and a special character");
  }
  if(CheckPassword(cryptr.decrypt(password)))
  {
    var myquery = { "name": user };
    var newvalues = { $set: {"password": password}};
    let db_connect = dbo.getDb();
    db_connect.collection("Login_Credentials").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    })
    res.send("Success")
  }
})
  
module.exports = recordRoutes;
