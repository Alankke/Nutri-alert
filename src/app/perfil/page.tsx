import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockHealthResults, mockGamificationData } from "@/lib/mock-data"
import { User, Calendar, Target, Activity, Plus, Edit, Trophy, Star } from "lucide-react"

export default function PerfilPage() {
  const healthResults = mockHealthResults
  const gamificationData = mockGamificationData

  // Datos simulados del usuario
  const userProfile = {
    nombre: "Luis Herrera",
    email: "luis.herrera@email.com",
    fechaRegistro: "15 de Enero, 2024",
    ultimaActualizacion: "Hoy",
    objetivo: "Bajar de peso",
    nivelActividad: "Sedentario",
    temporada: "Invierno"
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mi Perfil
        </h1>
        <p className="text-gray-600">
          Gestiona tu información personal y accede a tus métricas
        </p>
      </div>

      {/* Información del Usuario */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-600" />
            <span>Información Personal</span>
          </CardTitle>
          <CardDescription>
            Tus datos básicos y preferencias de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  {userProfile.nombre}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  {userProfile.email}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Fecha de Registro</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{userProfile.fechaRegistro}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Objetivo Principal</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span>{userProfile.objetivo}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Nivel de Actividad</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-500" />
                  <span>{userProfile.nivelActividad}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Temporada</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                  {userProfile.temporada}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" className="flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Editar Perfil</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Salud */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-green-600" />
            <span>Resumen de Salud</span>
          </CardTitle>
          <CardDescription>
            Tu estado actual y últimas métricas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {healthResults.imc.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">IMC Actual</div>
              <Badge variant="outline" className="mt-2">
                {healthResults.categoriaIMC.replace('_', ' ')}
              </Badge>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {healthResults.caloriasObjetivo}
              </div>
              <div className="text-sm text-gray-600">Calorías Objetivo</div>
              <div className="text-xs text-gray-500 mt-1">
                TDEE: {healthResults.tdee} kcal
              </div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {gamificationData.healthScore}
              </div>
              <div className="text-sm text-gray-600">Health Score</div>
              <div className="text-xs text-gray-500 mt-1">
                {gamificationData.puntos} puntos
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones Rápidas */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            <span>Acciones Rápidas</span>
          </CardTitle>
          <CardDescription>
            Accede rápidamente a las funcionalidades principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/metricas/nueva">
              <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-6 h-6" />
                <span>Nuevas Métricas</span>
              </Button>
            </Link>

            <Link href="/overview">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Target className="w-6 h-6" />
                <span>Ver Resumen</span>
              </Button>
            </Link>

            <Link href="/gamificacion">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Star className="w-6 h-6" />
                <span>Gamificación</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas del Usuario */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas del Usuario</CardTitle>
          <CardDescription>
            Resumen de tu actividad y progreso en la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {gamificationData.racha}
              </div>
              <div className="text-sm text-blue-700">Días de Racha</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {gamificationData.badges.filter(b => b.desbloqueado).length}
              </div>
              <div className="text-sm text-green-700">Badges Desbloqueados</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {gamificationData.misiones.filter(m => m.completada).length}
              </div>
              <div className="text-sm text-purple-700">Misiones Completadas</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {userProfile.ultimaActualizacion}
              </div>
              <div className="text-sm text-orange-700">Última Actualización</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 text-center">
        <div className="text-3xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¿Listo para actualizar tus métricas?
        </h3>
        <p className="text-gray-700 mb-6">
          Mantén tu perfil actualizado para obtener recomendaciones más precisas y 
          seguir tu progreso de salud.
        </p>
        <Link href="/metricas/nueva">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Cargar Nuevas Métricas
          </Button>
        </Link>
      </div>
    </div>
  )
}
