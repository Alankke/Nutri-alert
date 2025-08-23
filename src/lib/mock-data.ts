import { PatientData, HealthProgress, GamificationData, HealthResults } from "@/types/nutrition"

// Datos mock para pacientes
export const mockPatients: PatientData[] = [
  {
    id: "1",
    name: "María González",
    age: 28,
    bmi: 22.1,
    whtr: 0.42,
    healthScore: 85,
    riskLevel: "low",
    lastUpdate: "Hace 2 días",
    latestMetrics: {
      id: "1",
      name: "María González",
      age: 28,
      biologicalSex: "female",
      goal: "maintain",
      activityLevel: "moderate",
      weight: 58,
      height: 162,
      waist: 68,
      hip: 92,
      neck: 32,
      sleepHours: 8,
      season: "summer"
    },
    progress: [
      { date: "2024-01-01", weight: 59, waist: 70, healthScore: 80, bmi: 22.5 },
      { date: "2024-01-15", weight: 58.5, waist: 69, healthScore: 82, bmi: 22.3 },
      { date: "2024-02-01", weight: 58, waist: 68, healthScore: 85, bmi: 22.1 }
    ],
    generatedAdvice: [
      "Mantén tu rutina de ejercicio regular",
      "Continúa con tu dieta balanceada",
      "Excelente descanso de 8 horas"
    ]
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    age: 35,
    bmi: 23.8,
    whtr: 0.45,
    healthScore: 78,
    riskLevel: "low",
    lastUpdate: "Hace 1 día",
    latestMetrics: {
      id: "2",
      name: "Carlos Ruiz",
      age: 35,
      biologicalSex: "male",
      goal: "maintain",
      activityLevel: "high",
      weight: 75,
      height: 177,
      waist: 80,
      hip: 98,
      neck: 38,
      sleepHours: 7,
      season: "summer"
    },
    progress: [
      { date: "2024-01-01", weight: 76, waist: 82, healthScore: 75, bmi: 24.2 },
      { date: "2024-01-15", weight: 75.5, waist: 81, healthScore: 76, bmi: 24.1 },
      { date: "2024-02-01", weight: 75, waist: 80, healthScore: 78, bmi: 23.8 }
    ],
    generatedAdvice: [
      "Mantén tu actividad física regular",
      "Considera aumentar las horas de sueño a 8",
      "Buen balance en tu alimentación"
    ]
  },
  {
    id: "3",
    name: "Ana Martínez",
    age: 42,
    bmi: 26.7,
    whtr: 0.52,
    healthScore: 65,
    riskLevel: "moderate",
    lastUpdate: "Hace 3 días",
    latestMetrics: {
      id: "3",
      name: "Ana Martínez",
      age: 42,
      biologicalSex: "female",
      goal: "lose",
      activityLevel: "light",
      weight: 72,
      height: 164,
      waist: 85,
      hip: 98,
      neck: 34,
      sleepHours: 6,
      season: "winter"
    },
    progress: [
      { date: "2024-01-01", weight: 74, waist: 87, healthScore: 60, bmi: 27.5 },
      { date: "2024-01-15", weight: 73, waist: 86, healthScore: 62, bmi: 27.1 },
      { date: "2024-02-01", weight: 72, waist: 85, healthScore: 65, bmi: 26.7 }
    ],
    generatedAdvice: [
      "Aumenta tu actividad física gradualmente",
      "Mejora tu calidad de sueño",
      "Reduce el consumo de carbohidratos refinados"
    ]
  },
  {
    id: "4",
    name: "Luis Herrera",
    age: 38,
    bmi: 27.3,
    whtr: 0.54,
    healthScore: 58,
    riskLevel: "moderate",
    lastUpdate: "Hoy",
    latestMetrics: {
      id: "4",
      name: "Luis Herrera",
      age: 38,
      biologicalSex: "male",
      goal: "lose",
      activityLevel: "sedentary",
      weight: 85,
      height: 176,
      waist: 95,
      hip: 102,
      neck: 40,
      sleepHours: 5,
      season: "winter"
    },
    progress: [
      { date: "2024-01-01", weight: 87, waist: 97, healthScore: 55, bmi: 28.1 },
      { date: "2024-01-15", weight: 86, waist: 96, healthScore: 56, bmi: 27.8 },
      { date: "2024-02-01", weight: 85, waist: 95, healthScore: 58, bmi: 27.3 }
    ],
    generatedAdvice: [
      "Inicia con caminatas diarias de 30 minutos",
      "Prioriza dormir 7-8 horas por noche",
      "Reduce el consumo de alimentos procesados"
    ]
  },
  {
    id: "5",
    name: "Carmen Silva",
    age: 58,
    bmi: 31.2,
    whtr: 0.61,
    healthScore: 42,
    riskLevel: "high",
    lastUpdate: "Hace 5 días",
    latestMetrics: {
      id: "5",
      name: "Carmen Silva",
      age: 58,
      biologicalSex: "female",
      goal: "lose",
      activityLevel: "sedentary",
      weight: 78,
      height: 158,
      waist: 96,
      hip: 105,
      neck: 36,
      sleepHours: 4,
      season: "winter"
    },
    progress: [
      { date: "2024-01-01", weight: 80, waist: 98, healthScore: 38, bmi: 32.0 },
      { date: "2024-01-15", weight: 79, waist: 97, healthScore: 40, bmi: 31.6 },
      { date: "2024-02-01", weight: 78, waist: 96, healthScore: 42, bmi: 31.2 }
    ],
    generatedAdvice: [
      "Consulta con un profesional de la salud",
      "Inicia actividad física supervisada",
      "Mejora significativamente tu descanso nocturno"
    ]
  },
  {
    id: "6",
    name: "Roberto Vargas",
    age: 62,
    bmi: 33.8,
    whtr: 0.65,
    healthScore: 35,
    riskLevel: "high",
    lastUpdate: "Hace 1 semana",
    latestMetrics: {
      id: "6",
      name: "Roberto Vargas",
      age: 62,
      biologicalSex: "male",
      goal: "lose",
      activityLevel: "sedentary",
      weight: 95,
      height: 168,
      waist: 109,
      hip: 110,
      neck: 42,
      sleepHours: 3,
      season: "winter"
    },
    progress: [
      { date: "2024-01-01", weight: 97, waist: 111, healthScore: 32, bmi: 34.4 },
      { date: "2024-01-15", weight: 96, waist: 110, healthScore: 33, bmi: 34.1 },
      { date: "2024-02-01", weight: 95, waist: 109, healthScore: 35, bmi: 33.8 }
    ],
    generatedAdvice: [
      "Requerido seguimiento médico inmediato",
      "Implementa cambios graduales en alimentación",
      "Prioriza el descanso y manejo del estrés"
    ]
  }
]

