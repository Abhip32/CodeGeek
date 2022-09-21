const express = require("express");
var request = require('request');


// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

recordRoutes.route("/addcomment").post(function (req, res) {
    let db_connect = dbo.getDb();
    var id= req.body.id;
    var identi=req.body.identi;
    var lang=req.body.lang;
    var comm=req.body.comment;
    var myquery = { "identifier": identi, "language": lang}

    db_connect
    .collection("Login_Credentials") .find({ "_id": ObjectId(id) }).toArray().then ((ans) => {
        let pic=ans[0].pic.toString("utf8");
        let name=ans[0].name;
        let newvalues = { $addToSet: {comments:{userid:id,comment:comm,pic:pic,name:name} }}

    db_connect.collection("Problems").updateOne(myquery, newvalues, function(err, res){
        if (err) out="fail"
        else out="success"
        console.log("1 comment inserted");
       
    })
    }
    )
    res.send("success");
})

recordRoutes.route("/getcomments").post(function (req, res) {
    let db_connect = dbo.getDb();
    var id= req.body.id;
    var identi=req.body.identi;
    var lang=req.body.lang;
    var comm=req.body.comment;

    db_connect .collection("Problems")
        .find({identifier: identi,language: lang }).toArray().then ((ans) => {
           res.send(ans[0].comments) 
           console.log("Getting Comments");          
        });

})






// This section will help you get a single record by id
  recordRoutes.route("/compile").post(function (req, res) {
        //getting the required data from the request
        let code = req.body.code;
        let language = req.body.language;
        let input = req.body.input;
    
        var output;
    
        let data = ({
            script : code,
            language: language,
            stdin: input,
            versionIndex: "0",
            clientId: "68b4ba8607c4881ec70e408c569d8cec",
            clientSecret:"ae90f023a140410523692ee888687414aa56a703b5ae859a815e795db52ed956"
        });
    
        
        request({
            url: 'https://api.jdoodle.com/v1/execute',
            method: "POST",
            json: data
        },
        
        
        
       async function out(error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body.output);
    
            output=body.output;
            res.send(output)
        }        
    )
})    


module.exports = recordRoutes;