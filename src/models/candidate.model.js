const mongoose = require('mongoose');

const candidateModel = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    mobile: {
        type: String,
        unique: true
    },
    result: {
        type: Object
    }
})

module.exports = mongoose.model('candidate', candidateModel)