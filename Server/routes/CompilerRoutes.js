// yourRoutes.js
const express = require('express');
const router = require('express').Router()
const CompilerController=require('../controllers/CompilerController');

router.post('/compile',CompilerController.compile)


module.exports = router