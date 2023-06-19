// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const ExaminationController =require('../controllers/ExaminationController');

router.post('/createExamId',ExaminationController.setExamId)
router.post('/setCaseResult',ExaminationController.setCaseResults)
router.post('/getQuestion',ExaminationController.getQuestion)


module.exports = router