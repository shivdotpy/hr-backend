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


    employeeModel.findOne({ empId: req.body.empId }, (error, employeeResult) => {

        if (!req.body.empId) {
            return res.status(400).send({
                error: true,
                message: 'Field "empId"required !'
            })
        }

        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else if (employeeResult) {
            res.status(400).send({
                error: true,
                message: 'Employee Id already exists'
            })
        } else {
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
        }
    })
};

exports.getAllEmployees = (req, res) => {
    employeeModel.find({}, { _id: 0, empId: 1, firstName: 1, lastName: 1, mobile: 1, role: 1 }, { sort: { 'empId': 1 } }, (error, result) => {
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
    employeeModel.findOne({ empId: req.params.empId }, {
        _id: 0,
        empId: 1,
        firstName: 1,
        lastName: 1,
        mobile: 1,
        salary: 1,
        role: 1
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


exports.updateEmployeeById = (req, res) => {
    employeeModel.findOne({ empId: req.params.empId }, (error, empDoc) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else if (!empDoc) {
            res.status(400).send({
                error: true,
                message: `No employee found with this empId: ${req.params.empId}`
            })
        } else {
            empDoc.firstName = req.body.firstName
            empDoc.lastName = req.body.lastName
            empDoc.salary = req.body.salary
            empDoc.mobile = req.body.mobile
            empDoc.role = req.body.role
            empDoc.save()
            res.status(200).send({
                error: false,
                message: "Employee updated successfully !"
            })
        }
    })
}


exports.deleteEmployee = (req, res) => {
    employeeModel.findOneAndRemove({ empId: req.params.empId }, (error, deleted) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else if (deleted) {
            res.status(200).send({
                error: false,
                message: `Employee with empId : ${req.params.empId} deleted successfully !`
            })
        } else {
            res.status(400).send({
                error: true,
                message: `No employee found with this empId: ${req.params.empId}`
            })
        }
    })
}


