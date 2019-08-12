const router = require('express').Router();
const quizController = require('../controllers/quiz.controller');
const authMiddleware = require('../middlewares/auth-middleware');

// ADD QUIZ CATEGORY
router.post('/skill', authMiddleware, quizController.addQuiz)

// GET ALL SKILL
router.get('/skills', authMiddleware, quizController.getAllQuizSkills)

// SAVE QUESTION WITH SILL
router.post('/question', authMiddleware, quizController.addQuestion)

// GET QUESTION BY SKILL
router.get('/questions/:skill', authMiddleware, quizController.getQuetionBySkill)

// GET ALL QUESTIONS
router.get('/all-questions', authMiddleware, quizController.getAllQuestions)

module.exports = router;