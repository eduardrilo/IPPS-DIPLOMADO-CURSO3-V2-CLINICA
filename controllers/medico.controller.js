
import mongoose from 'mongoose'
import * as service from '../services/medico.service.js'

// GET /medicos
export const listar = async (req, res) => {
  const medicos = await service.listar(
    req.query.especialidad
  )

  return res.status(200).json(medicos)
}

// GET /medicos/perfil
export const perfil = async (req, res) => {
  const medico = await service.buscarPorId(req.medico.id)

  if (!medico) {
    return res.status(404).json({
      error: 'Médico no encontrado'
    })
  }

  return res.status(200).json(medico)
}

// GET /medicos/:id
export const buscarPorId = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: 'ID de médico inválido'
    })
  }

  const medico = await service.buscarPorId(id)

  if (!medico) {
    return res.status(404).json({
      error: 'Médico no encontrado'
    })
  }

  return res.status(200).json(medico)
}

// GET /medicos/:id/pacientes
export const pacientes = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: 'ID de médico inválido'
    })
  }

  const medico = await service.buscarPorId(id)

  if (!medico) {
    return res.status(404).json({
      error: 'Médico no encontrado'
    })
  }

  const pacientes = await service.buscarPacientes(id)

  return res.status(200).json(pacientes)
}
