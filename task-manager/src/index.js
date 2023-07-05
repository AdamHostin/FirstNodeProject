import express  from "express";
import chalk from "chalk";
import * as taskMongoose from './db/mongoose.js'
import { User } from "./models/user.js";
import { Task } from "./models/task.js";


function IsUpdateAllowed (update, allowedKeys) {
    const updateKeys = Object.keys(update)
    return updateKeys.every((key) => allowedKeys.includes(key))
}


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) =>{
    const newUser = User(req.body)
    try {
        await newUser.save()
        res.status(201).send(newUser)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }   
})

app.get('/users/:id', async (req,res) =>{
    const id = req.params.id
        if(id.toString().length != 24){
            return res.status(400).send()
        }
    try {
        const result = await User.findById(id)
        if(!result){
            res.status(404).send()
            return
        }
        res.status(200).send(result)
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    if(!IsUpdateAllowed(req.body, ['name', 'email', 'password', 'age'])){
        res.status(400).send({error: 'invalid key'})
        return
    }
    try{
        const result = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!result){
            res.status(404).send({error: 'user not found'})
            return
        }
        res.status(200).send(result)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try{
        const result = await User.findByIdAndDelete(req.params.id)
        if (!result){
            res.status(404).send({error: 'user not found'})
            return
        }
        res.status(200).send({ message: 'Deletion successful'})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) =>{
    const newUser = Task(req.body)
    try{
        newUser = await newUser.save()
        res.status(201).send(newUser)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

app.get('/tasks/:id', async (req,res) =>{
    const id = req.params.id
    if(id.toString().length != 24){
        return res.status(400).send()
    }
    try{
        const task = await Task.findById(id)
        if(!task){
            res.status(404).send()
            return
        }
        res.status(200).send(task)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    if(!IsUpdateAllowed(req.body, ['description', 'completed'])){
        res.status(400).send({error: 'invalid key'})
        return
    }
    try{
        const result = await Task.findByIdAndUpdate(req.params.id, req.body , {new: true, runValidators: true})
        if (!result){
            res.status(404).send({error: 'task not found'})
            return
        }
        res.status(200).send(result)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try{
        const result = await Tas.findByIdAndDelete(req.params.id)
        if (!result){
            res.status(404).send({error: 'task not found'})
            return
        }
        res.status(200).send({ message: 'Deletion successful'})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.listen(port, () =>{
    console.log(chalk.green('Server is up on port ' + port))
})