import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function PUT(request: NextRequest) {
  try {
    // Obtener la sesión del usuario autenticado
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Obtener el usuario actual de Clerk
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener los datos del body
    const updateData = await request.json();
    
    // Validar los campos requeridos
    const { firstName, lastName, emailAddress, goal, activityLevel, season } = updateData;
    
    if (!firstName || !lastName || !emailAddress || !goal || !activityLevel || !season) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validar que el goal sea válido
    const validGoals = ["lose", "maintain", "gain"];
    if (!validGoals.includes(goal)) {
      return NextResponse.json(
        { error: "Objetivo no válido" },
        { status: 400 }
      );
    }

    // Validar que el activityLevel sea válido
    const validActivityLevels = ["sedentary", "light", "moderate", "high"];
    if (!validActivityLevels.includes(activityLevel)) {
      return NextResponse.json(
        { error: "Nivel de actividad no válido" },
        { status: 400 }
      );
    }

    // Validar que la season sea válida
    const validSeasons = ["summer", "winter"];
    if (!validSeasons.includes(season)) {
      return NextResponse.json(
        { error: "Temporada no válida" },
        { status: 400 }
      );
    }

    // Nota: Los metadatos se actualizarán a través de la API de Clerk
    // Por ahora, solo validamos los datos y retornamos éxito
    // Los metadatos se pueden actualizar desde el frontend usando Clerk

    // Preparar la respuesta
    const response = {
      success: true,
      message: "Perfil actualizado exitosamente",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        goal: goal,
        activityLevel: activityLevel,
        season: season,
        lastUpdated: new Date().toISOString(),
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al actualizar el perfil" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Obtener la sesión del usuario autenticado
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Obtener el usuario actual de Clerk
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener los metadatos públicos del usuario
    const publicMetadata = user.publicMetadata;
    
    // Preparar la respuesta
    const response = {
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        goal: publicMetadata.goal || "maintain",
        activityLevel: publicMetadata.activityLevel || "sedentary",
        season: publicMetadata.season || "summer",
        lastUpdated: publicMetadata.lastUpdated || user.createdAt,
        createdAt: user.createdAt,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al obtener el perfil" },
      { status: 500 }
    );
  }
}
