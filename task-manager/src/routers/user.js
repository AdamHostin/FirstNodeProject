import express from "express";
import { User } from "../models/user.js";
import * as utils from '../utils/utils.js'

/* const hashPsswd = async (password) => {
    return bcrypt.hash(password,8)
}

const isMatchingPsswd = async (hash, password) => {
    return bcrypt.compare(password, hash)
} */

export const router = new express.Router()

router.post('/users', async (req, res) =>{
    const newUser = User(req.body)
    try {
        await newUser.save()
        const token = await newUser.generateToken()
        res.status(201).send({newUser,  token})
    } catch(e) {
        res.status(400).send({error: 'unable to create user'})
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }   
})

router.get('/users/:id', async (req,res) =>{
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

router.patch('/users/:id', async (req, res) => {
    if(!utils.IsUpdateAllowed(req.body, ['name', 'email', 'password', 'age'])){
        res.status(400).send({error: 'invalid key'})
        return
    }
    try{
        const result = await User.findById(req.params.id)
        Object.keys(req.body).forEach(element => result[element] = req.body[element]);
        await result.save()
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

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body)
        const token = await user.generateToken()
        res.send({message : 'login successful', user, token})
    } catch (e){
        console.log(e)
        res.status(400).send({ error: 'Unable to login'})
    }
})

router.delete('/users/:id', async (req, res) => {
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
