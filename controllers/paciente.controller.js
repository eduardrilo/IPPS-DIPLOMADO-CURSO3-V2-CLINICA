
import * as service from '../services/paciente.service.js'
import mongoose from 'mongoose'

// POST /pacientes
export const crear = async (req, res) => {
  const datos = req.body ?? {}

  // El médico se obtiene del JWT
  const medicoId = req.medico.id

  const paciente = await service.crear(
    datos,
    medicoId
  )

  return res.status(201).json(paciente)
}


export const listar = async (req, res) => {
  const medicoId = req.medico.id
  const prevision = req.query.prevision

  const pacientes = await service.listarPorMedico(
    medicoId,
    prevision
  )

  return res.status(200).json(pacientes)
}


// GET /pacientes/:id
export const buscarPorId = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: 'ID de paciente inválido'
    })
  }

  const paciente = await service.buscarPorId(id)

  if (!paciente) {
    return res.status(404).json({
      error: 'Paciente no encontrado'
    })
  }

  return res.status(200).json(paciente)
}

// PUT /pacientes/:id
export const actualizar = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: 'ID de paciente inválido'
    })
  }

  const paciente = await service.buscarPorId(id)

  if (!paciente) {
    return res.status(404).json({
      error: 'Paciente no encontrado'
    })
  }

  // Solo el médico tratante puede modificar
  if (paciente.medico.toString() !== req.medico.id) {
    return res.status(403).json({
      error: 'No tienes permiso para modificar este paciente'
    })
  }

  const actualizado = await service.actualizar(
    paciente,
    req.body ?? {}
  )

  return res.status(200).json(actualizado)
}

// DELETE /pacientes/:id
export const eliminar = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: 'ID de paciente inválido'
    })
  }

  const paciente = await service.buscarPorId(id)

  if (!paciente) {
    return res.status(404).json({
      error: 'Paciente no encontrado'
    })
  }

  // Solo el médico tratante puede eliminar
  if (paciente.medico.toString() !== req.medico.id) {
    return res.status(403).json({
      error: 'No tienes permiso para eliminar este paciente'
    })
  }

  await service.eliminar(paciente)

  return res.status(204).send()
}
