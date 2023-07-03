import mongoose from "mongoose";
import { User }  from '../models/user.js'
import { Task }  from '../models/task.js'


const dbName = 'task-manager-api'
const connectionURL = 'mongodb://127.0.0.1:27017/' + dbName
mongoose.connect(connectionURL)


const me = new User({
    name: 'Adam',
    email: 'adam@Hostin.sk',
    password: 'blapassWordbla'
})

/* me.save()
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    }) */

const dailyTask = new Task({
    
})
