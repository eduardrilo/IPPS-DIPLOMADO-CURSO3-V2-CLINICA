
import { Paciente } from '../models/paciente.model.js'

// Crear paciente asociado al médico autenticado
export const crear = (datos, medicoId) => {
  return Paciente.create({
    nombre: datos.nombre,
    rut: datos.rut,
    fechaNacimiento: datos.fechaNacimiento,
    prevision: datos.prevision,
    telefono: datos.telefono,
    email: datos.email,
    medico: medicoId
  })
}


export const listarPorMedico = (medicoId, prevision) => {
  const filtro = { medico: medicoId }

  if (prevision) {
    filtro.prevision = prevision
  }

  return Paciente.find(filtro)
}


export const buscarPorId = (id) => {
  return Paciente.findById(id)
}

// Actualizar solo los campos permitidos
export const actualizar = async (paciente, datos) => {
  const camposPermitidos = [
    'nombre',
    'rut',
    'fechaNacimiento',
    'prevision',
    'telefono',
    'email'
  ]

  for (const campo of camposPermitidos) {
    if (Object.hasOwn(datos, campo)) {
      paciente[campo] = datos[campo]
    }
  }

  return paciente.save()
}

// Eliminar paciente
export const eliminar = (paciente) => {
  return paciente.deleteOne()
}
