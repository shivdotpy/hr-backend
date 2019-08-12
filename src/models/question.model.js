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
    skill: {
        type: String
    }
})

module.exports = mongoose.model('question', questionModel)