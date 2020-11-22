'use strict';

var express = require('express');
var enterpriseController = require('../controllers/enterprise.controller');

var api = express.Router();

api.post('/saveEnterprise', enterpriseController.saveEnterprise);
api.put('/editEnterprise/:id', enterpriseController.updateEnterprise);
api.delete('/removeEnterprise/:id', enterpriseController.removeEnterprise);
api.get('/count/:id', enterpriseController.count); 

module.exports = api;