const mongoose = require('mongoose');

const quizModel = mongoose.Schema({
    skill: {
        type: String,
        lowercase: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    }]

})

module.exports = mongoose.model('quiz', quizModel)