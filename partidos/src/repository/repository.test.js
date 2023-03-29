require('dotenv').config({path: __dirname + '/./../../.env', debug: true})
const repository = require('./repository')

beforeAll(async () => {
    const partidos = await repository.listarPartidos()
    testId = partidos[0].id
})

test('Listar todos os partidos', async () => {
    const partidos = await repository.listarPartidos()
    expect(Array.isArray(partidos)).toBeTruthy()
    expect(partidos.length).toBeGreaterThan(0)
})

test('Lista um partido específico', async () => {
    const partido = await repository.listarPartido(testId)
    expect(partido).toBeTruthy()
    expect(partido.id).toEqual(testId)
})

test('Fechar conexão', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})