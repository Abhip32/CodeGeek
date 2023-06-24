// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const UserModel = require('../models/usermodel');
const LoginController= require('../controllers/LoginController')





router.post('/login',LoginController.Login)
router.post('/glogin',LoginController.GoogleLogin)
router.post('/Signup',LoginController.SignUp)
router.post('/Otp',LoginController.OTP)
router.post('/updateProfile',LoginController.update)
router.post('/deleteProfile',LoginController.delete)

module.exports = router