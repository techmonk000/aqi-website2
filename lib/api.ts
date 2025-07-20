
import type { AqiData } from "./types"

export async function fetchAqiData(): Promise<AqiData> {
  const response = await fetch("http://127.0.0.1:5000/predict")

  if (!response.ok) {
    throw new Error("Failed to fetch AQI data")
  }

  const result = await response.json()

  return {
    location: "Localhost",
    current: {
      value: result.predicted_aqi,
      timestamp: new Date().toISOString()
    },
    predicted: {
      value: result.predicted_aqi,
      timestamp: new Date().toISOString()
    },
    pm25: {
      value: 0 
    },
    pm10: {
      value: 0 
    }
  }
}
