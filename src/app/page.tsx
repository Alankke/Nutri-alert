import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3, Plus, Target, Trophy, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Bienvenido a NutriAlert
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tu compañero de salud predictiva con gamificación. Monitorea tu estado nutricional, 
          recibe consejos personalizados y mantén tu motivación con nuestro sistema de recompensas.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Nuevas Métricas</CardTitle>
            <CardDescription>
              Registra tus medidas corporales y hábitos para obtener un análisis completo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/metricas/nueva">
              <Button className="w-full">Comenzar</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Ver Resumen</CardTitle>
            <CardDescription>
              Revisa tu estado actual, IMC, riesgo y recomendaciones personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/overview">
              <Button variant="outline" className="w-full">Ver Resumen</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Gamificación</CardTitle>
            <CardDescription>
              Desbloquea badges, acumula puntos y mantén tu racha de salud
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/gamificacion">
              <Button variant="outline" className="w-full">Ver Progreso</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ¿Qué ofrece NutriAlert?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Análisis Predictivo</h3>
                <p className="text-gray-600 text-sm">
                  Evaluación completa de tu estado nutricional con indicadores de riesgo temprano
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Activity className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Seguimiento Continuo</h3>
                <p className="text-gray-600 text-sm">
                  Monitorea tu progreso con métricas históricas y gráficos de evolución
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Trophy className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gamificación</h3>
                <p className="text-gray-600 text-sm">
                  Sistema de recompensas, badges y misiones para mantener tu motivación
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-3 h-3 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Orientación Profesional</h3>
                <p className="text-gray-600 text-sm">
                  Consejos personalizados basados en evidencia científica y tu contexto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 text-sm font-bold">ℹ</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Importante</h3>
            <p className="text-blue-800 text-sm">
              NutriAlert es una herramienta de orientación preventiva y no realiza diagnósticos médicos. 
              Siempre consulta con un profesional de la salud para obtener asesoramiento médico personalizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
