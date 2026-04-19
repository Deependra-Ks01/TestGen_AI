import { useEffect, useState } from 'react'

export default function AchievementToast({ achievement, onDone }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!achievement) return
    const showTimer = setTimeout(() => setVisible(true), 50)
    const hideTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 400)
    }, 3200)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [achievement, onDone])

  if (!achievement) return null

  const badge = achievement.abbr || achievement.name.slice(0, 2).toUpperCase()

  return (
    <div className={`achievement-toast ${visible ? 'achievement-toast--visible' : ''}`}>
      <div className="achievement-toast__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-[rgba(31,110,169,0.12)] bg-[rgba(121,185,209,0.14)] font-heading text-[0.65rem] font-semibold tracking-wide text-[var(--brand-deep)]">
        {badge}
      </div>
      <div className="achievement-toast__body">
        <div className="achievement-toast__label">Unlocked</div>
        <div className="achievement-toast__name">{achievement.name}</div>
        <div className="achievement-toast__desc">{achievement.desc}</div>
        <div className="achievement-toast__xp">+{achievement.xp} XP</div>
      </div>
    </div>
  )
}
