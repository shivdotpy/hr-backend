const employeeModel = require('../models/employee.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createAdmin = (req, res) => {
    const secretKey = req.body.secret;
    if (!secretKey) {
        return res.status(400).send({
            error: true,
            message: 'Please provide secret key !'
        })
    } else if (secretKey !== '1234567890qwertyuiop') {
        return res.status(400).send({
            error: true,
            message: 'Invalid Authentication Secret !'
        })
    } else {

        const saltRounds = 10;

        // Generate Hash
        bcrypt.hash(req.body.password, saltRounds, function (error, hash) {
            if (error) {
                res.status(500).send({
                    error: true,
                    message: 'Something went wrong, please try again later !',
                    data: error
                })
            } else {
                const employee = new employeeModel({
                    empId: req.body.empId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    salary: req.body.salary,
                    mobile: req.body.mobile,
                    password: hash,
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
                            message: 'Admin Employee saved successfully !'
                        })
                    }
                })
            }
        });
    }
};

exports.loginAdmin = (req, res) => {
    employeeModel.findOne({ mobile: req.body.mobile }, (error, employee) => {
        if (!employee) {
            res.status(401).send({
                error: true,
                message: 'Authentication Failed !',
                data: error
            })
        } else {
            bcrypt.compare(req.body.password, employee.password, function (error, result) {
                if (!result) {
                    return res.status(401).send({
                        error: true,
                        message: 'Authentication Failed !',
                        data: error
                    })
                } else {
                    // Generate Access token and send to client

                    const jwtPrivateToken = 'revfinfotech';

                    jwt.sign({ id: employee._id }, jwtPrivateToken, function (error, token) {
                        if (error) {
                            res.status(500).send({
                                error: true,
                                message: 'Something went wrong, please try again later !',
                                data: error
                            })
                        } else {
                            res.status(200).send({
                                error: false,
                                token: token
                            })
                        }
                    });

                }
            });
        }
    })
};