require('dotenv').config({path: __dirname + '/./../../.env', debug: true})
const database = require('./database.js')

test('MongoDB Connection', async () => {
    const connection = await database.connect()
    expect(connection).toBeTruthy()
})
 
test('MongoDB Disconnection', async () => {
    const isDisconnected = await database.disconnect()
    expect(isDisconnected).toBeTruthy()
})

