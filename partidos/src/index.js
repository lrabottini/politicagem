(async () => {
    require('dotenv').config({path: __dirname + '/./../.env', debug: true})

    const partidos = require('./api/partidos')
    const server = require('./server/server')
    const repository = require('./repository/repository')

    try {
        await server.start(partidos, repository)
        console.log('Server is up and running at ' + process.env.PORT)
    } catch (error) {
        console.log(error)
    }
})()