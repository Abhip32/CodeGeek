const {response} = require("express");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route('/getPlans').post(function (req, res) {
    let db_connect = dbo.getDb();

    db_connect.collection("Plans").find().toArray().then((ans) => {
       res.send(ans);
    });

})

recordRoutes.route('/addSubscription').post(function (req, res) {
    let db_connect = dbo.getDb();
    let user=req.body.user;
    let id=req.body.id;
    let date= new Date();
    let sub=req.body.type;
    
    var myquery = { "name": user}
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    console.log("ads");

    if(sub=="Basic"&&month+1<=12)
    {
        let end=`${day}-${month+1}-${year}`;
        console.log(end);
        var newvalues ={$set:{subscription:sub,duration:"1",end:end}};
    }
    if(sub=="Basic"&&month+1>12)
    {
        console.log(sub);
        let end=`${day}-${month+1-12}-${year+1}`;
        var newvalues = {$set:{subscription:sub,duration:"1",end:end}};
    }


    if(sub=="Lite"&&month+3<=12)
    {
        console.log(sub);
        let end=`${day}-${month+3}-${year}`;
        var newvalues = {$set:{subscription:sub,duration:"3",end:end}};
    }

    if(sub=="Lite"&&month+3>12)
    {
        console.log(sub);
        let end=`${day}-${month+3-12}-${year+1}`;
        var newvalues ={$set:{subscription:sub,duration:"3",end:end}};
    }

    if(sub=="Pro"&&month+6<=12)
    {
        console.log(sub);
        let end=`${day}-${month+6}-${year}`;
        var newvalues = {$set:{subscription:sub,duration:"6",end:end}};
    }

    if(sub=="Pro"&&month+6>12)
    {
        console.log(sub);
        let end=`${day}-${month+6-12}-${year+1}`;
        var newvalues = {$set:{subscription:sub,duration:"6",end:end}};
    }
   

    db_connect.collection("Login_Credentials").updateOne(myquery, newvalues, function(err, res){
        if (err) out="fail"
        else out="success"
        console.log("1 document update");
    })

})


recordRoutes.route('/insertTransaction').post(function (req, res) {
    let db_connect = dbo.getDb();
    var cardno=req.body.cardno
    var cardhld=req.body.cardhld
    var userid=req.body.userid
    var date=new Date();
    var type=req.body.type

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let end=`${day}-${month}-${year}`;
    if(type=="Basic")
    {
        var amount="200";
    }

    if(type=="Lite")
    {
        var amount="400";
    }

    if(type=="Pro")
    {
        var amount="1000";
    }

    var myobj = { cardno:cardno, cardhld:cardhld, userid:userid, date:end, type:type, amount:amount};

    db_connect.collection("transaction").insertOne(myobj, function(err, res) {
        if (err) out="fail"
        else out="success"
        console.log("1 document inserted");
      });
      res.send("success");

})


recordRoutes.route('/getTotalTransactions').post(function (req, res) {
    let db_connect = dbo.getDb();
    let price=0;
    db_connect.collection("transaction").find().toArray().then((ans) => {
        for(item of ans)
        {
            price=parseInt(price, 10) + parseInt(item.amount, 10); 
        }
        res.send({price:price});
    })
})


recordRoutes.route('/getTotalTransactionsbyCatagory').post(function (req, res) {
    let db_connect = dbo.getDb();
    let Basic=0;
    let Lite=0;
    let Pro=0;
    db_connect.collection("transaction").find().toArray().then((ans) => {
        for(item of ans)
        {
            if(item.type=="Basic")
            {
                Basic=Basic+1;
            }

            if(item.type=="Lite")
            {
                Lite=Lite+1;
            }

            if(item.type=="Pro")
            {
                Pro=Pro+1;
            }
        }
        console.log(Basic+" "+Lite+" "+Pro);
        res.send({Basic:Basic,Lite:Lite,Pro:Pro});
    })
})


module.exports = recordRoutes;