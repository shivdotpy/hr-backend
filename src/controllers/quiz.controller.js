const quizModel = require('../models/quiz.model');

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