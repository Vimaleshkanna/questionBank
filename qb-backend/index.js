const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const resourceRoutes = require('./routes/resourceRoutes')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/resources', resourceRoutes)

mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
    console.log('mongodb connected');
    app.listen(process.env.PORT, ()=>{
        console.log('app is running on port ', process.env.PORT)
    })
})
