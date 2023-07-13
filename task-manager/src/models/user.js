import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Console } from "console"
import { Task } from "./task.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if( value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid. Please provide a valid email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot include \'password\' substring')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredentials = async ({email,password} = {}) => {
    const user = await User.findOne({email})
    if(!user){
        console.log('wrong email')
        throw new Error('unable to login')
    }
    const bTestPsswd = await bcrypt.compare(password, user.password)  
    if(!bTestPsswd){
        console.log('wrong password')
        throw new Error('unable to login')   
    }
    console.log("valid password entered yay")
    return user 
}

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id.toString()}, 'MyFirstDB')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.methods.removeToken = async function (tokenToRemove) {
    this.tokens = this.tokens.filter((element) =>  element.token !== tokenToRemove)
    await this.save()
}

userSchema.methods.removeAllTokens = async function () {
    this.tokens = []
    await this.save()
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    
    delete userObject.password
    delete userObject.tokens
    
    return userObject
}


//Hash password before save
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

userSchema.pre('deleteOne', { document: true, query: false }, async function (next){
    await Task.deleteMany({owner: this._id})
    next()
})

const UserModel = mongoose.model('User', userSchema)
UserModel.createIndexes()

export const User = UserModel