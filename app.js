const express = require('express')
const app = express()
const {getTopics} = require('./controllers/topics.controllers.js')
const {getEndpoints} = require('./controllers/endpoints.controllers.js')

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.use((err, req, res, next) => {
    res.status(500).send({ msg : 'Server Error'})

})

module.exports = app