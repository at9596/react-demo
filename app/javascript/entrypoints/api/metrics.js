export async function fetchMetricsHistory() {
  const response = await fetch("/api/v1/metrics/history")

  if (!response.ok) {
    throw new Error("Failed to fetch metrics")
  }

  return response.json()
}