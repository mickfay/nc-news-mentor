const db = require('../db/connection.js')

exports.selectTopics = () => {
    return db.query('SELECT * FROM TOPICS').then((response) => {
        return response.rows
    })
}