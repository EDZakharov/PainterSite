require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const PORT = process.env.SERVER_PORT || 5000
const DB_URL = process.env.DB_URL
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () => {
    try{
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`)
            console.log('MongoDB connected!')
        })

    } catch (e) {
        console.log(e)
    }

}

start()