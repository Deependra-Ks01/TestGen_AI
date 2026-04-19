import { useState } from 'react'
import Card from './Card'
import Button from './Button'

const DEFAULT_FAILING_TEST =
  'def test_divide_by_zero():\n    assert divide(10, 0) == 0\n'
const DEFAULT_ERROR_MSG = 'ValueError: Cannot divide by zero'

export default function HealPanel({ onHeal, result }) {
  const [failingTest, setFailingTest] = useState(DEFAULT_FAILING_TEST)
  const [errorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)
  const [loading, setLoading] = useState(false)

  function handleFailingTestChange(value) {
    setFailingTest(value)
    if (errorMsg === DEFAULT_ERROR_MSG) {
      setErrorMsg('')
    }
  }

  async function submit() {
    setLoading(true)
    try {
      await onHeal(failingTest, errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Self-heal" subtitle="Paste a failing test and the error output to request a fixed version.">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <div className="space-y-3">
          <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Failing test</div>
          <textarea
            className="panel-textarea"
            value={failingTest}
            onChange={(e) => handleFailingTestChange(e.target.value)}
            placeholder="Paste the failing test code…"
          />
          <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Error message</div>
          <textarea
            className="panel-textarea panel-textarea--short"
            value={errorMsg}
            onChange={(e) => setErrorMsg(e.target.value)}
            placeholder="Error message or stack trace…"
          />
          <Button variant="soft" type="button" onClick={submit} disabled={loading}>
            {loading ? 'Running…' : 'Fix test'}
          </Button>
        </div>

        <div className="rounded-[1.4rem] border border-[var(--border)] p-4" style={{ background: 'rgba(255,255,255,0.74)' }}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-medium text-[var(--text-strong)]">Result</div>
            <button
              type="button"
              className="text-sm font-medium text-[var(--text-strong)] underline-offset-4 hover:underline disabled:opacity-40"
              onClick={() => navigator.clipboard.writeText(result || '')}
              disabled={!result}
            >
              Copy
            </button>
          </div>
          <pre
            className="m-0 max-h-[280px] overflow-auto rounded-[1.1rem] border border-[var(--border)] bg-white/85 p-3 text-xs leading-6 text-[var(--text-strong)]"
          >
            <code>{result || 'Fixed test will appear here.'}</code>
          </pre>
        </div>
      </div>
    </Card>
  )
}
