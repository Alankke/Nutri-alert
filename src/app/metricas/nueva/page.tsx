"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/ui/stepper"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"

const steps = ["Perfil", "Medidas", "Hábitos"]

export default function NuevaMetricaPage() {
  const [currentStep, setCurrentStep] = useState(0)
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Aquí se enviarían los datos al backend
    console.log("Datos del formulario:", formData)
    alert("¡Métricas guardadas exitosamente!")
  }

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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderStep1()
      case 1:
        return renderStep2()
      case 2:
        return renderStep3()
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.sexo && formData.edad && formData.objetivo && formData.nivelActividad
      case 1:
        return formData.peso && formData.altura
      case 2:
        return formData.temporada
      default:
        return false
    }
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