// Datos mock para gamificación
export const mockGamificationData: GamificationData = {
  healthScore: 72,
  points: 1250,
  streak: 7,
  badges: [
    {
      id: "1",
      name: "Primer Paso",
      description: "Completaste tu primera evaluación",
      icon: "🎯",
      unlocked: true,
      unlockDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Consistente",
      description: "7 días seguidos registrando métricas",
      icon: "🔥",
      unlocked: true,
      unlockDate: "2024-02-01"
    },
    {
      id: "3",
      name: "Meta Alcanzada",
      description: "Lograste tu objetivo de peso",
      icon: "🏆",
      unlocked: false
    }
  ],
  missions: [
    {
      id: "1",
      name: "Registrar métricas",
      description: "Actualiza tus medidas corporales",
      completed: true,
      rewardPoints: 50,
      type: "daily"
    },
    {
      id: "2",
      name: "Dormir ≥7h",
      description: "Descansa al menos 7 horas esta noche",
      completed: false,
      rewardPoints: 30,
      type: "daily"
    },
    {
      id: "3",
      name: "Cumplir kcal objetivo",
      description: "Mantén tu consumo calórico dentro del rango",
      completed: true,
      rewardPoints: 40,
      type: "daily"
    }
  ]
}

// Datos mock para resultados de salud
export const mockHealthResults: HealthResults = {
  bmi: 27.3,
  bmiCategory: "overweight",
  whtr: 0.54,
  tdee: 2550,
  targetCalories: 2150,
  macros: {
    carbs: 269,
    protein: 188,
    fat: 72
  },
  riskLevel: "moderate",
  advice: [
    "Reduce el consumo de carbohidratos refinados",
    "Aumenta tu actividad física a 150 min/semana",
    "Prioriza dormir 7-8 horas por noche"
  ]
}

// Datos mock para progreso histórico
export const mockHealthProgress: HealthProgress[] = [
  { date: "2024-01-01", weight: 87, waist: 97, healthScore: 55, bmi: 28.1 },
  { date: "2024-01-08", weight: 86.5, waist: 96.5, healthScore: 56, bmi: 27.9 },
  { date: "2024-01-15", weight: 86, waist: 96, healthScore: 56, bmi: 27.8 },
  { date: "2024-01-22", weight: 85.5, waist: 95.5, healthScore: 57, bmi: 27.6 },
  { date: "2024-02-01", weight: 85, waist: 95, healthScore: 58, bmi: 27.3 }
]
