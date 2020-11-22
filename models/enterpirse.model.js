'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enterpirseSchema = Schema({
    name: String,
    email: String,
    CEO: String,
    socialMedia: [],
    phones: [],
    direction: String,
    socialApproach: String,
    employees: [{ type: Schema.Types.ObjectId, ref: 'employee'}]
});

module.exports = mongoose.model('enterprise', enterpirseSchema);