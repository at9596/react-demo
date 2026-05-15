import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export default function ProcessedJobsChart({ data }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="text-white text-xl mb-4">
        Processed Jobs
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString()
            }
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="processed"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}