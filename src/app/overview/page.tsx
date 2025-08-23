import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskPill } from "@/components/ui/risk-pill"
import { Badge } from "@/components/ui/badge"
import { mockHealthResults } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Minus, Zap, Target, AlertTriangle } from "lucide-react"

export default function OverviewPage() {
  const results = mockHealthResults

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case "underweight":
        return "text-blue-600"
      case "normal":
        return "text-green-600"
      case "overweight":
        return "text-yellow-600"
      case "obese":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getBMICategoryLabel = (category: string) => {
    switch (category) {
      case "underweight":
        return "Bajo Peso"
      case "normal":
        return "Peso Normal"
      case "overweight":
        return "Sobrepeso"
      case "obese":
        return "Obesidad"
      default:
        return "No definido"
    }
  }

  const getTrendIcon = (goal: string) => {
    switch (goal) {
      case "lose":
        return <TrendingDown className="w-5 h-5 text-green-600" />
      case "gain":
        return <TrendingUp className="w-5 h-5 text-blue-600" />
      case "maintain":
        return <Minus className="w-5 h-5 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resumen de tu Salud
        </h1>
        <p className="text-gray-600">
          Revisa tu estado actual, energía diaria y recomendaciones personalizadas
        </p>
      </div>

      {/* Estado Actual */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-600" />
            <span>Estado Actual</span>
          </CardTitle>
          <CardDescription>
            Tu índice de masa corporal y nivel de riesgo actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {results.bmi.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mb-1">IMC</div>
              <div className={cn(
                "text-sm font-medium px-2 py-1 rounded-full",
                getBMICategoryColor(results.bmiCategory)
              )}>
                {getBMICategoryLabel(results.bmiCategory)}
              </div>
            </div>

            {results.whtr && (
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {results.whtr.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">WHtR</div>
                <div className="text-xs text-gray-500">
                  Relación Cintura/Altura
                </div>
              </div>
            )}

            <div className="text-center">
              <div className="mb-2">
                <RiskPill risk={results.riskLevel} />
              </div>
              <div className="text-sm text-gray-600">Nivel de Riesgo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energía Diaria */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-green-600" />
            <span>Energía Diaria</span>
          </CardTitle>
          <CardDescription>
            Tu gasto energético total y distribución de macronutrientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calorías */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">TDEE (Gasto Total)</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.tdee} kcal
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Objetivo</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.targetCalories} kcal
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                {getTrendIcon("lose")}
                <span>Déficit calórico para bajar de peso</span>
              </div>
            </div>

            {/* Macronutrientes */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Distribución de Macros</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">Carbohidratos</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {results.macros.carbs}g
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Proteínas</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {results.macros.protein}g
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Grasas</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {results.macros.fat}g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consejos Rápidos */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-purple-600" />
            <span>Consejos Rápidos</span>
          </CardTitle>
          <CardDescription>
            Recomendaciones personalizadas basadas en tu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {results.advice.map((advice: string, index: number) => (
              <Badge key={index} variant="outline" className="text-sm">
                {advice}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 text-sm font-bold">ℹ</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Importante</h3>
            <p className="text-blue-800 text-sm">
              Esta aplicación no realiza diagnósticos médicos. Es una herramienta de orientación preventiva. 
              Siempre consulta con un profesional de la salud para obtener asesoramiento médico personalizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
