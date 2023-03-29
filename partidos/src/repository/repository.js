const database = require('../config/database')
const { ObjectId } = require ('mongodb')

async function listarPartidos(){
    const db = await database.connect()
    return db.collection('partidos').find().toArray()
}

async function listarPartido(id){
    const db = await database.connect()
    return db.collection('partidos').findOne({id})
}

async function disconnect() {
    return database.disconnect();
}

module.exports = { listarPartidos, listarPartido, disconnect }
