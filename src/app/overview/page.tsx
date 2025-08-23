"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskPill } from "@/components/ui/risk-pill"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Zap, Target, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function OverviewPage() {
  const { user, isLoaded } = useUser()

  // Datos en tiempo real
  const [nutritionPlans, setNutritionPlans] = useState<any[]>([])
  const [healthMetrics, setHealthMetrics] = useState<any[]>([])

  // Cargar planes nutricionales del usuario autenticado
  useEffect(() => {
    if (!isLoaded || !user?.id) return
    async function fetchPlans() {
      const res = await fetch(`/api/nutrition-plan`)
      if (res.ok) setNutritionPlans(await res.json())
    }
    fetchPlans()
  }, [isLoaded, user])

  // Cargar métricas de salud del usuario autenticado
  useEffect(() => {
    if (!isLoaded || !user?.id) return
    async function fetchMetrics() {
      const res = await fetch(`/api/health-metrics?userId=${user!.id}`)
      if (res.ok) setHealthMetrics(await res.json())
    }
    fetchMetrics()
  }, [isLoaded, user])

  // Utilidades para mostrar etiquetas y colores
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

  // Última métrica de salud para mostrar resumen
  const latestMetric = healthMetrics.length > 0 ? healthMetrics[0] : null

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

      {/* Estado Actual (última métrica) */}
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
          {latestMetric ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {latestMetric.bmi?.toFixed(1) ?? "-"}
                </div>
                <div className="text-sm text-gray-600 mb-1">IMC</div>
                <div className={cn(
                  "text-sm font-medium px-2 py-1 rounded-full",
                  getBMICategoryColor(latestMetric.bmiCategory || "")
                )}>
                  {getBMICategoryLabel(latestMetric.bmiCategory || "")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {latestMetric.whtr?.toFixed(2) ?? "-"}
                </div>
                <div className="text-sm text-gray-600">WHtR</div>
                <div className="text-xs text-gray-500">
                  Relación Cintura/Altura
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <RiskPill risk={latestMetric.riskLevel} />
                </div>
                <div className="text-sm text-gray-600">Nivel de Riesgo</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No hay métricas registradas aún.</div>
          )}
        </CardContent>
      </Card>

      {/* Energía Diaria (última métrica) */}
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
          {latestMetric ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calorías */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">TDEE (Gasto Total)</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {latestMetric.tdee} kcal
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Objetivo</div>
                    <div className="text-2xl font-bold text-green-600">
                      {latestMetric.targetCalories} kcal
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  {getTrendIcon(latestMetric.goal)}
                  <span>
                    {latestMetric.goal === "lose"
                      ? "Déficit calórico para bajar de peso"
                      : latestMetric.goal === "gain"
                      ? "Superávit calórico para subir de peso"
                      : "Mantener peso"}
                  </span>
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
                      {latestMetric.carbs}g
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Proteínas</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {latestMetric.protein}g
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Grasas</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {latestMetric.fat}g
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No hay métricas registradas aún.</div>
          )}
        </CardContent>
      </Card>

      {/* Historial de Métricas de Salud */}
      <Card className="border-l-4 border-l-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Historial de Métricas de Salud</span>
          </CardTitle>
          <CardDescription>
            Últimas métricas de salud registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healthMetrics.length === 0 ? (
            <div className="text-gray-500 text-sm">No hay métricas guardadas aún.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 border">Fecha</th>
                    <th className="px-2 py-1 border">IMC</th>
                    <th className="px-2 py-1 border">TDEE</th>
                    <th className="px-2 py-1 border">Calorías Objetivo</th>
                    <th className="px-2 py-1 border">Riesgo</th>
                  </tr>
                </thead>
                <tbody>
                  {healthMetrics.map((m, i) => (
                    <tr key={m.id || i} className="even:bg-gray-50">
                      <td className="px-2 py-1 border">{m.date ? new Date(m.date).toLocaleDateString() : "-"}</td>
                      <td className="px-2 py-1 border">{m.bmi ?? "-"}</td>
                      <td className="px-2 py-1 border">{m.tdee ?? "-"}</td>
                      <td className="px-2 py-1 border">{m.targetCalories ?? "-"}</td>
                      <td className="px-2 py-1 border">{m.riskLevel ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historial de Planes Nutricionales */}
      <Card className="border-l-4 border-l-gray-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Historial de Planes Nutricionales</span>
          </CardTitle>
          <CardDescription>
            Últimos planes nutricionales generados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nutritionPlans.length === 0 ? (
            <div className="text-gray-500 text-sm">No hay planes guardados aún.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 border">Fecha</th>
                    <th className="px-2 py-1 border">Objetivo</th>
                    <th className="px-2 py-1 border">Calorías Objetivo</th>
                    <th className="px-2 py-1 border">Válido Hasta</th>
                  </tr>
                </thead>
                <tbody>
                  {nutritionPlans.map((plan, i) => (
                    <tr key={plan.id || i} className="even:bg-gray-50">
                      <td className="px-2 py-1 border">{plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "-"}</td>
                      <td className="px-2 py-1 border">{plan.goal ?? "-"}</td>
                      <td className="px-2 py-1 border">{plan.targetCalories ?? "-"}</td>
                      <td className="px-2 py-1 border">{plan.validUntil ? new Date(plan.validUntil).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Semanal Detallado */}
      {nutritionPlans.length > 0 && nutritionPlans[0].dailyMealPlans && (
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Plan Semanal Detallado</span>
            </CardTitle>
            <CardDescription>
              Todas las comidas y snacks de tu plan semanal personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {nutritionPlans[0].dailyMealPlans.map((day: any, i: number) => (
                <div key={i} className="border-b pb-6 mb-6">
                  <h3 className="text-lg font-bold mb-2">{day.day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(day.meals).map(([mealKey, meal]: [string, any]) => (
                      <div key={mealKey} className="p-4 border rounded-lg bg-gray-50">
                        <h4 className="font-semibold text-blue-800 mb-1 capitalize">{mealKey.replace(/([A-Z])/g, ' $1')}</h4>
                        <div className="font-bold text-gray-900">{meal.name}</div>
                        <div className="text-xs text-gray-500 mb-2">{meal.description}</div>
                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Calorías: {meal.calories}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Proteínas: {meal.macros.protein}g</span>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Carbs: {meal.macros.carbs}g</span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Grasas: {meal.macros.fat}g</span>
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Ingredientes:</span>
                          <ul className="list-disc list-inside text-xs text-gray-700">
                            {meal.ingredients.map((ing: string, idx: number) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Instrucciones:</span>
                          <div className="text-xs text-gray-700">{meal.instructions}</div>
                        </div>
                        <div className="text-xs text-gray-500">Tiempo de preparación: {meal.preparationTime} min</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-700">
                    <span className="font-semibold">Totales del día:</span>{" "}
                    Proteínas: {day.totalMacros.protein}g, Carbs: {day.totalMacros.carbs}g, Grasas: {day.totalMacros.fat}g, Calorías: {day.totalCalories}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
