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

  const [formData, setFormData] = useState({
    // Paso 1: Perfil
    sexo: "",
    edad: "",
    objetivo: "",
    nivelActividad: "",

    // Paso 2: Medidas
    peso: "",
    altura: "",
    cintura: "",
    cadera: "",
    cuello: "",

    // Paso 3: Hábitos
    horasSueno: "",
    temporada: ""
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

    // Prepara el payload plano según espera tu endpoint y Prisma
    const payload = {
      userId: user.id,
      biologicalSex: formData.sexo === "masculino" ? "male" : "female",
      age: Number(formData.edad),
      goal:
        formData.objetivo === "bajar"
          ? "lose"
          : formData.objetivo === "mantener"
          ? "maintain"
          : "gain",
      activityLevel:
        formData.nivelActividad === "sedentario"
          ? "sedentary"
          : formData.nivelActividad === "ligero"
          ? "light"
          : formData.nivelActividad === "moderado"
          ? "moderate"
          : formData.nivelActividad === "activo"
          ? "high"
          : "high",
      weight: Number(formData.peso),
      height: Number(formData.altura),
      waist: formData.cintura ? Number(formData.cintura) : undefined,
      hip: formData.cadera ? Number(formData.cadera) : undefined,
      neck: formData.cuello ? Number(formData.cuello) : undefined,
      sleepHours: formData.horasSueno ? Number(formData.horasSueno) : 7,
      season: formData.temporada === "verano" ? "summer" : "winter",
      // Los siguientes valores deberías calcularlos antes de guardar,
      // aquí se ponen como ejemplo, deberías reemplazarlos por los reales:
      bmi: 0, // Calcula el BMI real aquí
      whtr: undefined, // Calcula si tienes cintura y altura
      tdee: 0, // Calcula el TDEE real aquí
      targetCalories: 0, // Calcula el objetivo real aquí
      carbs: 0, // Calcula los macros reales aquí
      protein: 0,
      fat: 0,
      riskLevel: "low", // Calcula el riesgo real aquí
      healthScore: 0, // Calcula el score real aquí
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
    } catch (err) {
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
          <Label htmlFor="sexo">Sexo *</Label>
          <select
            id="sexo"
            value={formData.sexo}
            onChange={(e) => handleInputChange("sexo", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona tu sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edad">Edad (años) *</Label>
          <Input
            id="edad"
            type="number"
            min="1"
            max="120"
            value={formData.edad}
            onChange={(e) => handleInputChange("edad", e.target.value)}
            placeholder="Ej: 30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objetivo">Objetivo *</Label>
        <select
          id="objetivo"
          value={formData.objetivo}
          onChange={(e) => handleInputChange("objetivo", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona tu objetivo</option>
          <option value="bajar">Bajar de peso</option>
          <option value="mantener">Mantener peso</option>
          <option value="subir">Subir de peso</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nivelActividad">Nivel de Actividad Física *</Label>
        <select
          id="nivelActividad"
          value={formData.nivelActividad}
          onChange={(e) => handleInputChange("nivelActividad", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona tu nivel</option>
          <option value="sedentario">Sedentario (poco o nada de ejercicio)</option>
          <option value="ligero">Ligero (1-3 días/semana)</option>
          <option value="moderado">Moderado (3-5 días/semana)</option>
          <option value="activo">Activo (6-7 días/semana)</option>
          <option value="muy_activo">Muy activo (ejercicio intenso diario)</option>
        </select>
      </div>
    </div>
  )

  // ===== PASO 2: Medidas =====
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg) *</Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            min="20"
            max="300"
            value={formData.peso}
            onChange={(e) => handleInputChange("peso", e.target.value)}
            placeholder="Ej: 70.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="altura">Altura (cm) *</Label>
          <Input
            id="altura"
            type="number"
            min="100"
            max="250"
            value={formData.altura}
            onChange={(e) => handleInputChange("altura", e.target.value)}
            placeholder="Ej: 170"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cintura">Cintura (cm)</Label>
          <Input
            id="cintura"
            type="number"
            min="40"
            max="200"
            value={formData.cintura}
            onChange={(e) => handleInputChange("cintura", e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cadera">Cadera (cm)</Label>
          <Input
            id="cadera"
            type="number"
            min="40"
            max="200"
            value={formData.cadera}
            onChange={(e) => handleInputChange("cadera", e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuello">Cuello (cm)</Label>
          <Input
            id="cuello"
            type="number"
            min="20"
            max="100"
            value={formData.cuello}
            onChange={(e) => handleInputChange("cuello", e.target.value)}
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
        <Label htmlFor="horasSueno">Horas de Sueño por Noche</Label>
        <Input
          id="horasSueno"
          type="number"
          min="3"
          max="12"
          step="0.5"
          value={formData.horasSueno}
          onChange={(e) => handleInputChange("horasSueno", e.target.value)}
          placeholder="Ej: 7.5 (opcional)"
        />
        <p className="text-sm text-gray-500">Recomendado: 7-9 horas</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="temporada">Temporada *</Label>
        <select
          id="temporada"
          value={formData.temporada}
          onChange={(e) => handleInputChange("temporada", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona la temporada</option>
          <option value="verano">Verano</option>
          <option value="invierno">Invierno</option>
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
      // Transforma los datos del formulario al formato esperado por el backend
      const payload = {
        userId: user.id,
        profile: {
          biologicalSex: formData.sexo,
          age: Number(formData.edad),
          goal: formData.objetivo,
          activityLevel: formData.nivelActividad,
        },
        measurements: {
          weight: Number(formData.peso),
          height: Number(formData.altura),
          waist: formData.cintura ? Number(formData.cintura) : undefined,
          hip: formData.cadera ? Number(formData.cadera) : undefined,
          neck: formData.cuello ? Number(formData.cuello) : undefined,
        },
        lifestyle: {
          sleepHours: formData.horasSueno ? Number(formData.horasSueno) : undefined,
          season: formData.temporada,
        },
        targetCalories: 2000, // Puedes calcularlo o pedirlo al usuario
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
      setPlanGemini(data)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setPlanError(errorMessage)
    } finally {
      setLoadingPlan(false)
    }
  }

  const renderStep4 = () => {
    if (loadingPlan) {
      return <div className="text-center py-8">Generando plan personalizado con Gemini...</div>
    }
    if (planError) {
      return <div className="text-center text-red-600 py-8">Error: {planError}</div>
    }
    if (!planGemini) {
      return <div className="text-center py-8">Esperando respuesta de Gemini...</div>
    }

    // Renderiza el plan real de Gemini
    return (
      <div className="space-y-6">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Plan nutricional personalizado
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Este plan fue generado automáticamente por Gemini según tus datos.
          </p>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Objetivo: {planGemini.goal}</h4>
            <h4 className="font-medium text-gray-800 mb-2">Calorías objetivo: {planGemini.targetCalories}</h4>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Plan diario:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {planGemini.dailyMealPlans?.map((meal: DailyMealPlan, i: number) => (
                <li key={i}>{typeof meal === "string" ? meal : JSON.stringify(meal)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Recomendaciones:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {planGemini.recommendations?.general?.map((r: string, i: number) => <li key={`g${i}`}>{r}</li>)}
              {planGemini.recommendations?.specific?.map((r: string, i: number) => <li key={`s${i}`}>{r}</li>)}
              {planGemini.recommendations?.seasonal?.map((r: string, i: number) => <li key={`se${i}`}>{r}</li>)}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => {
                const content =
                  `Plan nutricional personalizado por Gemini\n\n` +
                  `Objetivo: ${planGemini.goal}\n` +
                  `Calorías objetivo: ${planGemini.targetCalories}\n\n` +
                  `Plan diario:\n- ${planGemini.dailyMealPlans?.join("\n- ")}\n\n` +
                  `Recomendaciones:\n- ${(planGemini.recommendations?.general || []).join("\n- ")}\n- ${(planGemini.recommendations?.specific || []).join("\n- ")}\n- ${(planGemini.recommendations?.seasonal || []).join("\n- ")}\n`
                const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = "plan-nutricional-gemini.txt"
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar plan (TXT)
            </Button>
          </div>
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
        return Boolean(formData.sexo && formData.edad && formData.objetivo && formData.nivelActividad)
      case 1:
        return Boolean(formData.peso && formData.altura)
      case 2:
        return Boolean(formData.temporada)
      case 3:
        return true // En “Géminis” no exigimos más campos
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