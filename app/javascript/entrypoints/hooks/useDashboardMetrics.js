import { useEffect, useState } from "react"
import { fetchMetricsHistory } from "../api/metrics"

export function useDashboardMetrics() {
  const [data, setData] = useState(null)

  useEffect(() => {
    load()

    const interval = setInterval(load, 5000)

    return () => clearInterval(interval)
  }, [])

  async function load() {
    const data = await fetchMetricsHistory()
    setData(data)
  }

  return data
}