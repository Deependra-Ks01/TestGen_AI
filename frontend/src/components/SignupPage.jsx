import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../lib/api'

export default function SignupPage({ onAuth }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.username || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const user = await signup(form)
      onAuth(user)
    } catch (err) {
      const data = err?.response?.data
      if (data) {
        const messages = []
        for (const key of Object.keys(data)) {
          const val = data[key]
          if (Array.isArray(val)) messages.push(val.join(' '))
          else if (typeof val === 'string') messages.push(val)
        }
        setError(messages.join(' ') || 'Signup failed.')
      } else {
        setError('Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-layout">
        <div className="auth-copy">
          <div className="sidebar-brand__badge">Modern interactive onboarding</div>
          <div className="gs-eyebrow text-[var(--muted)]">TestGen AI</div>
          <h1 className="font-heading text-4xl tracking-[-0.05em] text-[var(--text-strong)] md:text-[4rem]">
            Create your workspace.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Set up access to a lighter, more responsive environment for generation, review, remediation, and CI delivery.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Register</h2>
            <p className="auth-subtitle">Choose a username, email, and password.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error ? <div className="auth-error">{error}</div> : null}

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-username">
                Username
              </label>
              <input
                id="signup-username"
                className="auth-input"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => update('username', e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                className="auth-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                className="auth-input"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
