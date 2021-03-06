const mongoose = require('mongoose');

const employeeModel = mongoose.Schema({
    empId: {
        type: Number
    },
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    salary: {
        type: Number
    },
    mobile: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'employee']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeModel);