// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const UserModel = require('../models/problemModel');
const UserDataController= require('../controllers/UserDataController');

router.post('/getAllUserInfo',UserDataController.getUserData)


module.exports = router