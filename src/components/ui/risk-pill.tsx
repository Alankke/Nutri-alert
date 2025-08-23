import { cn } from "@/lib/utils"

interface RiskPillProps {
  risk: "low" | "moderate" | "high"
  className?: string
}

export function RiskPill({ risk, className }: RiskPillProps) {
  const riskConfig = {
    low: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
      label: "Bajo Riesgo"
    },
    moderate: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
      label: "Riesgo Moderado"
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      label: "Alto Riesgo"
    }
  }

  const config = riskConfig[risk]

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <div className={cn(
        "w-2 h-2 rounded-full mr-2",
        risk === "low" && "bg-green-500",
        risk === "moderate" && "bg-yellow-500",
        risk === "high" && "bg-red-500"
      )} />
      {config.label}
    </div>
  )
}
