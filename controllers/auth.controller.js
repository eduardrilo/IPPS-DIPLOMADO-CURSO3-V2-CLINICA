
import * as service from '../services/auth.service.js'

// Registro de médicos
export const registrar = async (req, res) => {
  const { nombre, especialidad, email, password } = req.body ?? {}

  if (![nombre, especialidad, email, password].every(
    valor => typeof valor === 'string' && valor.trim()
  )) {
    return res.status(400).json({
      error: 'Faltan datos obligatorios'
    })
  }

  const resultado = await service.registrar({
    nombre,
    especialidad,
    email: email.trim().toLowerCase(),
    password
  })

  return res.status(201).json(resultado)
}

// Login de médicos
export const login = async (req, res) => {
  const { email, password } = req.body ?? {}

  if (typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || !password) {
    return res.status(400).json({
      error: 'Email y contraseña son obligatorios'
    })
  }

  const resultado = await service.login(
    email.trim().toLowerCase(),
    password
  )

  if (!resultado) {
    return res.status(401).json({
      error: 'Credenciales incorrectas'
    })
  }

  return res.status(200).json(resultado)
}
