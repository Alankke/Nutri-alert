import { GoogleGenAI } from "@google/genai";

// Configuración de Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiModel = ai.models;

// Prompt base para generar planes nutricionales
export const NUTRITION_PROMPT = `
Eres un nutricionista experto que genera planes nutricionales personalizados en español.

Genera un plan nutricional completo para todos los días de la semanabasado en los siguientes datos del usuario:

PERFIL DEL USUARIO:
- Sexo biológico: {biologicalSex}
- Edad: {age} años
- Objetivo: {goal}
- Nivel de actividad: {activityLevel}

MEDIDAS CORPORALES:
- Peso: {weight} kg
- Altura: {height} cm
- Cintura: {waist} cm
- Objetivo de calorías: {targetCalories} kcal/día

ESTILO DE VIDA:
- Horas de sueño: {sleepHours} horas
- Temporada: {season}

REQUISITOS:
1. Genera un plan para 7 días con 3 comidas principales (desayuno, almuerzo, cena) y 2-3 refrigerios
2. Cada comida debe incluir:
   - Nombre del plato
   - Descripción breve
   - Calorías aproximadas
   - Macronutrientes (carbohidratos, proteínas, grasas en gramos)
   - Lista de ingredientes principales
   - Instrucciones de preparación simples
   - Tiempo de preparación

3. Considera:
   - El objetivo del usuario ({goal})
   - La temporada ({season})
   - Alimentos accesibles y fáciles de preparar
   - Variedad nutricional
   - Consejos específicos para el objetivo

4. Incluye recomendaciones generales, específicas para el objetivo y estacionales

Responde SOLO con un JSON válido que siga esta estructura exacta:
{
  "userId": "{userId}",
  "goal": "{goal}",
  "targetCalories": {targetCalories},
  "dailyMealPlans": [
    {
      "day": "Día 1",
      "meals": {
        "breakfast": { /* estructura de Meal */ },
        "morningSnack": { /* estructura de Meal */ },
        "lunch": { /* estructura de Meal */ },
        "afternoonSnack": { /* estructura de Meal */ },
        "dinner": { /* estructura de Meal */ }
      },
      "totalCalories": 0,
      "totalMacros": { "carbs": 0, "protein": 0, "fat": 0 }
    }
    // ... repetir para 7 días
  ],
  "recommendations": {
    "general": ["recomendación 1", "recomendación 2"],
    "specific": ["recomendación específica para el objetivo"],
    "seasonal": ["recomendación para la temporada"]
  }
}
`;
