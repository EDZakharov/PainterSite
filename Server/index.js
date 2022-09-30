require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/error-middleware')
const mongoose = require('mongoose')

const PORT = process.env.SERVER_PORT || 5000
const MONGODB_KEY = process.env.MONGODB_KEY
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try{
        await mongoose.connect(MONGODB_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },() => console.log('MongoDB connected!'))
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }

}

start()