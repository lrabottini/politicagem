require('dotenv').config({path: __dirname + '/./../../.env', debug: true})
const supertest = require('supertest')
const partidos = require('./partidos')
const server = require('../server/server')
const repository = require('../repository/repository')

var testId = null
let app = null

beforeAll(async () => {
    app = await server.start(partidos, repository)

    const result = await repository.listarPartidos()
    testId = result[0].id    

    console.log(testId)
})

afterAll(async () => {
    await server.stop()
})

test('GET /partidos', async () => {
    const response = await supertest(app).get('/partidos')

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(0)
})

test('GET /partidos/:id', async () => {
    const response = await supertest(app).get('/partidos/' + testId)

    expect(response.status).toEqual(200)
    expect(response.body).toBeTruthy()
    expect(response.body.id).toEqual(testId)
})

test('GET /partidos/:id inexistente', async () => {
    const response = await supertest(app).get('/partidos/-1')

    expect(response.status).toEqual(404)
})
