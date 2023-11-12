import {
  registrarOnibus,
  listarOnibus,
  listarOnibusPorId,
  atualizarOnibus,
  deletarOnibus,
} from '../controllers/onibus.controller.js'

import { Router } from 'express'

const router = Router()

router.post('/onibus', registrarOnibus)
router.get('/onibus', listarOnibus)
router.get('/onibus/:id', listarOnibusPorId)
router.put('/onibus/:id', atualizarOnibus)
router.delete('/onibus/:id', deletarOnibus)

export default router
