import { useState } from 'react'
import { generateTests } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import InputPanel from '../components/InputPanel'
import OutputPanel from '../components/OutputPanel'

export default function GeneratePage({ provider, setLastSessionId, tests, setTests, setScores }) {
  const [loading, setLoading] = useState(false)
  const { grantXP, tryUnlock, mutateGame, gameState } = useGame()

  async function onGenerate(input, type, mode, testLevel) {
    setLoading(true)
    try {
      const data = await generateTests({
        input,
        type,
        mode,
        test_level: testLevel,
        provider,
      })
      setTests(data.tests)
      setScores(data.scores)
      setLastSessionId(data.id)

      grantXP(XP_REWARDS.generate)
      mutateGame((s) => ({ ...s, genCount: (s.genCount || 0) + 1 }))
      tryUnlock('first_blood')
      if (mode === 'white_box') tryUnlock('white_hat')

      const updatedTests = data.tests || {}
      mutateGame((prev) => {
        const fws = { ...prev.frameworks }
        if (updatedTests.pytest) fws.pytest = true
        if (updatedTests.junit) fws.junit = true
        if (updatedTests.jest) fws.jest = true
        return { ...prev, frameworks: fws }
      })

      setTimeout(() => {
        const gs = gameState
        const fws = { ...gs.frameworks }
        if (updatedTests.pytest) fws.pytest = true
        if (updatedTests.junit) fws.junit = true
        if (updatedTests.jest) fws.jest = true
        if (fws.pytest && fws.junit && fws.jest) tryUnlock('triple_threat')
      }, 300)

      setTimeout(() => {
        if ((gameState.genCount || 0) + 1 >= 5) tryUnlock('five_gens')
      }, 500)

      if (data.scores?.overall >= 90) {
        setTimeout(() => tryUnlock('perfectionist'), 600)
      }
    } finally {
      setLoading(false)
    }
  }

  function onFileUpload() {
    tryUnlock('code_upload')
  }

  return (
    <>
      <div className="dashboard-hero">
        <section className="hero-card fade-in">
          <div className="hero-card__grid">
            <div className="hero-card__copy">
              <div className="gs-eyebrow">Generate</div>
              <h2 className="hero-card__title">Build test suites from raw inputs in one interactive lane.</h2>
              <p className="hero-card__text">
                Move from source, API contract, or story prompt to structured test output with a brighter, more guided control surface.
              </p>
            </div>
            <div className="hero-card__meta">
              <div className="hero-stat">
                <div className="hero-stat__label">Provider</div>
                <div className="hero-stat__value">{provider === 'api' ? 'Cloud API' : 'Local runtime'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Session</div>
                <div className="hero-stat__value">{loading ? 'Running' : 'Ready'}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Frameworks</div>
                <div className="hero-stat__value">Pytest · JUnit · Jest</div>
              </div>
            </div>
          </div>
        </section>

        <aside className="hero-sidecard fade-in fade-in-delay-1">
          <div className="hero-sidecard__row">
            <div>
              <div className="hero-sidecard__label">Last run</div>
              <div className="hero-sidecard__value">
                {Object.values(tests || {}).some(Boolean) ? 'Output available' : 'Not yet run'}
              </div>
            </div>
            <div className="hero-sidecard__value">{loading ? 'Generating…' : 'Standby'}</div>
          </div>
          <div className="hero-sidecard__row">
            <div>
              <div className="hero-sidecard__label">Current output</div>
              <div className="hero-sidecard__value">
                {Object.values(tests || {}).some(Boolean) ? 'Artifacts loaded' : 'No generated tests'}
              </div>
            </div>
          </div>
          <div className="hero-sidecard__row">
            <div>
              <div className="hero-sidecard__label">Flow</div>
              <div className="hero-sidecard__value">Input to export</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <InputPanel onGenerate={onGenerate} loading={loading} onFileUpload={onFileUpload} />
        <OutputPanel tests={tests} />
      </div>
    </>
  )
}
