const fs = require('fs/promises')

exports.selectEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8').then((endpointData) => {
        return JSON.parse(endpointData)
    })
}