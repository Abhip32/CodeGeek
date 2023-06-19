// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const UserModel = require('../models/usermodel');
const LoginController= require('../controllers/LoginController')
const multer = require('multer');
const uuidv4 = require('uuid');

const DIR = './Storage/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.post('/login',LoginController.Login)
router.post('/glogin',LoginController.GoogleLogin)
router.post('/Signup',upload.single('profileImg'),LoginController.SignUp)

module.exports = router