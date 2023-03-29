require('express-async-errors')
const express = require('express')
const morgan = require('morgan')
let server = null

async function start(api, repository){
    const app = express()
    app.use(morgan('dev'))

    app.use((err, req, resp, next) => {
        console.error(err)
        resp.sendStatus(500)
    })

    api(app, repository)

    server = app.listen(process.env.PORT)
    return server
}

async function stop(){
    if (server) await server.close()
    return true
}

module.exports = { start, stop }