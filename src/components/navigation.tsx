"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, BarChart3, Calendar, Home, Plus, Target, Trophy, Users, Menu, X } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useState } from "react"

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
	const { user, isLoaded } = useUser()
	const pathname = usePathname()
	const isAdminRoute = pathname.startsWith("/med")
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	if (!isLoaded) return null
	if (!user) return null

	const currentNavigation = isAdminRoute ? adminNavigation : navigation

	return (
		<nav className="bg-white shadow-sm border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center h-16 justify-between">
					{/* Logo a la izquierda */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<Image src="/NutriAlert.png" alt="NutriAlert" width={32} height={32} />
							<span className="text-xl font-bold text-gray-900">NutriAlert</span>
						</Link>
					</div>

					{/* Navegación centrada - Solo visible en desktop */}
					<div className="hidden lg:flex flex-1 justify-center">
						<div className="flex items-center space-x-1">
							{currentNavigation.map((item) => {
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

					{/* Botón + Nueva Métrica a la derecha - Solo visible en desktop */}
					{!isAdminRoute && (
						<div className="hidden lg:block">
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
						</div>
					)}

					{/* Botón del menú hamburguesa - Solo visible en móvil */}
					<div className="lg:hidden flex items-center space-x-2">
						{!isAdminRoute && (
							<Link
								href="/metricas/nueva"
								className={cn(
									"flex items-center justify-center w-10 h-10 rounded-full transition-colors",
									pathname === "/metricas/nueva"
										? "bg-blue-600 text-white"
										: "bg-blue-100 text-blue-700 hover:bg-blue-200"
								)}
								title="Agregar nueva métrica"
							>
								<Plus className="w-5 h-5" />
							</Link>
						)}
						
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
						>
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Menú móvil desplegable */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-gray-200 py-4">
						<div className="flex flex-col space-y-2">
							{currentNavigation.map((item) => {
								const isActive = pathname === item.href
								return (
									<Link
										key={item.name}
										href={item.href}
										onClick={() => setIsMobileMenuOpen(false)}
										className={cn(
											"flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors",
											isActive
												? "bg-blue-100 text-blue-700"
												: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
										)}
									>
										<item.icon className="w-5 h-5 mr-3" />
										{item.name}
									</Link>
								)
							})}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}