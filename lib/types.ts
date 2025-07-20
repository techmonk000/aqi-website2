export interface AqiData {
  location: string;
  current: {
    value: number;
    timestamp: string;
  };
  predicted: {
    value: number;
    timestamp: string;
  };
  pm25: {
    value: number;
  };
  pm10: {
    value: number;
  };
}
export type AqiCategory = "good" | "moderate" | "unhealthy"

