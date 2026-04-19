import { useState } from 'react'
import { healFailingTest } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import HealPanel from '../components/HealPanel'

export default function HealPage({ provider }) {
  const [healResult, setHealResult] = useState('')
  const { grantXP, tryUnlock } = useGame()

  async function onHeal(failing_test, error_msg) {
    const data = await healFailingTest({ failing_test, error_msg, provider })
    setHealResult(data.fixed_test || '')
    grantXP(XP_REWARDS.heal)
    tryUnlock('bug_healer')
  }

  return (
    <>
      <div className="dashboard-hero">
        <section className="hero-card fade-in">
          <div className="hero-card__grid">
            <div className="hero-card__copy">
              <div className="gs-eyebrow">Self-heal</div>
              <h2 className="hero-card__title">Repair broken tests from failure context, fast.</h2>
              <p className="hero-card__text">
                Feed the failing case and stack trace into a calmer workspace designed for diagnostics and recovery.
              </p>
            </div>
            <div className="hero-card__meta">
              <div className="hero-stat">
                <div className="hero-stat__label">Provider</div>
                <div className="hero-stat__value">{provider === 'api' ? 'Cloud API' : 'Local runtime'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Status</div>
                <div className="hero-stat__value">{healResult ? 'Recovered' : 'Awaiting input'}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <HealPanel onHeal={onHeal} result={healResult} />
    </>
  )
}
