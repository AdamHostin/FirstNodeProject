import express from "express";
import { Task } from "../models/task.js";


export const router = new express.Router()

router.post('/tasks', async (req, res) =>{
    const newUser = Task(req.body)
    try{
        newUser = await newUser.save()
        res.status(201).send(newUser)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const task = await Task.find({})
        res.status(200).send(task)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', async (req,res) =>{
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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