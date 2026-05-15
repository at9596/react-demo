import React from "react"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useDashboardMetrics } from "../hooks/useDashboardMetrics"
import { useLiveStats } from "../hooks/useLiveStats"

// ── colour tokens ──────────────────────────────────────────────────────────
const COLORS = {
  processed: "#6366f1",
  failed:    "#f43f5e",
  busy:      "#f59e0b",
  enqueued:  "#10b981",
  scheduled: "#06b6d4",
  retries:   "#a78bfa",
  dead:      "#ef4444",
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1e1e2e 0%, #16161f 100%)",
      border: `1px solid ${color}33`,
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxShadow: `0 0 24px ${color}18`,
      transition: "transform .2s, box-shadow .2s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-3px)"
      e.currentTarget.style.boxShadow = `0 8px 32px ${color}38`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = `0 0 24px ${color}18`
    }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ color: "#9ca3af", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ color, fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
        {value ?? "—"}
      </div>
    </div>
  )
}

// ── Chart card wrapper ─────────────────────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1e1e2e 0%, #16161f 100%)",
      border: "1px solid #ffffff0f",
      borderRadius: 16,
      padding: "24px 28px",
      boxShadow: "0 4px 24px #0008",
    }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600, color: "#e2e8f0" }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

// ── Custom tooltip ─────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "#1e1e2e",
      border: "1px solid #ffffff18",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      color: "#e2e8f0",
    }}>
      <div style={{ marginBottom: 6, color: "#9ca3af" }}>
        {new Date(label).toLocaleTimeString()}
      </div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, display: "inline-block" }} />
          <span style={{ color: "#9ca3af" }}>{p.dataKey}:</span>
          <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const history = useDashboardMetrics()   // time-series snapshots
  const stats   = useLiveStats()          // live summary stats

  const [now, setNow] = React.useState(new Date())
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f17",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: "32px 40px",
    }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{
              width: 10, height: 10, borderRadius: "50%", background: "#10b981",
              boxShadow: "0 0 8px #10b981", display: "inline-block",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ color: "#10b981", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Live</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, background: "linear-gradient(90deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Sidekiq Dashboard
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>Last updated</div>
          <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>{now.toLocaleTimeString()}</div>
          <a href="/sidekiq" target="_blank" style={{
            display: "inline-block", marginTop: 8,
            padding: "5px 14px", borderRadius: 8,
            background: "#1e1e2e", border: "1px solid #6366f133",
            color: "#a78bfa", fontSize: 12, textDecoration: "none",
          }}>
            Native Sidekiq UI ↗
          </a>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 16,
        marginBottom: 32,
      }}>
        <StatCard label="Processed" value={stats?.processed} color={COLORS.processed} icon="⚡" />
        <StatCard label="Failed"    value={stats?.failed}    color={COLORS.failed}    icon="💥" />
        <StatCard label="Enqueued"  value={stats?.enqueued}  color={COLORS.enqueued}  icon="📬" />
        <StatCard label="Scheduled" value={stats?.scheduled} color={COLORS.scheduled} icon="🕐" />
        <StatCard label="Retries"   value={stats?.retries}   color={COLORS.retries}   icon="🔄" />
        <StatCard label="Dead"      value={stats?.dead}      color={COLORS.dead}      icon="💀" />
        <StatCard label="Workers"   value={stats?.workers}   color={COLORS.busy}      icon="👷" />
      </div>

      {/* ── Charts grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>

        {/* Area chart — Processed over time */}
        <ChartCard title="📈 Processed Jobs — History">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={history || []}>
              <defs>
                <linearGradient id="gradProcessed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.processed} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={COLORS.processed} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
              <XAxis dataKey="timestamp" tickFormatter={v => new Date(v).toLocaleTimeString()} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="processed" stroke={COLORS.processed} strokeWidth={2} fill="url(#gradProcessed)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Area chart — Failed over time */}
        <ChartCard title="💥 Failed Jobs — History">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={history || []}>
              <defs>
                <linearGradient id="gradFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={COLORS.failed} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={COLORS.failed} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
              <XAxis dataKey="timestamp" tickFormatter={v => new Date(v).toLocaleTimeString()} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="failed" stroke={COLORS.failed} strokeWidth={2} fill="url(#gradFailed)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ── Full-width: all metrics line chart ── */}
      <ChartCard title="📊 All Metrics — Combined History">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={history || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
            <XAxis dataKey="timestamp" tickFormatter={v => new Date(v).toLocaleTimeString()} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            <Line type="monotone" dataKey="processed"   stroke={COLORS.processed} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="failed"      stroke={COLORS.failed}    strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="busy_workers" stroke={COLORS.busy}     strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Pulse keyframe ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}