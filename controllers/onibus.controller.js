import OnibusModel from '../models/onibus.model.js'

export async function registrarOnibus(req, res) {
  try {
    const { placa, modelo, capacidade } = req.body

    const existingOnibus = await OnibusModel.findOne({ placa })

    if (existingOnibus) {
      return res
        .status(400)
        .json({ error: 'Onibus com a mesma placa já existe' })
    }

    // If no duplicate, create a new Onibus document
    const onibus = await OnibusModel.create({
      placa,
      modelo,
      capacidade,
    })

    res.status(201).json({ onibus })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function listarOnibus(req, res) {
  try {
    const onibus = await OnibusModel.find()
    res.status(200).json(onibus)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function listarOnibusPorId(req, res) {
  try {
    const { id } = req.params
    const onibus = await OnibusModel.findById(id)
    if (!onibus) {
      return res.status(404).json({ error: 'Onibus não encontrado' })
    }
    res.status(200).json(onibus)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function atualizarOnibus(req, res) {
  try {
    const { id } = req.params
    const { placa, modelo, capacidade } = req.body
    const onibus = await OnibusModel.findByIdAndUpdate(
      id,
      { placa, modelo, capacidade },
      { new: true },
    )
    if (!onibus) {
      return res.status(404).json({ error: 'Onibus não encontrado' })
    }
    res.status(200).json(onibus)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function deletarOnibus(req, res) {
  try {
    const { id } = req.params
    const onibus = await OnibusModel.findByIdAndDelete(id)
    if (!onibus) {
      return res.status(404).json({ error: 'Onibus não encontrado' })
    }
    res.status(200).json(onibus)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
