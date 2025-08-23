export type BiologicalSex = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "high";
export type WeightGoal = "lose" | "maintain" | "gain";
export type RiskLevel = "low" | "moderate" | "high";

export interface UserProfile {
  biologicalSex: BiologicalSex;
  age: number;
  goal: WeightGoal;
  activityLevel: ActivityLevel;
}

export interface BodyMeasurements {
  weight: number; // kg
  height: number; // cm
  waist?: number; // cm
  hip?: number; // cm
  neck?: number; // cm
}

export interface LifestyleData {
  sleepHours: number;
  season: "summer" | "winter";
}

export interface HealthMetrics {
  id: string;
  userId: string;
  date: Date;
  profile: UserProfile;
  measurements: BodyMeasurements;
  lifestyle: LifestyleData;
  // Calculated values
  bmi: number;
  whtr?: number; // Waist-to-height ratio
  tdee: number;
  targetCalories: number;
  macros: {
    carbs: number; // grams
    protein: number; // grams
    fat: number; // grams
  };
  riskLevel: RiskLevel;
  healthScore: number; // 0-100
}

export interface GamificationData {
  healthScore: number;
  points: number;
  streak: number;
  badges: string[];
  missions: {
    recordMetrics: boolean;
    sleep7Hours: boolean;
    reachCalorieGoal: boolean;
  };
}

// Nuevos tipos para el plan nutricional
export interface Meal {
  name: string;
  description: string;
  calories: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  ingredients: string[];
  preparation: string;
  timeToPrepare: string; // "15 min", "30 min", etc.
}

export interface DailyMealPlan {
  day: string;
  meals: {
    breakfast: Meal;
    morningSnack?: Meal;
    lunch: Meal;
    afternoonSnack?: Meal;
    dinner: Meal;
    eveningSnack?: Meal;
  };
  totalCalories: number;
  totalMacros: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

export interface NutritionalPlan {
  userId: string;
  goal: WeightGoal;
  targetCalories: number;
  dailyMealPlans: DailyMealPlan[];
  recommendations: {
    general: string[];
    specific: string[];
    seasonal: string[];
  };
  createdAt: Date;
  validUntil: Date;
}

// Demo data for UI
export const DEMO_HEALTH_METRICS: HealthMetrics = {
  id: "demo-1",
  userId: "demo-user",
  date: new Date(),
  profile: {
    biologicalSex: "male",
    age: 32,
    goal: "lose",
    activityLevel: "moderate",
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
    season: "winter",
  },
  bmi: 27.3,
  whtr: 0.49,
  tdee: 2550,
  targetCalories: 2150,
  macros: {
    carbs: 269,
    protein: 188,
    fat: 72,
  },
  riskLevel: "moderate",
  healthScore: 73,
};

export const DEMO_GAMIFICATION: GamificationData = {
  healthScore: 73,
  points: 1250,
  streak: 5,
  badges: ["first-metric", "healthy-week"],
  missions: {
    recordMetrics: true,
    sleep7Hours: false,
    reachCalorieGoal: true,
  },
};
