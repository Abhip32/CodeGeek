const express = require("express");

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

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno))
    {
            return true;
    }
  else
    {
          return false;
    }
}






// This section will help you get a single record by id
recordRoutes.route("/SignUp").post(function (req, res) {
    let user=req.body.user;
	let pass=cryptr.encrypt(req.body.pass);
    let pic=req.body.pic;
    if(pic=="")
    {
        pic="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
    }
    let email=req.body.email;
    let phoneno=req.body.phoneno;
    let bio=req.body.bio;
    let errors=[];

    if(user==""||email==""||pass==""||phoneno==""||bio=="")
    {
        errors.push("Please fill all the fields");
    }


    let db_connect= dbo.getDb();
    db_connect.collection("Login_Credentials").find({"name":user}).toArray().then((ans)=>{
        if(ans.length>0)
        {
            errors.push("Username is already taken");
        }
        if(ans.length>0&&ans[0].email==email)
        {
            errors.push("Email is already taken");
        }
        if(!CheckPassword(cryptr.decrypt(pass)))
        {
            errors.push("Check if a password between 7 to 15 characters which contain at least one numeric digit and a special character");
        }

        if(!ValidateEmail(email))
        {
            errors.push("Please Enter a valid email");
        }

        if(!phonenumber(phoneno))
        {
            errors.push("Please Enter a valid phonenumber");
        }
        
        if(ans.length==0&&user!=""&&email!=""&&pass!=""&&bio!=""&&phoneno!=""&&CheckPassword(cryptr.decrypt(pass))&&ValidateEmail(email)&&phonenumber(phoneno))
        {
            var myobj = { name: user, password: pass, pic: pic, email: email, phone: phoneno, bio : bio, c_points:[],cpp_points:[],java_points:[],python_points:[],C_certificate:"",Cpp_certificate:"",Java_certificate:"",Python_certificate:"",linkc:"",linkcp:"",linkj:"",linkp:"",subscription:"",duration:"",end:""};
            db_connect
            .collection("Login_Credentials").insertOne(myobj, function(err, res) {
                if (err) out="fail"
                else out="success"
                console.log("1 document inserted");
              });
        }
        res.send(errors);
    })
    console.log(errors);
 

})



recordRoutes.route("/SignUpValidation").post(function (req, res) {
    let user=req.body.user;
    let email=req.body.email;
    let phoneno=req.body.phoneno;
    let errors=[];
    console.log(user);

  
   
})
  

module.exports = recordRoutes;
