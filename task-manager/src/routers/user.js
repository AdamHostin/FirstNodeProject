import express from "express";
import { User } from "../models/user.js";
import * as utils from '../utils/utils.js'
import * as auth from '../middleware/auth.js'

/* const hashPsswd = async (password) => {
    return bcrypt.hash(password,8)
}

const isMatchingPsswd = async (hash, password) => {
    return bcrypt.compare(password, hash)
} */

export const router = new express.Router()

router.post('/users', async (req, res) =>{
    const newUser = User(req.body)
    console.log('creating user')
    try {
        await newUser.save()
        console.log('generate token')
        const token = await newUser.generateToken()
        console.log('response send')
        res.status(201).send({newUser,  token})
    } catch(e) {
        console.log('error')
        res.status(400).send({error: 'unable to create user'})
    }
})

router.post('/users/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body)
        const token = await user.generateToken()
        res.send({message : 'login successful', user, token})
    } catch (e){
        console.log(e)
        res.status(400).send({ error: 'Unable to login'})
    }
})

router.post('/users/logout', auth.auth, async (req, res) =>{
    console.log('logout started')
    try {
        await req.user.removeToken(req.token)
        res.send({message : 'logout successful', tokens: req.user.tokens})
    } catch (e){
        console.log(e)
        res.status(500).send({ error: 'Unable to logout', tokens: req.user.tokens})
    }
})

router.post('/users/logoutAll', auth.auth, async (req, res) =>{
    console.log('logout started')
    try {
        await req.user.removeAllTokens()
        res.send({message : 'logout successful', tokens: req.user.tokens})
    } catch (e){
        console.log(e)
        res.status(500).send({ error: 'Unable to logout', tokens: req.user.tokens})
    }
})

router.get('/users/me', auth.auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth.auth,async (req, res) => {
    if(!utils.IsUpdateAllowed(req.body, ['name', 'email', 'password', 'age'])){
        res.status(400).send({error: 'invalid key'})
        return
    }
    try{
        Object.keys(req.body).forEach(element => req.user[element] = req.body[element]);
        await req.user.save()
        res.status(200).send(req.user) 
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth.auth, async (req, res) => {
    try{
        await req.user.deleteOne({_id: req.user._id})
        res.status(200).send({ message: 'Deletion successful', })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
