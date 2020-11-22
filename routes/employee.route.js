'use strict';

var express = require('express');
var employeeController = require('../controllers/employee.controller');

var api = express.Router();

api.post('/saveEmployee', employeeController.saveEmployee);
api.put('/editEmployee/:id', employeeController.updateEmployee);
api.delete('/removeEmployee/:id', employeeController.removeEmployee);
api.get('/seachEmployees', employeeController.searchEmployee);

module.exports = api;
