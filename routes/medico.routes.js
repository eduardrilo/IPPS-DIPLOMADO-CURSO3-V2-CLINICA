
import { Router } from 'express'
import { proteger } from '../middlewares/proteger.js'
import * as controller from '../controllers/medico.controller.js'

export const medicoRoutes = Router()

// Todas las rutas requieren JWT
medicoRoutes.use(proteger)

medicoRoutes.get('/', controller.listar)
medicoRoutes.get('/perfil', controller.perfil)
medicoRoutes.get('/:id/pacientes', controller.pacientes)
medicoRoutes.get('/:id', controller.buscarPorId)
