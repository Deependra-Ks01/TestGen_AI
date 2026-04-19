import { useState } from 'react'
import { exportCiWorkflow } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import CIExport from '../components/CIExport'

export default function CIExportPage({ tests }) {
  const [workflowYaml, setWorkflowYaml] = useState('')
  const { grantXP, tryUnlock } = useGame()

  async function onExport(framework) {
    const data = await exportCiWorkflow({ framework, tests })
    setWorkflowYaml(data.workflow_yaml || '')
    grantXP(XP_REWARDS.ci_export)
    tryUnlock('pipeline_master')
  }

  return (
    <>
      <div className="dashboard-hero">
        <section className="hero-card fade-in">
          <div className="hero-card__grid">
            <div className="hero-card__copy">
              <div className="gs-eyebrow">CI export</div>
              <h2 className="hero-card__title">Turn generated tests into ready-to-run pipeline YAML.</h2>
              <p className="hero-card__text">
                Export a cleaner GitHub Actions workflow from the same command deck without losing context between generation and delivery.
              </p>
            </div>
            <div className="hero-card__meta">
              <div className="hero-stat">
                <div className="hero-stat__label">Formats</div>
                <div className="hero-stat__value">Pytest · JUnit · Jest</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat__label">Pipeline</div>
                <div className="hero-stat__value">{workflowYaml ? 'Prepared' : 'Idle'}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CIExport onExport={onExport} yaml={workflowYaml} />
    </>
  )
}
