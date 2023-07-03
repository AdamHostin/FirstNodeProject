import { read } from 'fs'
import mongodb from 'mongodb'

//connectToCluster(connectionURL)
// collection == table in NOSQL
// document is single record inside collection
async function writeMany (db, collection, documents) {
    let info 
    let result
    result = await db.collection(collection).insertMany( info = documents)
    console.log(result, info)
}

async function ReadCollection(db, collection, criteria = {}) {
    let result
    result = await db.collection(collection).find(criteria).toArray()
    console.log(result)
}

async function ReadOneDocFromCollection(db, collection, criteria = {}) {
    let result
    result = await db.collection(collection).findOne(criteria)
    console.log(result)
}


const mongoClient = mongodb.MongoClient
const dbName = 'task-app-db'
const connectionURL = 'mongodb://127.0.0.1:27017/' + dbName
const ObjectId = mongodb.ObjectId

const id = new ObjectId()
console.log(id)

mongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        console.log(error)
        return
    }

    console.log('Connected successfully')

    const db = client.db('task-app-db')
    //insert one example
    /* db.collection('users').insertOne( info = {
        name: 'Adam',
        age: 27
    }, (error, result) => {
        if(error){
            console.log(error)
            return
        }

        console.log(result.insertedId, info)
    }) */

    // insert many example
    /* writeMany(db, 'tasks', [
        {
            description: 'finish the first node js course',
            completed: false
        },
        {
            description: 'move the lawn',
            completed: false
        },
        {
            description: 'finish psychonauts',
            completed: true
        }
    ])
        .catch(console.error)
        .finally(() => client.close()); */

    /* ReadOneDocFromCollection(db, 'tasks', {_id: new ObjectId("64a1caeb924b6e40f7dc1ce4")})
        .catch(console.error)
        //.finally(() => client.close())

    ReadCollection(db, 'tasks', {completed: false})
        .catch(console.error)
        .finally(() => client.close())
 */
    /* db.collection('users').updateMany({name: 'Majka'}, { $inc: {age : 1} })
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
        .finally(() => client.close()) */

        /* db.collection('tasks').updateMany({completed: false}, { $set: {completed : true} })
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
        .finally(() => client.close()) */

        /* db.collection('users').deleteMany({name: 'Matus'})
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
        .finally(() => client.close()) */ 

        db.collection('tasks').deleteOne({description: 'finish psychonauts'})
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
        .finally(() => client.close())
})