import { HealthMetrics, RiskLevel } from "@/types/nutrition";

/**
 * Calcula el IMC (Índice de Masa Corporal)
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Calcula la relación cintura-altura (WHtR)
 */
export function calculateWHtR(waist: number, height: number): number {
  return Number((waist / height).toFixed(2));
}

/**
 * Calcula el TDEE (Total Daily Energy Expenditure) usando la fórmula de Mifflin-St Jeor
 */
export function calculateTDEE(
  weight: number,
  height: number,
  age: number,
  biologicalSex: "male" | "female",
  activityLevel: "sedentary" | "light" | "moderate" | "high"
): number {
  // Fórmula de Mifflin-St Jeor
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = biologicalSex === "male" ? bmr + 5 : bmr - 161;

  // Multiplicadores de actividad
  const activityMultipliers = {
    sedentary: 1.2,    // Poco o ningún ejercicio
    light: 1.375,      // Ejercicio ligero 1-3 días/semana
    moderate: 1.55,    // Ejercicio moderado 3-5 días/semana
    high: 1.725,       // Ejercicio intenso 6-7 días/semana
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
}

/**
 * Calcula las calorías objetivo basadas en el objetivo del usuario
 */
export function calculateTargetCalories(tdee: number, goal: "lose" | "maintain" | "gain"): number {
  const adjustments = {
    lose: 0.85,      // Déficit del 15%
    maintain: 1.0,   // Mantener peso
    gain: 1.15,      // Superávit del 15%
  };

  return Math.round(tdee * adjustments[goal]);
}

/**
 * Calcula la distribución de macronutrientes
 */
export function calculateMacros(
  targetCalories: number,
  goal: "lose" | "maintain" | "gain"
): { carbs: number; protein: number; fat: number } {
  let proteinRatio: number;
  let fatRatio: number;

  // Ajustar ratios según el objetivo
  switch (goal) {
    case "lose":
      proteinRatio = 0.35; // Más proteína para preservar músculo
      fatRatio = 0.25;
      break;
    case "maintain":
      proteinRatio = 0.25;
      fatRatio = 0.25;
      break;
    case "gain":
      proteinRatio = 0.20;
      fatRatio = 0.30; // Más grasa para ganar peso
      break;
  }

  const carbsRatio = 1 - proteinRatio - fatRatio;

  const protein = Math.round((targetCalories * proteinRatio) / 4); // 4 cal/g
  const fat = Math.round((targetCalories * fatRatio) / 9); // 9 cal/g
  const carbs = Math.round((targetCalories * carbsRatio) / 4); // 4 cal/g

  return { carbs, protein, fat };
}

/**
 * Determina el nivel de riesgo basado en IMC y WHtR
 */
export function calculateRiskLevel(bmi: number, whtr?: number): RiskLevel {
  // Evaluar IMC
  let bmiRisk: RiskLevel = "low";
  if (bmi < 18.5) bmiRisk = "moderate";
  else if (bmi >= 18.5 && bmi < 25) bmiRisk = "low";
  else if (bmi >= 25 && bmi < 30) bmiRisk = "moderate";
  else bmiRisk = "high";

  // Evaluar WHtR si está disponible
  if (whtr !== undefined) {
    let whtrRisk: RiskLevel = "low";
    if (whtr < 0.4) whtrRisk = "low";
    else if (whtr >= 0.4 && whtr < 0.5) whtrRisk = "moderate";
    else whtrRisk = "high";

    // Combinar riesgos (tomar el más alto)
    if (bmiRisk === "high" || whtrRisk === "high") return "high";
    if (bmiRisk === "moderate" || whtrRisk === "moderate") return "moderate";
    return "low";
  }

  return bmiRisk;
}

/**
 * Calcula el score de salud (0-100)
 */
export function calculateHealthScore(
  bmi: number,
  whtr: number | undefined,
  sleepHours: number,
  activityLevel: "sedentary" | "light" | "moderate" | "high"
): number {
  let score = 100;

  // Penalizar por IMC fuera del rango saludable
  if (bmi < 18.5 || bmi >= 30) score -= 20;
  else if (bmi < 20 || bmi >= 27) score -= 10;

  // Penalizar por WHtR alto
  if (whtr && whtr >= 0.5) score -= 15;
  else if (whtr && whtr >= 0.4) score -= 5;

  // Penalizar por poco sueño
  if (sleepHours < 6) score -= 15;
  else if (sleepHours < 7) score -= 10;
  else if (sleepHours > 9) score -= 5;

  // Bonificar por actividad física
  const activityBonus = {
    sedentary: 0,
    light: 5,
    moderate: 10,
    high: 15,
  };
  score += activityBonus[activityLevel];

  return Math.max(0, Math.min(100, score));
}

/**
 * Valida que los datos del usuario sean coherentes
 */
export function validateUserData(metrics: HealthMetrics): string[] {
  const errors: string[] = [];

  // Validar rangos razonables
  if (metrics.measurements.weight < 30 || metrics.measurements.weight > 300) {
    errors.push("El peso debe estar entre 30 y 300 kg");
  }

  if (metrics.measurements.height < 100 || metrics.measurements.height > 250) {
    errors.push("La altura debe estar entre 100 y 250 cm");
  }

  if (metrics.profile.age < 13 || metrics.profile.age > 120) {
    errors.push("La edad debe estar entre 13 y 120 años");
  }

  if (metrics.lifestyle.sleepHours < 4 || metrics.lifestyle.sleepHours > 16) {
    errors.push("Las horas de sueño deben estar entre 4 y 16 horas");
  }

  if (metrics.measurements.waist && (metrics.measurements.waist < 50 || metrics.measurements.waist > 200)) {
    errors.push("La medida de cintura debe estar entre 50 y 200 cm");
  }

  return errors;
}
