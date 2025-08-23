import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Enums según schema.prisma
const BiologicalSex = ["male", "female"];
const ActivityLevel = ["sedentary", "light", "moderate", "high"];
const WeightGoal = ["lose", "maintain", "gain"];
const RiskLevel = ["low", "moderate", "high"];
const Season = ["summer", "winter"];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

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

    // Validación estricta según schema.prisma
    if (
      !userId ||
      !BiologicalSex.includes(biologicalSex) ||
      typeof age !== "number" ||
      !WeightGoal.includes(goal) ||
      !ActivityLevel.includes(activityLevel) ||
      typeof weight !== "number" ||
      typeof height !== "number" ||
      typeof sleepHours !== "number" ||
      !Season.includes(season) ||
      typeof bmi !== "number" ||
      (typeof whtr !== "number" && typeof whtr !== "undefined") ||
      typeof tdee !== "number" ||
      typeof targetCalories !== "number" ||
      typeof carbs !== "number" ||
      typeof protein !== "number" ||
      typeof fat !== "number" ||
      !RiskLevel.includes(riskLevel) ||
      !Number.isInteger(healthScore)
    ) {
      return NextResponse.json(
        { error: "Datos incompletos o inválidos" },
        { status: 400 }
      );
    }

    // Opcionales: waist, hip, neck pueden ser undefined o number
    if (
      (typeof waist !== "undefined" && typeof waist !== "number") ||
      (typeof hip !== "undefined" && typeof hip !== "number") ||
      (typeof neck !== "undefined" && typeof neck !== "number")
    ) {
      return NextResponse.json(
        { error: "Medidas opcionales inválidas" },
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
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const where = userId ? { userId } : {};

    const metrics = await prisma.healthMetrics.findMany({
      where,
      orderBy: { date: "desc" },
      take: 20,
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
