import { z } from "zod"

// ==== Basic types ====
export const BiologicalSexSchema = z.enum(["male", "female"])
export const ActivityLevelSchema = z.enum(["sedentary", "light", "moderate", "high", "very_high"])
export const WeightGoalSchema = z.enum(["lose", "maintain", "gain"])
export const RiskLevelSchema = z.enum(["low", "moderate", "high"])
export const SeasonSchema = z.enum(["summer", "winter"])
export const MissionTypeSchema = z.enum(["daily", "weekly", "monthly"])

// ==== User Profile and Metrics ====
export const UserProfileSchema = z.object({
  biologicalSex: BiologicalSexSchema,
  age: z.number().int().positive(),
  goal: WeightGoalSchema,
  activityLevel: ActivityLevelSchema,
})

export const BodyMeasurementsSchema = z.object({
  weight: z.number().positive(),
  height: z.number().positive(),
  waist: z.number().positive().optional(),
  hip: z.number().positive().optional(),
  neck: z.number().positive().optional(),
})

export const LifestyleDataSchema = z.object({
  sleepHours: z.number().min(0).max(24).optional(),
  season: SeasonSchema,
})

export const UserMetricsSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int().positive(),
  biologicalSex: BiologicalSexSchema,
  goal: WeightGoalSchema,
  activityLevel: ActivityLevelSchema,
  weight: z.number().positive(),
  height: z.number().positive(),
  waist: z.number().positive().optional(),
  hip: z.number().positive().optional(),
  neck: z.number().positive().optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  season: SeasonSchema,
})

// ==== Health Results ====
export const HealthResultsSchema = z.object({
  bmi: z.number().positive(),
  bmiCategory: z.enum(["underweight", "normal", "overweight", "obese"]),
  whtr: z.number().positive().optional(),
  tdee: z.number().positive(),
  targetCalories: z.number().positive(),
  macros: z.object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
  }),
  riskLevel: RiskLevelSchema,
  advice: z.array(z.string()),
})

// ==== Gamification System ====
export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  unlocked: z.boolean(),
  unlockDate: z.string().optional(),
})

export const MissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  rewardPoints: z.number().int().nonnegative(),
  type: MissionTypeSchema,
})

export const GamificationDataSchema = z.object({
  healthScore: z.number().min(0).max(100),
  points: z.number().nonnegative(),
  streak: z.number().nonnegative(),
  badges: z.array(BadgeSchema),
  missions: z.array(MissionSchema),
})

// ==== Health Progress ====
export const HealthProgressSchema = z.object({
  date: z.string(),
  weight: z.number().positive(),
  waist: z.number().positive().optional(),
  healthScore: z.number().min(0).max(100),
  bmi: z.number().positive(),
})

// ==== Patient Data ====
export const PatientDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().positive(),
  bmi: z.number().positive(),
  whtr: z.number().positive(),
  healthScore: z.number().min(0).max(100),
  riskLevel: RiskLevelSchema,
  lastUpdate: z.string(),
  latestMetrics: UserMetricsSchema,
  progress: z.array(HealthProgressSchema),
  generatedAdvice: z.array(z.string()),
})

// ==== Legacy Health Metrics ====
export const HealthMetricsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.date(),
  profile: UserProfileSchema,
  measurements: BodyMeasurementsSchema,
  lifestyle: LifestyleDataSchema,
  bmi: z.number().positive(),
  whtr: z.number().positive().optional(),
  tdee: z.number().positive(),
  targetCalories: z.number().positive(),
  macros: z.object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
  }),
  riskLevel: RiskLevelSchema,
  healthScore: z.number().min(0).max(100),
})

// ==== Meal Planning ====
export const MealSchema = z.object({
  name: z.string(),
  description: z.string(),
  calories: z.number().positive(),
  macros: z.object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
  }),
  ingredients: z.array(z.string()),
  preparation: z.string(),
  timeToPrepare: z.string(),
})

export const DailyMealPlanSchema = z.object({
  day: z.string(),
  meals: z.object({
    breakfast: MealSchema,
    morningSnack: MealSchema.optional(),
    lunch: MealSchema,
    afternoonSnack: MealSchema.optional(),
    dinner: MealSchema,
    eveningSnack: MealSchema.optional(),
  }),
  totalCalories: z.number().positive(),
  totalMacros: z.object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
  }),
})

export const NutritionalPlanSchema = z.object({
  userId: z.string(),
  goal: WeightGoalSchema,
  targetCalories: z.number().positive(),
  dailyMealPlans: z.array(DailyMealPlanSchema),
  recommendations: z.object({
    general: z.array(z.string()),
    specific: z.array(z.string()),
    seasonal: z.array(z.string()),
  }),
  createdAt: z.date(),
  validUntil: z.date(),
})

// ==== Types inferred from schemas ====
export type UserProfile = z.infer<typeof UserProfileSchema>
export type BodyMeasurements = z.infer<typeof BodyMeasurementsSchema>
export type LifestyleData = z.infer<typeof LifestyleDataSchema>
export type UserMetrics = z.infer<typeof UserMetricsSchema>
export type HealthResults = z.infer<typeof HealthResultsSchema>
export type Badge = z.infer<typeof BadgeSchema>
export type Mission = z.infer<typeof MissionSchema>
export type GamificationData = z.infer<typeof GamificationDataSchema>
export type HealthProgress = z.infer<typeof HealthProgressSchema>
export type PatientData = z.infer<typeof PatientDataSchema>
export type HealthMetrics = z.infer<typeof HealthMetricsSchema>
export type Meal = z.infer<typeof MealSchema>
export type DailyMealPlan = z.infer<typeof DailyMealPlanSchema>
export type NutritionalPlan = z.infer<typeof NutritionalPlanSchema>
