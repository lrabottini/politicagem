/** api para acesso as informações dos partidos */

module.exports = (app, repository) => {
    app.get('/partidos', async (req, res, next) => {
        const partidos = await repository.listarPartidos()
        if (!partidos || partidos.lenght === 0) return resizeBy.sendStatus(404)
        res.json(partidos)
    }),

    app.get('/partidos/:id', async (req, res, next) => {
        const partido = await repository.listarPartido(req.params.id)
        if (!partido) return res.sendStatus(404)
        res.json(partido)
    })
}