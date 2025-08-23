import { NextRequest, NextResponse } from "next/server";
import {
  calculateBMI,
  calculateWHtR,
  calculateTDEE,
  calculateTargetCalories,
  calculateMacros,
  calculateRiskLevel,
  calculateHealthScore,
  validateUserData,
} from "@/lib/nutrition-utils";
import { HealthMetrics } from "@/types/nutrition";

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del usuario del body
    const userData = await request.json();

    // Validar que tenemos los datos mínimos necesarios
    if (!userData.profile || !userData.measurements || !userData.lifestyle) {
      return NextResponse.json(
        { error: "Datos del usuario incompletos" },
        { status: 400 }
      );
    }

    // Validar los datos del usuario
    const validationErrors = validateUserData(userData as HealthMetrics);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: "Datos inválidos", details: validationErrors },
        { status: 400 }
      );
    }

    // Calcular métricas de salud
    const bmi = calculateBMI(userData.measurements.weight, userData.measurements.height);
    const whtr = userData.measurements.waist 
      ? calculateWHtR(userData.measurements.waist, userData.measurements.height)
      : undefined;
    
    const tdee = calculateTDEE(
      userData.measurements.weight,
      userData.measurements.height,
      userData.profile.age,
      userData.profile.biologicalSex,
      userData.profile.activityLevel
    );

    const targetCalories = calculateTargetCalories(tdee, userData.profile.goal);
    const macros = calculateMacros(targetCalories, userData.profile.goal);
    const riskLevel = calculateRiskLevel(bmi, whtr);
    const healthScore = calculateHealthScore(
      bmi,
      whtr,
      userData.lifestyle.sleepHours,
      userData.profile.activityLevel
    );

    // Crear el objeto de métricas de salud completo
    const healthMetrics: HealthMetrics = {
      id: userData.id || `metrics-${Date.now()}`,
      userId: userData.userId || `user-${Date.now()}`,
      date: new Date(),
      profile: userData.profile,
      measurements: userData.measurements,
      lifestyle: userData.lifestyle,
      bmi,
      whtr,
      tdee,
      targetCalories,
      macros,
      riskLevel,
      healthScore,
    };

    return NextResponse.json(healthMetrics);
  } catch (error) {
    console.error("Error en el endpoint de métricas de salud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
