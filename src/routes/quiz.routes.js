const router = require('express').Router();
const quizController = require('../controllers/quiz.controller');
const authMiddleware = require('../middlewares/auth-middleware');

// ADD QUIZ CATEGORY
router.post('/', authMiddleware, quizController.addQuiz)

router.get('/skills', authMiddleware, quizController.getAllQuizSkills)

module.exports = router;