const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    title: {
        type: String
    },
    options: {
        type: Array
    },
    type: {
        type: String
    },
    answers: {
        type: Array
    }

})

module.exports = mongoose.model('question', questionModel)