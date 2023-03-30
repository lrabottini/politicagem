require('dotenv').config({path: __dirname + '/./../../.env', debug: true})
const repository = require('./repository')

beforeAll(async () => {
    const partidos = await repository.getPartidos()
    testId = partidos[0].id
})

test('Listar todos os partidos', async () => {
    const partidos = await repository.getPartidos()
    expect(Array.isArray(partidos)).toBeTruthy()
    expect(partidos.length).toBeGreaterThan(0)
})

test('Lista um partido específico', async () => {
    const partido = await repository.getPartido(testId)
    expect(partido).toBeTruthy()
    expect(partido.id).toEqual(testId)
})

test('Insere e exclui um partido carregado da base dos dados abertos da câmara', async () => {
    const mockPartido = { name: "Partido Mock", sigla: "PM", id: 1}
    await repository.createPartido(mockPartido)

    const insertResult = await repository.getPartido(mockPartido.id)
    expect(insertResult).toBeTruthy
    expect(insertResult.id).toEqual(mockPartido.id)

    const deleteResult = await repository.deletePartido({ id: insertResult.id})
    expect(deleteResult.deletedCount).toEqual(1)
})

test('Insere, edita e exclui um partido carregado da base dos dados abertos da câmara', async () => {
    const mockPartido = { name: "Partido Mock", sigla: "PM", id: 1}
    await repository.createPartido(mockPartido)

    const insertResult = await repository.getPartido(mockPartido.id)
    expect(insertResult).toBeTruthy
    expect(insertResult.id).toEqual(mockPartido.id)

    const filter = { id: insertResult.id }
    const update = { $set: { name: "Partido Mock Editado"},}
    const updateResult = await repository.updatePartido(filter, update)
    expect(updateResult).toBeTruthy
    expect(updateResult.modifiedCount).toEqual(1)

    const deleteResult = await repository.deletePartido({ id: insertResult.id})
    expect(deleteResult.deletedCount).toEqual(1)
})

test('Fechar conexão', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})