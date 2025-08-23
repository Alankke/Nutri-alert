import { NextRequest, NextResponse } from "next/server";
import { geminiModel, NUTRITION_PROMPT } from "@/lib/gemini";
import { HealthMetrics, NutritionalPlan } from "@/types/nutrition";

export async function POST(request: NextRequest) {
  try {
    // Verificar que tenemos la API key de Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key de Gemini no configurada" },
        { status: 500 }
      );
    }

    // Obtener los datos del usuario del body
    const userData: HealthMetrics = await request.json();

    // Validar que tenemos todos los datos necesarios
    if (!userData.profile || !userData.measurements || !userData.lifestyle) {
      return NextResponse.json(
        { error: "Datos del usuario incompletos" },
        { status: 400 }
      );
    }

    // Pasarle los parametros al prompt
    const personalizedPrompt = NUTRITION_PROMPT
      .replace("{userId}", userData.userId)
      .replace("{biologicalSex}", userData.profile.biologicalSex)
      .replace("{age}", userData.profile.age.toString())
      .replace("{goal}", userData.profile.goal)
      .replace("{activityLevel}", userData.profile.activityLevel)
      .replace("{weight}", userData.measurements.weight.toString())
      .replace("{height}", userData.measurements.height.toString())
      .replace("{waist}", userData.measurements.waist?.toString() || "N/A")
      .replace("{targetCalories}", userData.targetCalories.toString())
      .replace("{sleepHours}", userData.lifestyle.sleepHours.toString())
      .replace("{season}", userData.lifestyle.season);

    // Generar el plan nutricional usando Gemini
    const response = await geminiModel.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: personalizedPrompt,
    });
    
    // Verificar que tenemos texto en la respuesta
    if (!response.text) {
      console.error("Respuesta de Gemini sin texto:", response);
      return NextResponse.json(
        { error: "No se recibió respuesta válida de Gemini" },
        { status: 500 }
      );
    }
    
    const text = response.text;

    // Extraer el JSON de la respuesta
    let nutritionPlanData: any;
    try {
      // Buscar el JSON en la respuesta (puede tener texto adicional)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        nutritionPlanData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No se encontró JSON válido en la respuesta");
      }
    } catch (parseError) {
      console.error("Error al parsear la respuesta de Gemini:", parseError);
      console.error("Respuesta completa:", text);
      return NextResponse.json(
        { error: "Error al generar el plan nutricional" },
        { status: 500 }
      );
    }

    // Validar y estructurar la respuesta
    const nutritionPlan: NutritionalPlan = {
      userId: userData.userId,
      goal: userData.profile.goal,
      targetCalories: userData.targetCalories,
      dailyMealPlans: nutritionPlanData.dailyMealPlans || [],
      recommendations: nutritionPlanData.recommendations || {
        general: [],
        specific: [],
        seasonal: [],
      },
      createdAt: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    };

    return NextResponse.json(nutritionPlan);
  } catch (error) {
    console.error("Error en el endpoint de plan nutricional:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
