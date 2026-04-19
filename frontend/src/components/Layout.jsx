import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import AchievementToast from './AchievementToast'
import XPBar from './XPBar'
import { useGame } from '../lib/GameContext'
import { getLevelInfo } from '../lib/gameState'

const navItems = [
  { to: '/generate', label: 'Generate', hint: 'Tests from code, APIs, or stories.' },
  { to: '/quality', label: 'Quality', hint: 'Latest scoring breakdown.' },
  { to: '/heal', label: 'Self-heal', hint: 'Repair failing tests.' },
  { to: '/ci-export', label: 'CI export', hint: 'GitHub Actions workflows.' },
  { to: '/trophies', label: 'Achievements', hint: 'Milestones and progress.' },
]

export default function Layout({ user, onLogout, provider, setProvider, lastSessionId }) {
  const navigate = useNavigate()
  const { gameState, currentToast, processToastQueue } = useGame()
  const levelInfo = getLevelInfo(gameState.xp)
  const initials = user.username.slice(0, 2).toUpperCase()

  function handleLogout() {
    onLogout()
    navigate('/login')
  }

  return (
    <>
      <AchievementToast achievement={currentToast} onDone={processToastQueue} />

      <div className="app-shell text-[var(--text)]">
        <div className="app-grid">
          <aside className="app-sidebar fade-in">
            <div className="sidebar-inner">
              <div className="sidebar-brand">
                <div className="sidebar-brand__badge">Aviation-grade test workflows</div>
                <div className="sidebar-brand__copy">
                  <div className="gs-eyebrow">TestGen AI</div>
                  <h1 className="sidebar-brand__headline">Modern test orchestration, re-positioned around flow.</h1>
                  <p className="sidebar-brand__text">
                    A lighter Gulfstream-inspired workspace with fast generation, scoring, healing, and export in one motion-rich control deck.
                  </p>
                </div>
              </div>

              <div className="sidebar-stack">
                <div className="glass-card profile-card">
                  <div className="profile-card__user">
                    <div className="profile-avatar">{initials}</div>
                    <div className="profile-meta">
                      <div className="profile-meta__name">{user.username}</div>
                      <div className="profile-meta__detail">{levelInfo.current.title}</div>
                    </div>
                  </div>
                  <XPBar xp={gameState.xp} />
                  <div className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-sm">
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                        Latest session
                      </div>
                      <div className="mt-1 text-[var(--text-strong)]">
                        {lastSessionId ? `Session ${lastSessionId}` : 'Waiting for first run'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-strong)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-white"
                    >
                      Log out
                    </button>
                  </div>
                </div>

                <div className="glass-card">
                  <div className="font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Model route
                  </div>
                  <div className="mt-3 segment">
                    <button
                      type="button"
                      onClick={() => setProvider('api')}
                      className={`menu-chip flex-1 ${provider === 'api' ? 'menu-chip--active' : ''}`}
                    >
                      API
                    </button>
                    <button
                      type="button"
                      onClick={() => setProvider('local')}
                      className={`menu-chip flex-1 ${provider === 'local' ? 'menu-chip--active' : ''}`}
                    >
                      Local
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="dashboard-panel fade-in fade-in-delay-1">
            <div className="dashboard-main">
              <div className="dashboard-topbar">
                <nav className="dashboard-tabs">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => `dashboard-tab ${isActive ? 'dashboard-tab--active' : ''}`}
                    >
                      <span className="min-w-0">
                        <span className="dashboard-tab__label">{item.label}</span>
                        <span className="dashboard-tab__hint">{item.hint}</span>
                      </span>
                      <span className="dashboard-tab__index">{String(index + 1).padStart(2, '0')}</span>
                    </NavLink>
                  ))}
                </nav>

                <div className="dashboard-actions">
                  <div className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {provider === 'api' ? 'Cloud model active' : 'Local model active'}
                  </div>
                  <div className="rounded-full border border-[var(--border)] bg-[rgba(121,185,209,0.12)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-deep)]">
                    Level {levelInfo.current.rank}
                  </div>
                </div>
              </div>

              <div className="dashboard-content">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
