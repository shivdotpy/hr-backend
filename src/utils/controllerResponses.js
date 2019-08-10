exports.error500SomethingWentWrong = (req, res, error) => {
    res.status(500).send({
        error: true,
        message: 'Something went wrong, please try again later !',
        data: error
    })
}