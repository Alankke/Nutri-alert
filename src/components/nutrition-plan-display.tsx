"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import { NutritionalPlan } from "@/types/nutrition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NutritionPlanDisplay() {
  const { isLoaded, isSignedIn } = useUser();
  const [nutritionalPlans, setNutritionalPlans] = useState<NutritionalPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los planes nutricionales
  const fetchNutritionalPlans = useCallback(async () => {
    if (!isSignedIn) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/nutrition-plan');
      
      if (!response.ok) {
        throw new Error('Error al obtener los planes nutricionales');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setNutritionalPlans(result.data);
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  // Cargar los planes cuando el usuario esté autenticado
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchNutritionalPlans();
    }
  }, [isLoaded, isSignedIn, fetchNutritionalPlans]);

  // Estados de carga y no autenticado
  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando...</div>
        </CardContent>
      </Card>
    );
  }

  if (!isSignedIn) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Inicia sesión para ver tus planes nutricionales
          </div>
        </CardContent>
      </Card>
    );
  }

  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para verificar si el plan sigue siendo válido
  const isPlanValid = (plan: NutritionalPlan) => {
    return new Date(plan.validUntil) > new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mis Planes Nutricionales</h2>
        <Button 
          onClick={fetchNutritionalPlans} 
          disabled={loading}
          variant="outline"
        >
          {loading ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <div className="text-destructive text-center">{error}</div>
          </CardContent>
        </Card>
      )}

      {nutritionalPlans.length === 0 && !loading && !error && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              No tienes planes nutricionales aún. 
              <br />
              Crea uno nuevo para comenzar tu viaje de salud.
            </div>
          </CardContent>
        </Card>
      )}

      {nutritionalPlans.map((plan, index) => (
        <Card key={index} className={!isPlanValid(plan) ? 'opacity-60' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Plan Nutricional - {plan.goal === 'lose' ? 'Pérdida de Peso' : 
                                   plan.goal === 'maintain' ? 'Mantenimiento' : 'Ganancia de Peso'}
                {!isPlanValid(plan) && (
                  <Badge variant="secondary">Expirado</Badge>
                )}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {formatDate(plan.createdAt)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Calorías objetivo: <span className="font-medium">{plan.targetCalories} kcal</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Planes de comidas diarios */}
            {plan.dailyMealPlans.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Plan de Comidas</h4>
                <div className="grid gap-3">
                  {plan.dailyMealPlans.slice(0, 3).map((dayPlan, dayIndex) => (
                    <div key={dayIndex} className="border rounded-lg p-3">
                      <div className="font-medium text-sm mb-2">{dayPlan.day}</div>
                      <div className="text-xs text-muted-foreground">
                        Total: {dayPlan.totalCalories} kcal
                      </div>
                    </div>
                  ))}
                  {plan.dailyMealPlans.length > 3 && (
                    <div className="text-sm text-muted-foreground text-center">
                      +{plan.dailyMealPlans.length - 3} días más
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Recomendaciones */}
            <div>
              <h4 className="font-semibold mb-2">Recomendaciones</h4>
              <div className="space-y-3">
                {plan.recommendations.general.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Generales</div>
                    <ul className="text-sm space-y-1">
                      {plan.recommendations.general.slice(0, 3).map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.recommendations.specific.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Específicas</div>
                    <ul className="text-sm space-y-1">
                      {plan.recommendations.specific.slice(0, 2).map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.recommendations.seasonal.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Estacionales</div>
                    <ul className="text-sm space-y-1">
                      {plan.recommendations.seasonal.slice(0, 2).map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Información de validez */}
            <div className="text-xs text-muted-foreground">
              <div>Válido hasta: {formatDate(plan.validUntil)}</div>
              {!isPlanValid(plan) && (
                <div className="text-destructive mt-1">
                  Este plan ha expirado. Considera crear uno nuevo.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
