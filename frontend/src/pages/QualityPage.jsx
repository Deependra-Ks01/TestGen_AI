import { Link } from 'react-router-dom'
import QualityScore from '../components/QualityScore'

export default function QualityPage({ scores }) {
  return (
    <>
      <div className="dashboard-hero">
        <section className="hero-card fade-in">
          <div className="hero-card__grid">
            <div className="hero-card__copy">
              <div className="gs-eyebrow">Quality</div>
              <h2 className="hero-card__title">See quality signals as a live review surface.</h2>
              <p className="hero-card__text">
                Coverage, edge cases, security, and readability are presented in a cleaner score deck with guidance for the next iteration.
              </p>
            </div>
            <div className="hero-card__meta">
              <div className="hero-stat">
                <div className="hero-stat__label">Overall</div>
                <div className="hero-stat__value">{scores?.overall ?? '—'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Coverage</div>
                <div className="hero-stat__value">{scores?.coverage ?? '—'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Security</div>
                <div className="hero-stat__value">{scores?.security ?? '—'}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <QualityScore scores={scores} />

      <div className="mt-6 glass-card">
        <div className="text-sm text-[var(--muted)]">
          Generate tests on the{' '}
          <Link
            to="/generate"
            className="font-semibold text-[var(--gold-bright)] underline-offset-[6px] decoration-[rgba(196,165,90,0.45)] hover:text-[var(--accent-muted)]"
          >
            Generate
          </Link>{' '}
          page first; scores appear here automatically.
        </div>
      </div>
    </>
  )
}
