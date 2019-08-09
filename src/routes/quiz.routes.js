const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

// SAVE EMPLOYEE WITH ADMIN ROLE
router.post('/', adminController.createAdmin);

// LOGIN ADMIN
router.post('/login', adminController.loginAdmin);

module.exports = router;