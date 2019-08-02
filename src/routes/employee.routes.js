const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');


// SAVE ONE EMPLOYEE
router.post('/', employeeController.saveEmployee);

// GET ALL EMPLOYEE
router.get('/', employeeController.getAllEmployees);

// GET ONE EMPLOYEE
router.get('/:empId', employeeController.getEmployeeById);


module.exports = router;