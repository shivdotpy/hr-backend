const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth-middleware');

// SAVE ONE EMPLOYEE
router.post('/', authMiddleware, employeeController.saveEmployee);

// GET ALL EMPLOYEE
router.get('/', authMiddleware, employeeController.getAllEmployees);

// GET ONE EMPLOYEE
router.get('/:empId', authMiddleware, employeeController.getEmployeeById);


module.exports = router;