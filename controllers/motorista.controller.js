import motoristaModel from '../models/motorista.model.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function registrarMotorista(req, res) {
  try {
    const { nome, usuario, senha } = req.body
    const hashedPassword = await bycrypt.hash(senha, 10)
    const motorista = await motoristaModel.create({
      nome,
      usuario,
      senha: hashedPassword,
    })
    res.status(201).json(motorista)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function autenticarMotorista(req, res) {
  try {
    const { usuario, senha } = req.body
    const motorista = await motoristaModel.findOne({ usuario })
    if (!motorista) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }
    const isValidPassword = await bycrypt.compare(senha, motorista.senha)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha inválida' })
    }
    const token = jwt.sign({ id: motorista._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.status(200).json({ token, motorista })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// listar motoristas
export async function listarMotoristas(req, res) {
  try {
    const motoristas = await motoristaModel.find()
    res.status(200).json(motoristas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// listar motorista por id
export async function listarMotoristaPorId(req, res) {
  try {
    const { id } = req.params
    const motorista = await motoristaModel.findById(id)
    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado' })
    }
    res.status(200).json(motorista)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
