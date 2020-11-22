'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = Schema({
    name: String,
    lastname: String,
    phone: String,
    email: String,
    position: String,
    departament: String,
    salary: String,
    supervisor: String,
    dpi: String,
    enterprise: String
});

module.exports = mongoose.model('employee', employeeSchema);