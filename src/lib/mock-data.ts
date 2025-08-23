import { PatientData, UserMetrics, HealthProgress, GamificationData, Badge, Mission } from "@/types/health"

// Datos mock para pacientes
export const mockPatients: PatientData[] = [
  {
    id: "1",
    nombre: "María González",
    edad: 28,
    imc: 22.1,
    whtr: 0.42,
    healthScore: 85,
    riesgo: "verde",
    ultimaActualizacion: "Hace 2 días",
    ultimasMetricas: {
      id: "1",
      nombre: "María González",
      edad: 28,
      sexo: "femenino",
      objetivo: "mantener",
      nivelActividad: "moderado",
      peso: 58,
      altura: 162,
      cintura: 68,
      cadera: 92,
      cuello: 32,
      horasSueno: 8,
      temporada: "verano"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 59, cintura: 70, healthScore: 80, imc: 22.5 },
      { fecha: "2024-01-15", peso: 58.5, cintura: 69, healthScore: 82, imc: 22.3 },
      { fecha: "2024-02-01", peso: 58, cintura: 68, healthScore: 85, imc: 22.1 }
    ],
    consejosGenerados: [
      "Mantén tu rutina de ejercicio regular",
      "Continúa con tu dieta balanceada",
      "Excelente descanso de 8 horas"
    ]
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    edad: 35,
    imc: 23.8,
    whtr: 0.45,
    healthScore: 78,
    riesgo: "verde",
    ultimaActualizacion: "Hace 1 día",
    ultimasMetricas: {
      id: "2",
      nombre: "Carlos Ruiz",
      edad: 35,
      sexo: "masculino",
      objetivo: "mantener",
      nivelActividad: "activo",
      peso: 75,
      altura: 177,
      cintura: 80,
      cadera: 98,
      cuello: 38,
      horasSueno: 7,
      temporada: "verano"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 76, cintura: 82, healthScore: 75, imc: 24.2 },
      { fecha: "2024-01-15", peso: 75.5, cintura: 81, healthScore: 76, imc: 24.1 },
      { fecha: "2024-02-01", peso: 75, cintura: 80, healthScore: 78, imc: 23.8 }
    ],
    consejosGenerados: [
      "Mantén tu actividad física regular",
      "Considera aumentar las horas de sueño a 8",
      "Buen balance en tu alimentación"
    ]
  },
  {
    id: "3",
    nombre: "Ana Martínez",
    edad: 42,
    imc: 26.7,
    whtr: 0.52,
    healthScore: 65,
    riesgo: "amarillo",
    ultimaActualizacion: "Hace 3 días",
    ultimasMetricas: {
      id: "3",
      nombre: "Ana Martínez",
      edad: 42,
      sexo: "femenino",
      objetivo: "bajar",
      nivelActividad: "ligero",
      peso: 72,
      altura: 164,
      cintura: 85,
      cadera: 98,
      cuello: 34,
      horasSueno: 6,
      temporada: "invierno"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 74, cintura: 87, healthScore: 60, imc: 27.5 },
      { fecha: "2024-01-15", peso: 73, cintura: 86, healthScore: 62, imc: 27.1 },
      { fecha: "2024-02-01", peso: 72, cintura: 85, healthScore: 65, imc: 26.7 }
    ],
    consejosGenerados: [
      "Aumenta tu actividad física gradualmente",
      "Mejora tu calidad de sueño",
      "Reduce el consumo de carbohidratos refinados"
    ]
  },
  {
    id: "4",
    nombre: "Luis Herrera",
    edad: 38,
    imc: 27.3,
    whtr: 0.54,
    healthScore: 58,
    riesgo: "amarillo",
    ultimaActualizacion: "Hoy",
    ultimasMetricas: {
      id: "4",
      nombre: "Luis Herrera",
      edad: 38,
      sexo: "masculino",
      objetivo: "bajar",
      nivelActividad: "sedentario",
      peso: 85,
      altura: 176,
      cintura: 95,
      cadera: 102,
      cuello: 40,
      horasSueno: 5,
      temporada: "invierno"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 87, cintura: 97, healthScore: 55, imc: 28.1 },
      { fecha: "2024-01-15", peso: 86, cintura: 96, healthScore: 56, imc: 27.8 },
      { fecha: "2024-02-01", peso: 85, cintura: 95, healthScore: 58, imc: 27.3 }
    ],
    consejosGenerados: [
      "Inicia con caminatas diarias de 30 minutos",
      "Prioriza dormir 7-8 horas por noche",
      "Reduce el consumo de alimentos procesados"
    ]
  },
  {
    id: "5",
    nombre: "Carmen Silva",
    edad: 58,
    imc: 31.2,
    whtr: 0.61,
    healthScore: 42,
    riesgo: "rojo",
    ultimaActualizacion: "Hace 5 días",
    ultimasMetricas: {
      id: "5",
      nombre: "Carmen Silva",
      edad: 58,
      sexo: "femenino",
      objetivo: "bajar",
      nivelActividad: "sedentario",
      peso: 78,
      altura: 158,
      cintura: 96,
      cadera: 105,
      cuello: 36,
      horasSueno: 4,
      temporada: "invierno"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 80, cintura: 98, healthScore: 38, imc: 32.0 },
      { fecha: "2024-01-15", peso: 79, cintura: 97, healthScore: 40, imc: 31.6 },
      { fecha: "2024-02-01", peso: 78, cintura: 96, healthScore: 42, imc: 31.2 }
    ],
    consejosGenerados: [
      "Consulta con un profesional de la salud",
      "Inicia actividad física supervisada",
      "Mejora significativamente tu descanso nocturno"
    ]
  },
  {
    id: "6",
    nombre: "Roberto Vargas",
    edad: 62,
    imc: 33.8,
    whtr: 0.65,
    healthScore: 35,
    riesgo: "rojo",
    ultimaActualizacion: "Hace 1 semana",
    ultimasMetricas: {
      id: "6",
      nombre: "Roberto Vargas",
      edad: 62,
      sexo: "masculino",
      objetivo: "bajar",
      nivelActividad: "sedentario",
      peso: 95,
      altura: 168,
      cintura: 109,
      cadera: 110,
      cuello: 42,
      horasSueno: 3,
      temporada: "invierno"
    },
    evolucion: [
      { fecha: "2024-01-01", peso: 97, cintura: 111, healthScore: 32, imc: 34.4 },
      { fecha: "2024-01-15", peso: 96, cintura: 110, healthScore: 33, imc: 34.1 },
      { fecha: "2024-02-01", peso: 95, cintura: 109, healthScore: 35, imc: 33.8 }
    ],
    consejosGenerados: [
      "Requerido seguimiento médico inmediato",
      "Implementa cambios graduales en alimentación",
      "Prioriza el descanso y manejo del estrés"
    ]
  }
]

