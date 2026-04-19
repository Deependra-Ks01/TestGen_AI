import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import Card from './Card'

export default function QualityScore({ scores }) {
  const data = [
    { metric: 'Coverage', value: scores?.coverage ?? 0 },
    { metric: 'Edge cases', value: scores?.edge_cases ?? 0 },
    { metric: 'Security', value: scores?.security ?? 0 },
    { metric: 'Readability', value: scores?.readability ?? 0 },
  ]

  const overall = scores?.overall ?? 0
  const rankColor =
    overall >= 90 ? 'var(--gold-bright)' : overall >= 70 ? 'var(--text-strong)' : overall >= 50 ? 'var(--text)' : 'var(--muted)'
  const rankLabel = overall >= 90 ? 'S' : overall >= 70 ? 'A' : overall >= 50 ? 'B' : overall > 0 ? 'C' : '—'

  return (
    <Card
      title="Quality breakdown"
      subtitle="Scores from the latest generation across four dimensions."
      right={
        <div className="flex items-center gap-3">
          <div
            className="rounded-[1.1rem] border border-[var(--border)] px-3 py-2 text-sm"
            style={{ background: 'rgba(255,255,255,0.75)' }}
          >
            Overall{' '}
            <span className="font-semibold" style={{ color: rankColor }}>
              {scores?.overall ?? '—'}
            </span>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[1rem] text-sm font-semibold"
            style={{
              background: 'rgba(121, 185, 209, 0.12)',
              border: '1px solid var(--border-strong)',
              color: rankColor,
            }}
          >
            {rankLabel}
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
        <div className="h-[260px] min-w-0 rounded-[1.4rem] border border-[var(--border)] p-3" style={{ background: 'rgba(255,255,255,0.72)' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(31, 110, 169, 0.15)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#537089', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="var(--brand)"
                fill="rgba(121, 185, 209, 0.18)"
                strokeWidth={1.8}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[1.4rem] border border-[var(--border)] p-4" style={{ background: 'rgba(255,255,255,0.72)' }}>
          <div className="text-sm font-medium text-[var(--text-strong)]">Suggestions</div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
            {(scores?.suggestions || ['Generate tests to see improvement suggestions here.']).slice(0, 4).map((s, i) => (
              <li key={i} className="rounded-[1rem] border border-[var(--border)] bg-white/80 px-3 py-2.5">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
