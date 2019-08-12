const quizModel = require('../models/quiz.model');
const questionModel = require('../models/question.model');
const controllerResponses = require('../utils/controllerResponses');

exports.addQuiz = (req, res) => {
    const Quiz = new quizModel({
        skill: req.body.skill
    })
    Quiz.save((error, result) => {
        if (error) {
            controllerResponses.error500SomethingWentWrong(req, res, error);
        } else {
            res.status(200).send({
                error: false,
                message: 'Skill saved successfully !'
            })
        }
    })
}

exports.getAllQuizSkills = (req, res) => {
    quizModel.find({}, { skill: 1, _id: 0 }, (error, result) => {
        if (error) {
            controllerResponses.error500SomethingWentWrong(req, res, error);
        } else {
            res.status(200).send({
                error: false,
                message: result.length > 0 ? 'Skills found' : 'No skills available',
                data: result
            })
        }
    })
}

exports.addQuestion = (req, res) => {
    if (!req.body.skill) {
        req.status(400).send({
            error: true,
            message: 'Skill is required to save question'
        })
    } else {
        quizModel.findOne({ skill: req.body.skill }, (error, result) => {
            if (error) {
                controllerResponses.error500SomethingWentWrong(req, res, error);
            } else if (!result) {
                res.status(400).send({
                    error: true,
                    message: 'No skill matched'
                })
            } else {
                const question = new questionModel({
                    title: req.body.title,
                    options: req.body.options,
                    type: req.body.type,
                    skill: req.body.skill
                })
                question.save((saveError, savedQuestion) => {
                    if (saveError) {
                        controllerResponses.error500SomethingWentWrong(req, res, saveError);
                    } else {
                        let questionIdArr = [...result.questions]
                        questionIdArr.push(savedQuestion._id)

                        result.questions = questionIdArr
                        result.save((errorSaveId, resultSaveId) => {
                            if (errorSaveId) {
                                controllerResponses.error500SomethingWentWrong(req, res, errorSaveId);
                            } else {
                                res.status(200).send({
                                    error: false,
                                    message: 'Question saved successfully !'
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.getQuetionBySkill = (req, res) => {
    quizModel.findOne({ skill: req.params.skill }, (error, result) => {
        if (error) {
            controllerResponses.error500SomethingWentWrong(req, res, error);
        } else if (result) {
            res.status(200).send({
                error: false,
                message: 'Questions found',
                data: result.questions
            })
        } else {
            res.status(400).send({
                error: true,
                message: 'No skill matched with this skill'
            })
        }
    }).populate('questions')
}

exports.getAllQuestions = (req, res) => {
    questionModel.find({}, (error, result) => {
        if (error) {
            controllerResponses.error500SomethingWentWrong(req, res, error)
        } else {
            res.status(200).send({
                error: false,
                data: result
            })
        }
    })
}
