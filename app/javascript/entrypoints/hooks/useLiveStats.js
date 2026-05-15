import { useEffect, useState } from "react"
import { fetchDashboardMetrics } from "../api/dashboard"

export function useLiveStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  async function load() {
    try {
      const data = await fetchDashboardMetrics()
      setStats(data)
    } catch (e) {
      console.error("Failed to load stats", e)
    }
  }

  return stats
}
