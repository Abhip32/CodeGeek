// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const TestController= require('../controllers/TestController')


router.post('/getQuestions',TestController.getTest)
router.post('/getTest',TestController.getTestQuestions)
router.post('/submit',TestController.submitTest)
router.post('/createTest',TestController.createTest)
router.post('/testdetails',TestController.testDetails)
router.post('/delev',TestController.delev)



module.exports = router