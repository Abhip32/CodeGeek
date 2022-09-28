const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(require("./routes/Subscription"));
app.use(require("./routes/Login"));
app.use(require("./routes/Signup"));
app.use(require("./routes/UserInfo"));
app.use(require("./routes/Problems"));
app.use(require("./routes/Compiler"));
app.use(require("./routes/AdminLogin"));
app.use(require("./routes/AdminFunctions"));
app.use(require("./routes/Examination"));
app.use(require("./routes/Plan"));
var bodyParser = require('body-parser')
// To connect with your mongoDB database
const mongoose = require("mongoose");
const { useParams } = require("react-router-dom");
const PORT = 8000;
const Axios = require("axios");
var request = require('request');
var open = require('open');


// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
