const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(require("./routes/LoginRoute"));
app.use(require("./routes/UserInfoRoute"));
app.use(require("./routes/ProblemsRoute"));
app.use(require("./routes/CompilerRoutes"));
app.use(require("./routes/AdminLogin"));
app.use(require("./routes/AdminFunctions"));
app.use(require("./routes/ExaminationRoute"));
app.use(require("./routes/TestRoutes"));


var bodyParser = require('body-parser')
// To connect with your mongoDB database
const mongoose = require("mongoose");
const { useParams } = require("react-router-dom");
const PORT = 8000;
const Axios = require("axios");
const db = require('./db/conn'); 



db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // Start the server
  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
});
