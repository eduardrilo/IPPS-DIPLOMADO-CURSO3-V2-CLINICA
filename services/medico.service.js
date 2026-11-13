
import { Medico } from '../models/medico.model.js'
import { Paciente } from '../models/paciente.model.js'

// Listar médicos, opcionalmente por especialidad
export const listar = (especialidad) => {
  const filtro = especialidad
    ? { especialidad: especialidad.trim() }
    : {}

  return Medico.find(filtro).select('-password')
}

// Buscar médico por ID
export const buscarPorId = (id) => {
  return Medico.findById(id).select('-password')
}

// Obtener los pacientes asignados a un médico
export const buscarPacientes = (medicoId) => {
  return Paciente.find({ medico: medicoId })
}
