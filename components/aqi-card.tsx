"use client"

import { useState, useEffect } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { getAqiCategory, getAqiColor } from "@/lib/aqi-utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react"

interface AqiCardProps {
  title: string
  value: number
  unit?: string
  location?: string
  timestamp?: string
}

const aqiValueVariants = cva(
  "text-5xl font-bold transition-all duration-500 ease-in-out flex items-center justify-center gap-2",
  {
    variants: {
      category: {
        good: "text-emerald-500",
        moderate: "text-amber-500",
        unhealthy: "text-red-500",
      },
    },
    defaultVariants: {
      category: "good",
    },
  },
)

const aqiBadgeVariants = cva("transition-all duration-500 ease-in-out", {
  variants: {
    category: {
      good: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      moderate: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      unhealthy: "bg-red-100 text-red-800 hover:bg-red-200",
    },
  },
  defaultVariants: {
    category: "good",
  },
})

function getAqiEmojiAndMessage(aqi: number) {
  if (aqi <= 50) {
    return {
      emoji: "😄",
      message: "Air quality is considered satisfactory and poses little or no risk.",
    }
  } else if (aqi <= 100) {
    return {
      emoji: "😑",
      message: "Air quality is acceptable; however, there may be a risk for sensitive individuals.",
    }
  } else {
    return {
      emoji: "😷",
      message: "Everyone may experience health effects; sensitive groups may experience more serious effects.",
    }
  }
}

export default function AqiCard({ title, value, unit = "", location, timestamp }: AqiCardProps) {
  const [animate, setAnimate] = useState(false)
  const category = getAqiCategory(value)
  const bgColor = getAqiColor(value, 0.1)
  const { emoji, message } = getAqiEmojiAndMessage(value)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <Card
      className={`overflow-hidden transition-all duration-500 border-t-4 ${animate ? "scale-105" : "scale-100"}`}
      style={{ borderTopColor: getAqiColor(value) }}
    >
      <div className="absolute inset-0 opacity-20 rounded-xl" style={{ backgroundColor: bgColor }}></div>

      <CardHeader className="relative">
        <CardTitle className="flex justify-between items-center">
          <span>{title} {emoji}</span>
          <Badge variant="outline" className={cn(aqiBadgeVariants({ category }))}>
            {category === "good" && <CheckCircle className="h-3 w-3 mr-1" />}
            {category === "moderate" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {category === "unhealthy" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {category}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className={cn(aqiValueVariants({ category }))}>
          {value}
          <span className="text-base font-normal text-gray-500">{unit}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
      </CardContent>

      <CardFooter className="relative text-sm text-gray-500 flex flex-col items-start gap-1">
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        )}
        {timestamp && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{new Date(timestamp).toLocaleTimeString()}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
