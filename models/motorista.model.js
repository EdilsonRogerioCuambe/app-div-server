import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const MotoristaSchema = new Schema({
  id: {
    type: String,
    default: uuidv4(),
    unique: true,
  },
  nome: String,
  senha: String,
  usuario: String,
})

export default mongoose.model('Motorista', MotoristaSchema)
