const express = require('express')
const app = express()
const {getTopics} = require('./controllers/topics.controllers.js')
const {getEndpoints} = require('./controllers/endpoints.controllers.js')
const {getArticleById, getArticles, getCommentsById} = require('./controllers/articles.controllers.js')

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.use((err, req, res, next) => {
    const psqlRegex = /(22P02)/
    if(psqlRegex.test(err.code)){
        res.status(400).send({ msg : 'Bad Request'})
    }
    else(next(err))
})
app.use((err, req, res, next) => {
    if(err.code === 404){
        res.status(404).send({ msg : `${err.msg} not found`})
    }
})

module.exports = app