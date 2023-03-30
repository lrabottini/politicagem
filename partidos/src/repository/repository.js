const database = require('../config/database')
const { ObjectId } = require ('mongodb')

async function getPartidos(){
    const db = await database.connect()
    return db.collection('partidos').find().toArray()
}

async function getPartido(id){
    const db = await database.connect()
    return db.collection('partidos').findOne({id})
}

async function createPartido(partido){
    const db = await database.connect()
    return db.collection('partidos').insertOne(partido)
}

async function updatePartido(filter, partido){
    const db = await database.connect()
    return db.collection('partidos').updateOne(filter, partido)
}

async function deletePartido(partido){
    const db = await database.connect()
    return db.collection('partidos').deleteOne(partido)
}
    
async function disconnect() {
    return database.disconnect();
}

module.exports = { getPartido, getPartidos, createPartido, updatePartido, deletePartido, disconnect }
