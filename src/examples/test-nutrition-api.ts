// Ejemplo de uso de la API de Planes Nutricionales
// Este archivo muestra cómo hacer las llamadas a los endpoints
// Usando la nueva librería @google/genai

// Datos de ejemplo para probar la API
export const EXAMPLE_USER_DATA = {
  profile: {
    biologicalSex: "male" as const,
    age: 32,
    goal: "lose" as const,
    activityLevel: "moderate" as const,
  },
  measurements: {
    weight: 78.5,
    height: 175,
    waist: 85,
    hip: 98,
    neck: 38,
  },
  lifestyle: {
    sleepHours: 7.5,
    season: "winter" as const,
  },
};

// Función para probar el endpoint de métricas de salud
export async function testHealthMetrics() {
  try {
    const response = await fetch('/api/health-metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(EXAMPLE_USER_DATA),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const healthMetrics = await response.json();
    console.log('Métricas de salud calculadas:', healthMetrics);
    return healthMetrics;
  } catch (error) {
    console.error('Error al obtener métricas de salud:', error);
    throw error;
  }
}

// Función para probar el endpoint de plan nutricional
export async function testNutritionPlan(healthMetrics: any) {
  try {
    const response = await fetch('/api/nutrition-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthMetrics),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const nutritionPlan = await response.json();
    console.log('Plan nutricional generado:', nutritionPlan);
    return nutritionPlan;
  } catch (error) {
    console.error('Error al generar plan nutricional:', error);
    throw error;
  }
}

// Función para probar ambos endpoints en secuencia
export async function testCompleteFlow() {
  try {
    console.log('🚀 Iniciando prueba de la API de nutrición...');
    
    // Paso 1: Calcular métricas de salud
    console.log('📊 Calculando métricas de salud...');
    const healthMetrics = await testHealthMetrics();
    
    // Paso 2: Generar plan nutricional
    console.log('🍽️ Generando plan nutricional...');
    const nutritionPlan = await testNutritionPlan(healthMetrics);
    
    console.log('✅ Flujo completo exitoso!');
    return { healthMetrics, nutritionPlan };
  } catch (error) {
    console.error('❌ Error en el flujo completo:', error);
    throw error;
  }
}

// Ejemplo de uso en el navegador
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador
  (window as any).testNutritionAPI = {
    testHealthMetrics,
    testNutritionPlan,
    testCompleteFlow,
    EXAMPLE_USER_DATA,
  };
  
  console.log('🧪 API de nutrición disponible en window.testNutritionAPI');
  console.log('💡 Usa testCompleteFlow() para probar todo el flujo');
}

// Ejemplo de uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testHealthMetrics,
    testNutritionPlan,
    testCompleteFlow,
    EXAMPLE_USER_DATA,
  };
}
