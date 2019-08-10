const candidateModel = require('../models/candidate.model');
const controllerResponses = require('../utils/controllerResponses');


exports.addCandidate = (req, res) => {
       const candidate = new candidateModel({
           name: req.body.name,
           email: req.body.email,
           mobile: req.body.mobile
       })
       
       candidate.save((error, saved) => {
           if (error) {
            controllerResponses.error500SomethingWentWrong(req, res, error)
           } else {
               res.status(200).send({
                   error: false,
                   message: 'Candidate saved successfully'
               })
           }
       })
}