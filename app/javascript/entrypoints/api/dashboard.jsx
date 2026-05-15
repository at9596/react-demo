export async function fetchDashboardMetrics() {
  const response = await fetch("/api/v1/dashboard/metrics")
  return response.json()
}