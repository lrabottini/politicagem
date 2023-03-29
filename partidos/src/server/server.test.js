require('dotenv').config({path: __dirname + '/./../../.env', debug: true})
const server = require('./server')

function apiMock(){
    console.log('Do nothing')
}

test('Iniciando servidor', async () =>{
    const instance = await server.start(apiMock, null)
    expect(instance).toBeTruthy()
})

test('Encerrando servidor', async () => {
    const isStoppped = await server.stop()
    expect(isStoppped).toBeTruthy()
})