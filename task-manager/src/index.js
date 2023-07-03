import express  from "express";
import chalk from "chalk";
import * as taskMongoose from './db/mongoose.js'
import { User } from "./models/user.js";
import { Task } from "./models/task.js";

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) =>{
    const newUser = User(req.body)
    newUser.save()
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.get('/users', (req, res) => {
    User.find({})
        .then((result => {
            res.status(200).send(result)
        }))
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.get('/users/:id', (req,res) =>{
    const id = req.params.id
    console.log(id.toString().length)
    if(id.toString().length != 24){
        return res.status(400).send()
    }
    User.findById(id)
        .then((result => {
            if(!result){
                res.status(404).send()
                return
            }
            res.status(200).send(result)
        }))
        .catch((e) => {
            res.status(500).send(e)
        })
})

app.post('/tasks', (req, res) =>{
    const newUser = Task(req.body)
    newUser.save()
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then((result => {
            res.status(200).send(result)
        }))
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.get('/tasks/:id', (req,res) =>{
    const id = req.params.id
    if(id.toString().length != 24){
        return res.status(400).send()
    }
    Task.findById(id)
        .then((result => {
            if(!result){
                res.status(404).send()
                return
            }
            res.status(200).send(result)
        }))
        .catch((e) => {
            res.status(500).send(e)
        })
})

app.listen(port, () =>{
    console.log(chalk.green('Server is up on port ' + port))
})