// Datos mock para gamificación
export const mockGamificationData: GamificationData = {
  healthScore: 72,
  puntos: 1250,
  racha: 7,
  badges: [
    {
      id: "1",
      nombre: "Primer Paso",
      descripcion: "Completaste tu primera evaluación",
      icono: "🎯",
      desbloqueado: true,
      fechaDesbloqueo: "2024-01-15"
    },
    {
      id: "2",
      nombre: "Consistente",
      descripcion: "7 días seguidos registrando métricas",
      icono: "🔥",
      desbloqueado: true,
      fechaDesbloqueo: "2024-02-01"
    },
    {
      id: "3",
      nombre: "Meta Alcanzada",
      descripcion: "Lograste tu objetivo de peso",
      icono: "🏆",
      desbloqueado: false
    }
  ],
  misiones: [
    {
      id: "1",
      nombre: "Registrar métricas",
      descripcion: "Actualiza tus medidas corporales",
      completada: true,
      puntosRecompensa: 50,
      tipo: "diaria"
    },
    {
      id: "2",
      nombre: "Dormir ≥7h",
      descripcion: "Descansa al menos 7 horas esta noche",
      completada: false,
      puntosRecompensa: 30,
      tipo: "diaria"
    },
    {
      id: "3",
      nombre: "Cumplir kcal objetivo",
      descripcion: "Mantén tu consumo calórico dentro del rango",
      completada: true,
      puntosRecompensa: 40,
      tipo: "diaria"
    }
  ]
}

// Datos mock para resultados de salud
export const mockHealthResults: HealthResults = {
  imc: 27.3,
  categoriaIMC: "sobrepeso",
  whtr: 0.54,
  tdee: 2550,
  caloriasObjetivo: 2150,
  macros: {
    carbohidratos: 269,
    proteinas: 188,
    grasas: 72
  },
  riesgo: "amarillo",
  consejos: [
    "Reduce el consumo de carbohidratos refinados",
    "Aumenta tu actividad física a 150 min/semana",
    "Prioriza dormir 7-8 horas por noche"
  ]
}

// Datos mock para progreso histórico
export const mockHealthProgress: HealthProgress[] = [
  { fecha: "2024-01-01", peso: 87, cintura: 97, healthScore: 55, imc: 28.1 },
  { fecha: "2024-01-08", peso: 86.5, cintura: 96.5, healthScore: 56, imc: 27.9 },
  { fecha: "2024-01-15", peso: 86, cintura: 96, healthScore: 56, imc: 27.8 },
  { fecha: "2024-01-22", peso: 85.5, cintura: 95.5, healthScore: 57, imc: 27.6 },
  { fecha: "2024-02-01", peso: 85, cintura: 95, healthScore: 58, imc: 27.3 }
]
