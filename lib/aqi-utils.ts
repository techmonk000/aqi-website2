import type { AqiCategory } from "./types"

export function getAqiCategory(value: number): AqiCategory {
  if (value <= 50) return "good"
  if (value <= 100) return "moderate"
  return "unhealthy"
}

export function getAqiColor(value: number, opacity = 1): string {
  if (value <= 50) return `rgba(16, 185, 129, ${opacity})` // emerald-500
  if (value <= 100) return `rgba(245, 158, 11, ${opacity})` // amber-500
  return `rgba(239, 68, 68, ${opacity})` // red-500
}
