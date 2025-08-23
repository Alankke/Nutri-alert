"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/ui/stepper"
import { ArrowLeft, ArrowRight, Save, Download } from "lucide-react"
import { NutritionalPlan, DailyMealPlan } from "@/types/nutrition"

const steps = ["Perfil", "Medidas", "Hábitos", "Recomendaciones de Géminis"]

export default function NuevaMetricaPage() {
  const { user, isLoaded } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [loadingPlan, setLoadingPlan] = useState(false)
  const [planGemini, setPlanGemini] = useState<NutritionalPlan | null>(null)
  const [planError, setPlanError] = useState<string | null>(null)

  // Los valores por defecto y enums coinciden con el schema.prisma
  const [formData, setFormData] = useState({
    // Paso 1: Perfil
    biologicalSex: "", // male | female
    age: "",
    goal: "", // lose | maintain | gain
    activityLevel: "", // sedentary | light | moderate | high

    // Paso 2: Medidas
    weight: "",
    height: "",
    waist: "",
    hip: "",
    neck: "",

    // Paso 3: Hábitos
    sleepHours: "",
    season: "" // summer | winter
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }

  // Cambia handleSubmit para llamar a la API
  const handleSubmit = async () => {
    if (!user?.id) {
      alert("Debes iniciar sesión para guardar tus métricas.")
      return
    }

    // Convertir datos a números
    const weight = Number(formData.weight)
    const height = Number(formData.height)
    const age = Number(formData.age)
    const waist = formData.waist ? Number(formData.waist) : null
    const hip = formData.hip ? Number(formData.hip) : null
    const neck = formData.neck ? Number(formData.neck) : null

    // Calcular BMI
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)

    // Calcular WHTR (Waist-to-Height Ratio)
    const whtr = waist ? waist / height : undefined

    // Calcular BMR (Basal Metabolic Rate) usando fórmula Mifflin-St Jeor
    let bmr
    if (formData.biologicalSex === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Multiplicadores de actividad física con tipos explícitos
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725
    }

    // Calcular TDEE (Total Daily Energy Expenditure) con validación de tipo
    const activityLevel = formData.activityLevel as keyof typeof activityMultipliers
    const multiplier = activityMultipliers[activityLevel] || 1.2 // valor por defecto
    const tdee = Math.round(bmr * multiplier)

    // Calcular calorías objetivo según el objetivo
    let targetCalories
    switch (formData.goal) {
      case "lose":
        targetCalories = Math.round(tdee - 500) // Déficit de 500 cal
        break
      case "gain":
        targetCalories = Math.round(tdee + 500) // Superávit de 500 cal
        break
      case "maintain":
      default:
        targetCalories = tdee
        break
    }

    // Calcular macronutrientes (ejemplo de distribución estándar)
    // Proteína: 25% de calorías (4 cal/g)
    // Grasas: 30% de calorías (9 cal/g)  
    // Carbohidratos: 45% de calorías (4 cal/g)
    const protein = Math.round((targetCalories * 0.25) / 4)
    const fat = Math.round((targetCalories * 0.30) / 9)
    const carbs = Math.round((targetCalories * 0.45) / 4)

    // Calcular nivel de riesgo basado en BMI y WHTR
    let riskLevel: "low" | "medium" | "high" = "low"
    if (bmi >= 30 || (whtr && whtr >= 0.6)) {
      riskLevel = "high"
    } else if (bmi >= 25 || (whtr && whtr >= 0.5)) {
      riskLevel = "medium"
    }

    // Calcular puntuación de salud (escala 0-100)
    let healthScore = 100
    
    // Penalizar por BMI fuera de rango normal (18.5-24.9)
    if (bmi < 18.5) {
      healthScore -= 20
    } else if (bmi >= 25 && bmi < 30) {
      healthScore -= 15
    } else if (bmi >= 30) {
      healthScore -= 30
    }
    
    // Penalizar por WHTR alto
    if (whtr && whtr >= 0.6) {
      healthScore -= 20
    } else if (whtr && whtr >= 0.5) {
      healthScore -= 10
    }
    
    // Penalizar por pocas horas de sueño
    const sleepHours = formData.sleepHours ? Number(formData.sleepHours) : 7
    if (sleepHours < 6) {
      healthScore -= 15
    } else if (sleepHours < 7) {
      healthScore -= 5
    }
    
    // Asegurar que el score esté entre 0-100
    healthScore = Math.max(0, Math.min(100, healthScore))

    // Prepara el payload con los valores calculados
    const payload = {
      userId: user.id,
      biologicalSex: formData.biologicalSex as "male" | "female",
      age: age,
      goal: formData.goal as "lose" | "maintain" | "gain",
      activityLevel: formData.activityLevel as "sedentary" | "light" | "moderate" | "high",
      weight: weight,
      height: height,
      waist: waist || undefined,
      hip: hip || undefined,
      neck: neck || undefined,
      sleepHours: sleepHours,
      season: formData.season as "summer" | "winter",
      bmi: Math.round(bmi * 10) / 10, // Redondear a 1 decimal
      whtr: whtr ? Math.round(whtr * 100) / 100 : undefined, // Redondear a 2 decimales
      tdee: tdee,
      targetCalories: targetCalories,
      carbs: carbs,
      protein: protein,
      fat: fat,
      riskLevel: riskLevel,
      healthScore: healthScore,
    }

    try {
      const res = await fetch("/api/health-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || "Error al guardar las métricas")
        return
      }

      alert("¡Métricas guardadas exitosamente!")
    } catch {
      alert("Error al guardar las métricas")
    }
  }

  // Llama a Gemini automáticamente al llegar al paso 4
  useEffect(() => {
    if (currentStep === 3 && !planGemini && !loadingPlan && !planError && isLoaded && user?.id) {
      fetchGeminiPlan()
    }
    // eslint-disable-next-line
  }, [currentStep, isLoaded, user])

  // ===== PASO 1: Perfil =====
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="biologicalSex">Sexo *</Label>
          <select
            id="biologicalSex"
            value={formData.biologicalSex}
            onChange={(e) => handleInputChange("biologicalSex", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona tu sexo</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Edad (años) *</Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            placeholder="Ej: 30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Objetivo *</Label>
        <select
          id="goal"
          value={formData.goal}
          onChange={(e) => handleInputChange("goal", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona tu objetivo</option>
          <option value="lose">Bajar de peso</option>
          <option value="maintain">Mantener peso</option>
          <option value="gain">Subir de peso</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activityLevel">Nivel de Actividad Física *</Label>
        <select
          id="activityLevel"
          value={formData.activityLevel}
          onChange={(e) => handleInputChange("activityLevel", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona tu nivel</option>
          <option value="sedentary">Sedentario (poco o nada de ejercicio)</option>
          <option value="light">Ligero (1-3 días/semana)</option>
          <option value="moderate">Moderado (3-5 días/semana)</option>
          <option value="high">Activo (6-7 días/semana o más)</option>
        </select>
      </div>
    </div>
  )

  // ===== PASO 2: Medidas =====
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg) *</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            min="20"
            max="300"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            placeholder="Ej: 70.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm) *</Label>
          <Input
            id="height"
            type="number"
            min="100"
            max="250"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            placeholder="Ej: 170"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="waist">Cintura (cm)</Label>
          <Input
            id="waist"
            type="number"
            min="40"
            max="200"
            value={formData.waist}
            onChange={(e) => handleInputChange("waist", e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hip">Cadera (cm)</Label>
          <Input
            id="hip"
            type="number"
            min="40"
            max="200"
            value={formData.hip}
            onChange={(e) => handleInputChange("hip", e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neck">Cuello (cm)</Label>
          <Input
            id="neck"
            type="number"
            min="20"
            max="100"
            value={formData.neck}
            onChange={(e) => handleInputChange("neck", e.target.value)}
            placeholder="Opcional"
          />
        </div>
      </div>
    </div>
  )

  // ===== PASO 3: Hábitos =====
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="sleepHours">Horas de Sueño por Noche</Label>
        <Input
          id="sleepHours"
          type="number"
          min="3"
          max="12"
          step="0.5"
          value={formData.sleepHours}
          onChange={(e) => handleInputChange("sleepHours", e.target.value)}
          placeholder="Ej: 7.5 (opcional)"
        />
        <p className="text-sm text-gray-500">Recomendado: 7-9 horas</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="season">Temporada *</Label>
        <select
          id="season"
          value={formData.season}
          onChange={(e) => handleInputChange("season", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona la temporada</option>
          <option value="summer">Verano</option>
          <option value="winter">Invierno</option>
        </select>
      </div>
    </div>
  )

  // ===== PASO 4: Recomendaciones de Géminis =====

  const fetchGeminiPlan = async () => {
    if (!user?.id) {
      setPlanError("No se pudo obtener el usuario. Inicia sesión nuevamente.")
      return
    }
    setLoadingPlan(true)
    setPlanError(null)
    setPlanGemini(null)
    
    try {
      // Calcular las métricas primero (igual que en handleSubmit)
      const weight = Number(formData.weight)
      const height = Number(formData.height)
      const age = Number(formData.age)

      // Calcular BMR usando fórmula Mifflin-St Jeor
      let bmr
      if (formData.biologicalSex === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
      }

      // Multiplicadores de actividad física
      const activityMultipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        high: 1.725
      }

      // Calcular TDEE
      const activityLevel = formData.activityLevel as keyof typeof activityMultipliers
      const multiplier = activityMultipliers[activityLevel] || 1.2
      const tdee = Math.round(bmr * multiplier)

      // Calcular calorías objetivo según el objetivo
      let targetCalories
      switch (formData.goal) {
        case "lose":
          targetCalories = Math.round(tdee - 500)
          break
        case "gain":
          targetCalories = Math.round(tdee + 500)
          break
        case "maintain":
        default:
          targetCalories = tdee
          break
      }

      // Preparar el payload con las calorías calculadas
      const payload = {
        userId: user.id,
        profile: {
          biologicalSex: formData.biologicalSex,
          age: Number(formData.age),
          goal: formData.goal,
          activityLevel: formData.activityLevel,
        },
        measurements: {
          weight: weight,
          height: height,
          waist: formData.waist ? Number(formData.waist) : undefined,
          hip: formData.hip ? Number(formData.hip) : undefined,
          neck: formData.neck ? Number(formData.neck) : undefined,
        },
        lifestyle: {
          sleepHours: formData.sleepHours ? Number(formData.sleepHours) : undefined,
          season: formData.season,
        },
        targetCalories: targetCalories, // Usar calorías calculadas, no hardcodeadas
      }

      const res = await fetch("/api/nutrition-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Error al generar el plan")
      }

      const data = await res.json()
      setPlanGemini(data.data) // Usar data.data ya que la API devuelve { success, message, data }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setPlanError(errorMessage)
    } finally {
      setLoadingPlan(false)
    }
  }

  const renderStep4 = () => {
    if (loadingPlan) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-lg">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-blue-700 font-medium">Generando plan personalizado con Gemini...</span>
          </div>
        </div>
      )
    }
    
    if (planError) {
      return (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 font-medium mb-2">Error al generar el plan</div>
            <p className="text-red-700">{planError}</p>
          </div>
        </div>
      )
    }
    
    if (!planGemini) {
      return (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-6">
            <span className="text-gray-600">Preparando tu plan nutricional personalizado...</span>
          </div>
        </div>
      )
    }

    // Función para formatear el objetivo
    const formatGoal = (goal: string) => {
      const goalMap = {
        lose: "Pérdida de peso",
        maintain: "Mantener peso",
        gain: "Ganancia de peso"
      }
      return goalMap[goal as keyof typeof goalMap] || goal
    }

    // Función para renderizar un meal plan de forma estructurada
    const renderMealPlan = (meal: DailyMealPlan, index: number) => {
      if (typeof meal === "string") {
        return (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700">{meal}</p>
          </div>
        )
      }
      
      if (typeof meal === "object" && meal !== null) {
        return (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            {Object.entries(meal).map(([key, value], idx) => (
              <div key={idx} className="mb-2 last:mb-0">
                <span className="font-semibold text-gray-800 capitalize">{key}:</span>
                <span className="ml-2 text-gray-700">{String(value)}</span>
              </div>
            ))}
          </div>
        )
      }
      
      return null
    }

    return (
      <div className="space-y-8">
        {/* Header del plan */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Tu Plan Nutricional Personalizado
          </h3>
          <p className="text-gray-600 mb-4">
            Generado específicamente para ti con inteligencia artificial
          </p>
          <div className="flex justify-center gap-8">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="text-sm text-gray-500">Objetivo</div>
              <div className="font-semibold text-gray-900">{formatGoal(planGemini.goal)}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="text-sm text-gray-500">Calorías diarias</div>
              <div className="font-semibold text-gray-900">{planGemini.targetCalories} cal</div>
            </div>
          </div>
        </div>

        {/* Plan de comidas */}
        {planGemini.dailyMealPlans && planGemini.dailyMealPlans.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Plan de Alimentación
            </h4>
            <div className="grid gap-4">
              {planGemini.dailyMealPlans.map((meal, index) => renderMealPlan(meal, index))}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Recomendaciones Generales */}
          {planGemini.recommendations?.general && planGemini.recommendations.general.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Consejos Generales
              </h4>
              <ul className="space-y-3">
                {planGemini.recommendations.general.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recomendaciones Específicas */}
          {planGemini.recommendations?.specific && planGemini.recommendations.specific.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Recomendaciones Personalizadas
              </h4>
              <ul className="space-y-3">
                {planGemini.recommendations.specific.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recomendaciones de Temporada */}
          {planGemini.recommendations?.seasonal && planGemini.recommendations.seasonal.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Consejos Estacionales
              </h4>
              <ul className="space-y-3">
                {planGemini.recommendations.seasonal.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botón de descarga mejorado */}
        <div className="text-center pt-6">
          <Button
            onClick={() => {
              const content =
                `=== PLAN NUTRICIONAL PERSONALIZADO ===\n\n` +
                `📋 RESUMEN\n` +
                `Objetivo: ${formatGoal(planGemini.goal)}\n` +
                `Calorías objetivo: ${planGemini.targetCalories} cal/día\n\n` +
                `🍽️ PLAN DE ALIMENTACIÓN\n` +
                `${planGemini.dailyMealPlans?.map((meal, i) => 
                  `${i + 1}. ${typeof meal === 'string' ? meal : JSON.stringify(meal, null, 2)}`
                ).join('\n') || 'No disponible'}\n\n` +
                `💡 RECOMENDACIONES GENERALES\n` +
                `${(planGemini.recommendations?.general || []).map((r, i) => `• ${r}`).join('\n')}\n\n` +
                `🎯 RECOMENDACIONES PERSONALIZADAS\n` +
                `${(planGemini.recommendations?.specific || []).map((r, i) => `• ${r}`).join('\n')}\n\n` +
                `🌤️ CONSEJOS ESTACIONALES\n` +
                `${(planGemini.recommendations?.seasonal || []).map((r, i) => `• ${r}`).join('\n')}\n\n` +
                `Generado el: ${new Date().toLocaleDateString('es-ES')}`
              
              const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `plan-nutricional-${new Date().toISOString().split('T')[0]}.txt`
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Download className="w-5 h-5" />
            Descargar Plan Completo
          </Button>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep1()
      case 1: return renderStep2()
      case 2: return renderStep3()
      case 3: return renderStep4()
      default: return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return Boolean(
          formData.biologicalSex &&
          formData.age &&
          formData.goal &&
          formData.activityLevel
        )
      case 1:
        return Boolean(formData.weight && formData.height)
      case 2:
        return Boolean(formData.season)
      case 3:
        return true
      default:
        return false
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-gray-600">Cargando usuario...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-red-600">Debes iniciar sesión para registrar tus métricas.</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Registra tus Métricas
        </h1>
        <p className="text-gray-600">
          Completa la información para obtener un análisis personalizado de tu salud
        </p>
      </div>

      {/* Stepper */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Progreso del Formulario</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={currentStep} />
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Paso {currentStep + 1}: {steps[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>

        <div className="flex space-x-3">
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Métricas</span>
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-500">
        Paso {currentStep + 1} de {steps.length}
      </div>
    </div>
  )
}