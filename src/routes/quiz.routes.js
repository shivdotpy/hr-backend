const router = require('express').Router();
const quizController = require('../controllers/quiz.controller');
const authMiddleware = require('../middlewares/auth-middleware');

// ADD QUIZ CATEGORY
router.post('/skill', authMiddleware, quizController.addQuiz)

router.get('/skills', authMiddleware, quizController.getAllQuizSkills)

router.post('/question', authMiddleware, quizController.addQuestion)

module.exports = router;