const { selectEndpoints} = require('../models/endpoints.models.js')

exports.getEndpoints = (req, res, next) => {
    selectEndpoints().then((endpoints) => {
        res.status(200).send({ endpoints })
    }).catch(next)
}