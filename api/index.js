import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './controllers/auth.controller.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(
    ()=>{console.log('DB Connected')
})
.catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json())

app.listen(3000, ()=>{
    console.log("Server is Running")
})


app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)