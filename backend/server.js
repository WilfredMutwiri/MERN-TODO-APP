//require express
const express =require('express')
//require dotenv
require ('dotenv').config()
//require mongoose
const mongoose=require('mongoose')
//create app
const app=express()
const cors=require('cors')
//require task routes
const taskRoutes=require('./Routes/taskRoutes')
const userRoutes=require('./Routes/user')
//middleware
app.use(express.json())
// app.use(cors())
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
//route
app.use('api/task',taskRoutes)
app.use('api/user',userRoutes)
//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(
        //listen to requests
        app.listen(process.env.PORT,()=>{
        console.log('Connected to db & Listening on port',process.env.PORT)
    })
    )
    .catch((error)=>{
        console.log(error);
    })
