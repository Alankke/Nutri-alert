// Basic types
export type BiologicalSex = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "high" | "very_high";
export type WeightGoal = "lose" | "maintain" | "gain";
export type RiskLevel = "low" | "moderate" | "high";
export type Season = "summer" | "winter";
export type MissionType = "daily" | "weekly" | "monthly";

// User Profile and Metrics
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
  sleepHours?: number;
  season: Season;
}

export interface UserMetrics {
  id: string;
  name: string;
  age: number;
  biologicalSex: BiologicalSex;
  goal: WeightGoal;
  activityLevel: ActivityLevel;
  weight: number; // kg
  height: number; // cm
  waist?: number; // cm
  hip?: number; // cm
  neck?: number; // cm
  sleepHours?: number;
  season: Season;
}

// Health Results and Calculations
export interface HealthResults {
  bmi: number;
  bmiCategory: "underweight" | "normal" | "overweight" | "obese";
  whtr?: number; // Waist-to-height ratio
  tdee: number; // Total Daily Energy Expenditure
  targetCalories: number;
  macros: {
    carbs: number; // grams
    protein: number; // grams
    fat: number; // grams
  };
  riskLevel: RiskLevel;
  advice: string[];
}

// Gamification System
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockDate?: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  rewardPoints: number;
  type: MissionType;
}

export interface GamificationData {
  healthScore: number; // 0-100
  points: number;
  streak: number;
  badges: Badge[];
  missions: Mission[];
}

// Health Progress Tracking
export interface HealthProgress {
  date: string;
  weight: number;
  waist?: number;
  healthScore: number;
  bmi: number;
}

// Patient Data for Medical Dashboard
export interface PatientData {
  id: string;
  name: string;
  age: number;
  bmi: number;
  whtr: number;
  healthScore: number;
  riskLevel: RiskLevel;
  lastUpdate: string;
  latestMetrics: UserMetrics;
  progress: HealthProgress[];
  generatedAdvice: string[];
}

// Legacy Health Metrics (keeping for backward compatibility)
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

// Meal Planning System
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
  badges: [
    {
      id: "1",
      name: "First Step",
      description: "Completed your first assessment",
      icon: "🎯",
      unlocked: true,
      unlockDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Consistent",
      description: "7 consecutive days recording metrics",
      icon: "🔥",
      unlocked: true,
      unlockDate: "2024-02-01"
    }
  ],
  missions: [
    {
      id: "1",
      name: "Record Metrics",
      description: "Update your body measurements",
      completed: true,
      rewardPoints: 50,
      type: "daily"
    },
    {
      id: "2",
      name: "Sleep ≥7h",
      description: "Rest at least 7 hours tonight",
      completed: false,
      rewardPoints: 30,
      type: "daily"
    }
  ],
};
