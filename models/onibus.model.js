import mongoose, { Schema } from 'mongoose'

const OnibusSchema = new Schema({
  id: {
    type: String,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: String,
  capacidade: Number,
})

export default mongoose.model('Onibus', OnibusSchema)
