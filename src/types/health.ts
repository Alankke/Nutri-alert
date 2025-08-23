export interface UserMetrics {
  id: string
  nombre: string
  edad: number
  sexo: "masculino" | "femenino"
  objetivo: "bajar" | "mantener" | "subir"
  nivelActividad: "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo"
  peso: number // kg
  altura: number // cm
  cintura?: number // cm
  cadera?: number // cm
  cuello?: number // cm
  horasSueno?: number
  temporada: "verano" | "invierno"
}

export interface HealthResults {
  imc: number
  categoriaIMC: "bajo_peso" | "normal" | "sobrepeso" | "obesidad"
  whtr?: number
  tdee: number // Total Daily Energy Expenditure
  caloriasObjetivo: number
  macros: {
    carbohidratos: number // gramos
    proteinas: number // gramos
    grasas: number // gramos
  }
  riesgo: "verde" | "amarillo" | "rojo"
  consejos: string[]
}

export interface GamificationData {
  healthScore: number // 0-100
  puntos: number
  racha: number
  badges: Badge[]
  misiones: Mission[]
}

export interface Badge {
  id: string
  nombre: string
  descripcion: string
  icono: string
  desbloqueado: boolean
  fechaDesbloqueo?: string
}

export interface Mission {
  id: string
  nombre: string
  descripcion: string
  completada: boolean
  puntosRecompensa: number
  tipo: "diaria" | "semanal" | "mensual"
}

export interface HealthProgress {
  fecha: string
  peso: number
  cintura?: number
  healthScore: number
  imc: number
}

export interface PatientData {
  id: string
  nombre: string
  edad: number
  imc: number
  whtr: number
  healthScore: number
  riesgo: "verde" | "amarillo" | "rojo"
  ultimaActualizacion: string
  ultimasMetricas: UserMetrics
  evolucion: HealthProgress[]
  consejosGenerados: string[]
}
