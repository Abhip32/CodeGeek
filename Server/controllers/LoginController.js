const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const UserModel = require("../models/usermodel");
const cryptr = new Cryptr('myTotallySecretKey');
const fs = require('fs');

function CheckPassword(inputtxt) {
  const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return paswd.test(inputtxt);
}

const LoginControllers = {
  Login: async (req, res) => {
    const email = req.body.user;
    const pass = req.body.pass;
    const date = new Date();
    console.log(email)

    try {
      const data = await UserModel.find({ "email": email });
      console.log(pass)
      if (data.length !== 0 && cryptr.decrypt(data[0].password) === pass) {
        res.status(200).json(data);
      } else if (data.length === 0) {
        res.status(350).json("Register First");
      } else if (data.length !== 0 && cryptr.decrypt(data[0].password) !== pass) {
        console.log(cryptr.decrypt(data[0].password));
        res.status(315).json("Wrong Credentials");
      } else if (data.length !== 0 && cryptr.decrypt(data[0].password) === pass) {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  GoogleLogin: async (req, res) => {
    const email = req.body.email;
    const date = new Date();

    try {
      const data = await UserModel.find({ "email": email });
      if (data.length !== 0) {
        res.status(200).json(data);
      } else if (data.length === 0) {
        res.status(350).json("Register First");
      }else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  SignUp: async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const user = req.body.user;
    const pass = cryptr.encrypt(req.body.pass);
    const email = req.body.email;
    const phoneno = req.body.phone;
    const bio = req.body.bio;

    if (!user || !pass || !email || !phoneno || !bio) {
      res.status(203).json({ message: "Please fill all fields" });
      return;
    }

    if (!CheckPassword(req.body.pass)) {
      res.status(203).json({ message: "Password doesn't match the requirements" });
      return;
    }

    try {
      const existingUser = await UserModel.findOne({ "email": email });
      if (existingUser) {
        res.status(203).json({ message: "Email Already Taken" });
      } else {
        let filePath = 'Storage/default.jpg';
        if (req.file && req.file.filename) {
          filePath = 'Storage/' + req.file.filename;
        }

        const newUser = new UserModel({
          name: user,
          pic: { data: fs.readFileSync(filePath), contentType: "image/jpg" },
          password: pass,
          email: email,
          phone: phoneno,
          bio: bio,
          c_Status: "",
          cpp_Status: "",
          java_Status: "",
          python_Status: "",
        });

        const savedUser = await newUser.save();
        res.status(200).json({ name: savedUser.name, email: savedUser.email, pic: fs.readFileSync(filePath) });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  OTP: async (req, res) => {
    const email = req.body.email;
    const val = Math.floor(1000 + Math.random() * 9000);

    try {
      const data = await dbo.getDb().collection("Login_Credentials").find({ "email": email }).toArray();
      if (data.length !== 0) {
        const transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: {
            user: 'CodeGeek1332@outlook.com',
            pass: 'CodeGeek@1332'
          }
        });

        const mailOptions = {
          from: 'CodeGeek1332@outlook.com',
          to: email,
          subject: `Password Recovery OTP`,
          text: 'Your OTP is ' + " " + val
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.send({ user: data[0].name, val: val });
      } else {
        res.send("Error");
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  ChangePassword: async (req, res) => {
    const user = req.body.user;
    const password = cryptr.encrypt(req.body.pass);

    if (!CheckPassword(cryptr.decrypt(password))) {
      res.send("Check if a password between 7 to 15 characters which contain at least one numeric digit and a special character");
      return;
    }

    try {
      const myquery = { "name": user };
      const newvalues = { $set: { "password": password } };
      await dbo.getDb().collection("Login_Credentials").updateOne(myquery, newvalues);
      res.send("Success");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
};

module.exports = LoginControllers;
