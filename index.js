import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

// importing router
import postRouter from './routes/posts.js'

const app = express()


app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

// posts routers
app.use('/posts',postRouter)
app.get('/',(req,res)=>{res.send("hello from api of journey!")})

// const CONNECTION_URL = "mongodb+srv://memories:328564sp@contactkreeper.k2f.mongodb.net/<dbname>?retryWrites=true"
dotenv.config() // require only if u r using "dotenv" file

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then((response)=>app.listen(PORT,()=>console.log(`Server is running on ${PORT}`)))
.catch((error)=>console.log(error))

// mongoose.set('useFindAndModify',false)