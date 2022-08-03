import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from "cors"
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import submitRoutes from './routes/submitRoutes.js'
import testRoutes from './routes/testRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import meetingRoutes from './routes/meetingRoutes.js'
import groupworkRoutes from './routes/groupworkRoutes.js'
import timetableRoutes from './routes/timetableRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/submit', submitRoutes)
app.use('/api/todo', todoRoutes)
app.use('/api/test', testRoutes)
app.use('/api/meeting', meetingRoutes)
app.use('/api/grwork', groupworkRoutes)
app.use('/api/timetable', timetableRoutes)
app.use('/api/user', userRoutes)





if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
