import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../lib/api'

export default function LoginPage({ onAuth }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.username || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const user = await login(form)
      onAuth(user)
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        'Login failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <div className="auth-copy">
          <div className="sidebar-brand__badge">Light Gulfstream-inspired system</div>
          <div className="gs-eyebrow text-[var(--muted)]">TestGen AI</div>
          <h1 className="font-heading text-4xl tracking-[-0.05em] text-[var(--text-strong)] md:text-[4rem]">
            Sign in to your test command deck.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Generate, score, heal, and ship test assets from a cleaner workspace that feels modern, bright, and focused.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Credentials</h2>
            <p className="auth-subtitle">Use your username and password.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error ? <div className="auth-error">{error}</div> : null}

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-username">
                Username
              </label>
              <input
                id="login-username"
                className="auth-input"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => update('username', e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className="auth-input"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Continue'}
            </button>
          </form>

          <p className="auth-footer">
            No account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
