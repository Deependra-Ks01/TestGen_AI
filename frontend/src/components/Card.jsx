export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="glass-card fade-in-delay-2">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="gs-title text-lg text-[var(--text-strong)]">{title}</div>
          {subtitle ? <div className="mt-1.5 text-sm font-normal text-[var(--muted)]">{subtitle}</div> : null}
        </div>
        {right}
      </header>
      <div className="card-body mt-5">{children}</div>
    </section>
  )
}
