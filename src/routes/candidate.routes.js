const router = require('express').Router();
const candidateSlipController = require('../controllers/candidate.controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, candidateSlipController.addCandidate);

module.exports = router;