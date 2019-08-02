const jwt = require('jsonwebtoken');

module.exports = authMiddleware = (req, res, next) => {

    // Check if Bearer token is sent or not
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: true,
            message: 'Authentication failed !'
        })
    } else {
        jwt.verify(req.headers.authorization.split(" ")[1], 'revfinfotech', function (error, decoded) {
            if (error) {
                res.status(401).send({
                    error: true,
                    message: 'Authentication failed !',
                })
            } else {
                next()
            }
        });
    }
};