import { NextRequest, NextResponse } from "next/server";
import { geminiModel, NUTRITION_PROMPT } from "@/lib/gemini";
import { HealthMetrics, NutritionalPlan } from "@/types/nutrition";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
      .replace("{sleepHours}", (userData.lifestyle.sleepHours || 7).toString())
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
    let nutritionPlanData: Record<string, unknown>;
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
      dailyMealPlans: Array.isArray(nutritionPlanData.dailyMealPlans) ? nutritionPlanData.dailyMealPlans : [],
      recommendations: {
        general: Array.isArray((nutritionPlanData.recommendations as { general?: unknown; specific?: unknown; seasonal?: unknown })?.general) ? (nutritionPlanData.recommendations as { general: string[] }).general : [],
        specific: Array.isArray((nutritionPlanData.recommendations as { general?: unknown; specific?: unknown; seasonal?: unknown })?.specific) ? (nutritionPlanData.recommendations as { specific: string[] }).specific : [],
        seasonal: Array.isArray((nutritionPlanData.recommendations as { general?: unknown; specific?: unknown; seasonal?: unknown })?.seasonal) ? (nutritionPlanData.recommendations as { seasonal: string[] }).seasonal : [],
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

export async function GET(request: NextRequest) {
  try {
    // Obtener la sesión del usuario autenticado
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Obtener los planes nutricionales del usuario desde la base de datos
    const nutritionalPlans = await prisma.nutritionalPlan.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Más recientes primero
      },
    });

    // Transformar los datos de la base de datos al formato de la interfaz
    const transformedPlans: NutritionalPlan[] = nutritionalPlans.map(plan => ({
      userId: plan.userId,
      goal: plan.goal,
      targetCalories: plan.targetCalories,
      dailyMealPlans: Array.isArray(plan.dailyMealPlans) ? plan.dailyMealPlans as any[] : [],
      recommendations: {
        general: Array.isArray((plan.recommendations as any)?.general) ? (plan.recommendations as any).general : [],
        specific: Array.isArray((plan.recommendations as any)?.specific) ? (plan.recommendations as any).specific : [],
        seasonal: Array.isArray((plan.recommendations as any)?.seasonal) ? (plan.recommendations as any).seasonal : [],
      },
      createdAt: plan.createdAt,
      validUntil: plan.validUntil,
    }));

    return NextResponse.json({
      success: true,
      data: transformedPlans,
      count: transformedPlans.length,
    });

  } catch (error) {
    console.error("Error al obtener los planes nutricionales:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
