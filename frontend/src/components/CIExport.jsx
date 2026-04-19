import { useState } from 'react'
import Card from './Card'
import Button from './Button'

export default function CIExport({ onExport, yaml }) {
  const [framework, setFramework] = useState('pytest')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    try {
      await onExport(framework)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="CI export" subtitle="Generate a GitHub Actions workflow for the selected framework.">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['pytest', 'junit', 'jest'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFramework(f)}
              className={`menu-choice menu-choice--compact ${framework === f ? 'menu-choice--active' : ''}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <div className="flex-1" />
          <Button variant="soft" type="button" onClick={submit} disabled={loading}>
            {loading ? 'Generating…' : 'Export YAML'}
          </Button>
        </div>

        <div className="rounded-[1.4rem] border border-[var(--border)] bg-white/80 p-4">
          <pre className="m-0 max-h-[320px] overflow-auto text-xs leading-6 text-[var(--text-strong)]">
            <code>{yaml || 'Workflow YAML will appear here.'}</code>
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-[var(--text-strong)] underline-offset-4 hover:underline disabled:opacity-40"
            onClick={() => navigator.clipboard.writeText(yaml || '')}
            disabled={!yaml}
          >
            Copy YAML
          </button>
        </div>
      </div>
    </Card>
  )
}
