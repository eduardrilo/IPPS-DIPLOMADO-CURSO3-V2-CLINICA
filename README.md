# API REST — Clínica

Proyecto desarrollado para la Evaluación Integradora del Módulo 3: Backend y APIs REST del Diplomado del Instituto Profesional San Sebastián.

## Tecnologías utilizadas

- Node.js y Express 5
- MongoDB y Mongoose
- JWT para autenticación
- bcryptjs para hash de contraseñas
- Bruno para probar endpoints

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/eduardrilo/IPPS-DIPLOMADO-CURSO3-V2-CLINICA.git
cd IPPS-DIPLOMADO-CURSO3-V2-CLINICA
```

Instalar dependencias:

```bash
yarn
```

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia:

```dotenv
MONGODB_URI=TU_CADENA_DE_CONEXION_MONGODB
JWT_SECRET=TU_CLAVE_SECRETA
```

Iniciar el servidor:

```bash
yarn dev
```

La API estará disponible en:

`http://localhost:3001`

## Endpoints

### Autenticación — Públicos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/registro` | Registrar médico |
| POST | `/auth/login` | Iniciar sesión y obtener JWT |

### Médicos — Requieren JWT

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/medicos` | Listar médicos |
| GET | `/medicos?especialidad=Pediatría` | Filtrar por especialidad |
| GET | `/medicos/perfil` | Consultar perfil autenticado |
| GET | `/medicos/:id` | Consultar médico por ID |
| GET | `/medicos/:id/pacientes` | Consultar pacientes de un médico |

### Pacientes — Requieren JWT

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/pacientes` | Crear paciente |
| GET | `/pacientes` | Listar pacientes propios |
| GET | `/pacientes?prevision=Isapre` | Filtrar pacientes por previsión |
| GET | `/pacientes/:id` | Consultar paciente |
| PUT | `/pacientes/:id` | Actualizar paciente |
| DELETE | `/pacientes/:id` | Eliminar paciente |

## Seguridad

Las rutas protegidas utilizan JWT mediante el encabezado:

`Authorization: Bearer TOKEN`

Los pacientes quedan asociados automáticamente al médico autenticado.

Cualquier médico autenticado puede consultar un paciente, pero solamente su médico tratante puede modificarlo o eliminarlo.

Las contraseñas se almacenan mediante hash y no se incluyen en las respuestas de la API.

## Video de demostración

**Enlace:** Pendiente de grabación.

El video mostrará el funcionamiento de la API, las validaciones, el control de acceso y las decisiones de implementación.