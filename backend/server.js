const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))