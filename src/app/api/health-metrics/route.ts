import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    const {
      userId,
      biologicalSex,
      age,
      goal,
      activityLevel,
      weight,
      height,
      waist,
      hip,
      neck,
      sleepHours,
      season,
      bmi,
      whtr,
      tdee,
      targetCalories,
      carbs,
      protein,
      fat,
      riskLevel,
      healthScore,
    } = data;

    if (
      !userId ||
      !biologicalSex ||
      typeof age !== "number" ||
      !goal ||
      !activityLevel ||
      typeof weight !== "number" ||
      typeof height !== "number" ||
      typeof sleepHours !== "number" ||
      !season ||
      typeof bmi !== "number" ||
      typeof tdee !== "number" ||
      typeof targetCalories !== "number" ||
      typeof carbs !== "number" ||
      typeof protein !== "number" ||
      typeof fat !== "number" ||
      !riskLevel ||
      typeof healthScore !== "number"
    ) {
      return NextResponse.json(
        { error: "Datos incompletos o inválidos" },
        { status: 400 }
      );
    }

    // Verifica si el usuario existe
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: userId },
      });
    }

    // Guarda las métricas en la base de datos
    const healthMetrics = await prisma.healthMetrics.create({
      data: {
        userId,
        biologicalSex,
        age,
        goal,
        activityLevel,
        weight,
        height,
        waist,
        hip,
        neck,
        sleepHours,
        season,
        bmi,
        whtr,
        tdee,
        targetCalories,
        carbs,
        protein,
        fat,
        riskLevel,
        healthScore,
      },
    });

    return NextResponse.json(healthMetrics);
  } catch (error) {
    console.error("Error en el endpoint de métricas de salud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Puedes filtrar por usuario si recibes un userId por query param
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const where = userId ? { userId } : {};

    const metrics = await prisma.healthMetrics.findMany({
      where,
      orderBy: { date: "desc" },
      take: 20, // Limita a los últimos 20 registros
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error al obtener métricas de salud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
