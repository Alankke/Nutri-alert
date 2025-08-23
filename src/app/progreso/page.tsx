import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockHealthProgress } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Minus, Calendar, Activity } from "lucide-react"

export default function ProgresoPage() {
  const progress = mockHealthProgress

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return "text-green-600"
    if (current < previous) return "text-red-600"
    return "text-gray-600"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    })
  }

  // Crear sparklines simples
  const createSparkline = (data: number[], color: string) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100
          return (
            <div
              key={index}
              className={`w-1 rounded-full ${color}`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tu Progreso
        </h1>
        <p className="text-gray-600">
          Monitorea la evolución de tus métricas de salud a lo largo del tiempo
        </p>
      </div>

      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {progress.length}
            </div>
            <p className="text-sm text-gray-600">Registros</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {progress[progress.length - 1]?.weight.toFixed(1)} kg
            </div>
            <p className="text-sm text-gray-600">Peso Actual</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {progress[progress.length - 1]?.bmi.toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">IMC Actual</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {progress[progress.length - 1]?.healthScore}
            </div>
            <p className="text-sm text-gray-600">Health Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Peso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Evolución del Peso</span>
            </CardTitle>
            <CardDescription>
              Cambios en tu peso corporal a lo largo del tiempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {createSparkline(
                progress.map(p => p.weight),
                "bg-blue-500"
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Inicio: {progress[0]?.weight} kg</span>
                <span>Actual: {progress[progress.length - 1]?.weight} kg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span>Evolución del Health Score</span>
            </CardTitle>
            <CardDescription>
              Progreso de tu puntuación general de salud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {createSparkline(
                progress.map(p => p.healthScore),
                "bg-green-500"
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Inicio: {progress[0]?.healthScore}</span>
                <span>Actual: {progress[progress.length - 1]?.healthScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial Detallado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Historial de Registros</span>
          </CardTitle>
          <CardDescription>
            Revisa todos tus registros anteriores con comparaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.map((record, index) => {
              const previous = index > 0 ? progress[index - 1] : null
              const weightChange = previous ? record.weight - previous.weight : 0
              const bmiChange = previous ? record.bmi - previous.bmi : 0
              const scoreChange = previous ? record.healthScore - previous.healthScore : 0

              return (
                <div
                  key={record.date}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {formatDate(record.date)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Registro #{progress.length - index}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Peso */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {record.weight} kg
                      </div>
                      <div className="text-sm text-gray-600">Peso</div>
                      {previous && (
                        <div className={`text-xs flex items-center justify-center space-x-1 ${getTrendColor(record.weight, previous.weight)}`}>
                          {getTrendIcon(record.weight, previous.weight)}
                          <span>{weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg</span>
                        </div>
                      )}
                    </div>

                    {/* IMC */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {record.bmi.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">IMC</div>
                      {previous && (
                        <div className={`text-xs flex items-center justify-center space-x-1 ${getTrendColor(record.bmi, previous.bmi)}`}>
                          {getTrendIcon(record.bmi, previous.bmi)}
                          <span>{bmiChange > 0 ? '+' : ''}{bmiChange.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    {/* Health Score */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {record.healthScore}
                      </div>
                      <div className="text-sm text-gray-600">Health Score</div>
                      {previous && (
                        <div className={`text-xs flex items-center justify-center space-x-1 ${getTrendColor(record.healthScore, previous.healthScore)}`}>
                          {getTrendIcon(record.healthScore, previous.healthScore)}
                          <span>{scoreChange > 0 ? '+' : ''}{scoreChange}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cintura si está disponible */}
                  {record.waist && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Cintura</div>
                        <div className="font-medium text-gray-900">
                          {record.waist} cm
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Consejos de Progreso */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¡Buen Progreso!
            </h3>
            <p className="text-gray-700">
              Has mantenido una tendencia positiva en tu Health Score. 
              Continúa registrando tus métricas regularmente para mantener el seguimiento.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
