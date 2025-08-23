"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, BarChart3, Calendar, Home, Plus, Target, Trophy, Users } from "lucide-react"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Resumen", href: "/overview", icon: BarChart3 },
  { name: "Gamificación", href: "/gamificacion", icon: Trophy },
  { name: "Progreso", href: "/progreso", icon: Activity },
  { name: "Perfil", href: "/perfil", icon: Target },
]

const adminNavigation = [
  { name: "Dashboard Médico", href: "/med", icon: Users },
  { name: "Pacientes", href: "/med/pacientes", icon: Calendar },
]

export function Navigation() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/med")

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo a la izquierda */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">NutriAlert</span>
            </Link>
          </div>

          {/* Navegación centrada */}
          <div className="flex flex-1 justify-center">
            <div className="hidden md:flex items-center space-x-1">
              {isAdminRoute
                ? adminNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    )
                  })
                : navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    )
                  })}
            </div>
          </div>

          {/* Botón + Nueva Métrica a la derecha */}
          {!isAdminRoute && (
            <Link
              href="/metricas/nueva"
              className={cn(
                "ml-4 flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                pathname === "/metricas/nueva"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              )}
              title="Agregar nueva métrica"
            >
              <Plus className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}