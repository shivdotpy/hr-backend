const employeeModel = require('../models/employee.model');

exports.saveEmployee = (req, res) => {
    const employee = new employeeModel({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary,
        mobile: req.body.mobile,
        role: req.body.role
    });

    employee.save((error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else {
            res.status(201).send({
                error: false,
                message: 'Employee saved successfully !'
            })

        }
    })
};

exports.getAllEmployees = (req, res) => {
    employeeModel.find({}, {_id: 0, empId: 1, firstName: 1, lastName: 1, mobile: 1}, (error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else {
            res.status(200).send({
                error: false,
                data: result
            })
        }
    })
};

exports.getEmployeeById = (req, res) => {
    employeeModel.findOne({empId: req.params.empId}, {
        _id: 0,
        empId: 1,
        firstName: 1,
        lastName: 1,
        mobile: 1
    }, (error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else {
            res.status(200).send({
                error: false,
                data: result
            })
        }
    })
};


