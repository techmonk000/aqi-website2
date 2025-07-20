import type { AqiData } from "./types"

export const dummyAqiData: AqiData = {
  location: "Kolkata, WB (fallback)",
  current: {
    value: 42,
    timestamp: new Date().toISOString(),
  },
  // pm25: {
  //   value: 12,
  // },
  // pm10: {
  //   value: 25,
  // },
}
