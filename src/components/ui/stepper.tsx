import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div
      className={cn(
        // Contenedor centrado y consistente
        "w-full flex items-center justify-center",
        className
      )}
    >
      <div
        // Limita el ancho máximo para que no se desparrame en pantallas grandes
        className="w-full max-w-5xl flex items-center justify-center"
      >
        {/* Fila centrada con separación uniforme */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <div key={index} className="flex items-center">
                {/* Conector IZQ (fijo, no estira) */}

                {/* Nodo */}
                <div className="flex flex-col items-center">
                  {/* Alto reservado para evitar saltos por scale */}
                  <div className="h-10 flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 shadow-md transition-all duration-300 will-change-transform",
                        isCompleted &&
                          "bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white shadow-lg",
                        isCurrent &&
                          // scale suave sin romper línea
                          "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg transform-gpu scale-105",
                        isUpcoming &&
                          "bg-gray-100 border-gray-300 text-gray-400 hover:scale-105 hover:shadow-sm"
                      )}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                  </div>

                  {/* Texto debajo, centrado y con ancho fijo para consistencia */}
                  <span
                    className={cn(
                      "mt-2 text-xs leading-tight text-center",
                      "w-24 sm:w-28 md:w-32 break-words",
                      "transition-colors duration-300",
                      isCompleted && "text-green-600 font-medium",
                      isCurrent && "text-blue-600 font-semibold",
                      isUpcoming && "text-gray-400"
                    )}
                  >
                    {step}
                  </span>
                </div>

                {/* Conector DER (fijo, no estira) */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block h-0.5 mx-2 sm:mx-3 transition-colors duration-300",
                      "w-8 sm:w-12 md:w-16",
                      // El conector derecho toma el estado del ESTE nodo (consistente visualmente)
                      (isCompleted || isCurrent)
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}