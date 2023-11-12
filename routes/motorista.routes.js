import {
  registrarMotorista,
  autenticarMotorista,
  listarMotoristaPorId,
  listarMotoristas,
} from '../controllers/motorista.controller.js'
import { Router } from 'express'

const router = Router()

router.post('/motoristas', registrarMotorista)
router.post('/motoristas/login', autenticarMotorista)
router.get('/motoristas', listarMotoristas)
router.get('/motoristas/:id', listarMotoristaPorId)

export default router
