import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "@/components/ui/progress-ring"
import { mockGamificationData } from "@/lib/mock-data"
import { Trophy, Target, Flame, Star, CheckCircle, Circle } from "lucide-react"

export default function GamificacionPage() {
  const data = mockGamificationData

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gamificación
        </h1>
        <p className="text-gray-600">
          Mantén tu motivación con nuestro sistema de recompensas y misiones
        </p>
      </div>

      {/* Health Score Principal */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Trophy className="w-6 h-6 text-blue-600" />
            <span>Tu Health Score</span>
          </CardTitle>
          <CardDescription>
            Puntuación general de tu salud basada en tus métricas y hábitos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ProgressRing
            value={data.healthScore}
            max={100}
            size={200}
            strokeWidth={12}
          />
        </CardContent>
      </Card>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{data.points}</span>
            </div>
            <p className="text-sm text-gray-600">Puntos Totales</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{data.streak}</span>
            </div>
            <p className="text-sm text-gray-600">Días de Racha</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                {data.missions.filter(m => m.completed).length}/{data.missions.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Misiones Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Misiones del Día */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-green-600" />
            <span>Misiones del Día</span>
          </CardTitle>
          <CardDescription>
            Completa estas tareas para ganar puntos y mantener tu racha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.missions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {mission.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{mission.name}</div>
                    <div className="text-sm text-gray-600">{mission.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-xs">
                    {mission.type}
                  </Badge>
                  <div className="text-sm font-medium text-gray-900">
                    +{mission.rewardPoints} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            <span>Badges y Logros</span>
          </CardTitle>
          <CardDescription>
            Desbloquea logros especiales por tus metas alcanzadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.unlocked
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="font-medium text-gray-900 mb-1">
                    {badge.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {badge.description}
                  </div>
                  {badge.unlocked ? (
                    <Badge variant="success" className="text-xs">
                      Desbloqueado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Bloqueado
                    </Badge>
                  )}
                  {badge.unlockDate && (
                    <div className="text-xs text-gray-500 mt-2">
                      {badge.unlockDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consejos de Motivación */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¡Mantén tu Motivación!
            </h3>
            <p className="text-gray-700">
              Cada día es una nueva oportunidad para mejorar tu salud. 
              Completa tus misiones diarias, mantén tu racha y desbloquea nuevos badges.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
