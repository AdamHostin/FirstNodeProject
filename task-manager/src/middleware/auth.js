import jwt from 'jsonwebtoken'
import * as userModel from '../models/user.js'

export const auth = async (req, res, next) => {
    console.log('auth')
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'MyFirstDB')
        const user = await userModel.User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }
}