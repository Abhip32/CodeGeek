// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const UserModel = require('../models/problemModel');
const ProblemController= require('../controllers/ProblemController');

router.get('/getAllProblems',ProblemController.getAllProblems)
router.get('/getProblemDetails',ProblemController.getProblemDetails)
router.post('/addComment',ProblemController.addComment)
router.get('/getComments',ProblemController.getComments)
router.post('/AddSolved',ProblemController.AddSolved)
router.post('/AddPoints',ProblemController.AddPoints)


module.exports = router