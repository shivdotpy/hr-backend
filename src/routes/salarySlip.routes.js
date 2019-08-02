const router = require('express').Router();
const salarySlipController = require('../controllers/salarySlip.controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, salarySlipController.generateSalarySlip);

module.exports = router;