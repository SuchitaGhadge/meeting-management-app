const express = require('express')
const dotenv =  require('dotenv')
const connectdb = require('./config/db')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const req = require('express/lib/request')
dotenv.config()
connectdb()
app.use(express.json())

app.get('/', (req,res) => {
    res.send("app is running")
})

app.use((req,res,next)=>{
    res.setHeader('Acces-Control-Allow-Origin','*');
    res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use(cors())

app.get("/api/notes", (req,res) => {
    console.log("hi")
    res.send("hi its working")
})

app.post("/api/addnote", (req,res) => {
    console.log("post",req.body)
    res.send("data is post")
})

app.use("/api/users", userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server is running at : ${PORT}`))