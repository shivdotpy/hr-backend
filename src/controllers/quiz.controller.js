const quizModel = require('../models/quiz.model');
const questionModel = require('../models/question.model');

exports.addQuiz = (req, res) => {
    const Quiz = new quizModel({
        skill: req.body.skill
    })
    Quiz.save((error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
        } else {
            res.status(200).send({
                error: false,
                message: 'Quiz saved successfully !'
            })
        }
    })   
}

exports.getAllQuizSkills = (req, res) => {
    quizModel.find({},{skill:1, _id:0}, (error, result) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later !',
                data: error
            })
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
        quizModel.findOne({skill: req.body.skill}, (error, result) => {
            if (error) {
                res.status(500).send({
                    error: true,
                    message: 'Something went wrong, please try again later !',
                    data: error
                })
            } else if (!result) {
                res.status(400).send({
                    error: true,
                    message: 'No skill matched'
                })
            } else {
                const question = new questionModel({
                    title: req.body.title,
                    options: req.body.options,
                    type: req.body.type
                })
                question.save((saveError, savedQuestion) => {
                    if (saveError) {
                        res.status(500).send({
                            error: true,
                            message: 'Something went wrong, please try again later !',
                            data: saveError
                        })
                    } else {
                        let questionIdArr = [...result.questions]
                        questionIdArr.push(savedQuestion._id)

                        result.questions = questionIdArr
                        result.save()
                    }
                })
            }
        })   
    }
}