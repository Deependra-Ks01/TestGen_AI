import { useGame } from '../lib/GameContext'
import { ACHIEVEMENTS } from '../lib/gameState'

export default function TrophiesPage() {
  const { gameState } = useGame()
  const totalUnlocked = gameState.achievements.length
  const total = Object.keys(ACHIEVEMENTS).length
  const pct = total ? Math.round((totalUnlocked / total) * 100) : 0

  return (
    <>
      <div className="dashboard-hero">
        <section className="hero-card fade-in">
          <div className="hero-card__grid">
            <div className="hero-card__copy">
              <div className="gs-eyebrow">Progress</div>
              <h2 className="hero-card__title">Track momentum across the full testing workflow.</h2>
              <p className="hero-card__text">
                Achievements now sit inside the same bright system, with clearer progress cues and a less gamey, more premium presentation.
              </p>
            </div>
            <div className="hero-card__meta">
              <div className="hero-stat">
                <div className="hero-stat__label">Unlocked</div>
                <div className="hero-stat__value">{totalUnlocked}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Completion</div>
                <div className="hero-stat__value">{pct}%</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Remaining</div>
                <div className="hero-stat__value">{Math.max(0, total - totalUnlocked)}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="glass-card mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--muted)]"
            aria-hidden
          >
            {pct === 100 ? 'Done' : `${pct}%`}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-medium text-[var(--text-strong)]">
              {totalUnlocked}
              <span className="text-base font-normal text-[var(--muted)]"> / {total}</span>
            </div>
            <div className="text-sm text-[var(--muted)]">
              {totalUnlocked === total ? 'All milestones completed.' : `${total - totalUnlocked} remaining.`}
            </div>
          </div>
          <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-[var(--border)] sm:block">
            <div
              className="h-full rounded-full bg-[var(--accent-solid)] transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.values(ACHIEVEMENTS).map((ach) => {
          const unlocked = gameState.achievements.includes(ach.id)
          return (
            <div
              key={ach.id}
              className={`glass-card flex flex-col ${unlocked ? '' : 'opacity-40'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border text-[0.7rem] font-semibold ${
                    unlocked
                      ? 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-strong)]'
                      : 'border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--muted)]'
                  }`}
                >
                  {ach.abbr}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-sm font-medium text-[var(--text-strong)]">{ach.name}</div>
                  <div className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{ach.desc}</div>
                  <div
                    className={`mt-3 inline-flex rounded-md border px-2 py-1 text-[0.65rem] font-medium ${
                      unlocked
                        ? 'border-[var(--border-strong)] text-[var(--success)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    {unlocked ? `+${ach.xp} XP` : 'Locked'}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
