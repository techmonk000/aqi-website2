import AqiDashboard from "@/components/aqi-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-800">Air Quality Index Dashboard</h1>
        <AqiDashboard />
      </div>
    </main>
  )
}
