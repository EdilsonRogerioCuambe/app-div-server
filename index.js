import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

import motoristaRoutes from './routes/motorista.routes.js'
import onibusRoutes from './routes/onibus.routes.js'

dotenv.config()

const app = express()
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ message: 'API do app Motorista' })
})

app.use('/api', motoristaRoutes)
app.use('/api', onibusRoutes)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}

app.listen(process.env.PORT, async () => {
  try {
    await connectDB()
    console.log(`Server is running on port ${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
