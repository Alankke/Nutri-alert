import { cn } from "@/lib/utils"
import { RiskPill } from "./risk-pill"

interface DataTableProps {
  data: Array<{
    id: string
    name: string
    age: number
    bmi: number
    whtr: number
    healthScore: number
    riskLevel: "low" | "moderate" | "high"
    lastUpdate: string
  }>
  onRowClick?: (id: string) => void
  className?: string
}

export function DataTable({ data, onRowClick, className }: DataTableProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-700">Usuario</th>
              <th className="text-left p-4 font-medium text-gray-700">Edad</th>
              <th className="text-left p-4 font-medium text-gray-700">IMC</th>
              <th className="text-left p-4 font-medium text-gray-700">WHtR</th>
              <th className="text-left p-4 font-medium text-gray-700">Health Score</th>
              <th className="text-left p-4 font-medium text-gray-700">Riesgo</th>
              <th className="text-left p-4 font-medium text-gray-700">Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b hover:bg-gray-50 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(row.id)}
              >
                <td className="p-4 font-medium">{row.name}</td>
                <td className="p-4">{row.age} años</td>
                <td className="p-4">{row.bmi.toFixed(1)}</td>
                <td className="p-4">{row.whtr.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${row.healthScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{row.healthScore}</span>
                  </div>
                </td>
                <td className="p-4">
                  <RiskPill risk={row.riskLevel} />
                </td>
                <td className="p-4 text-sm text-gray-500">{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
