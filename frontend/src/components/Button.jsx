export default function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'

  const styles =
    variant === 'ghost'
      ? 'border border-[var(--border)] bg-white/70 text-[var(--text)] hover:-translate-y-0.5 hover:bg-white hover:border-[var(--border-strong)]'
      : variant === 'soft'
        ? 'border border-[var(--border)] bg-[var(--panel-muted)] text-[var(--text-strong)] hover:-translate-y-0.5 hover:bg-white hover:border-[var(--border-strong)]'
        : 'border border-transparent bg-[image:var(--accent)] text-[var(--accent-on)] hover:-translate-y-0.5 shadow-[0_18px_28px_rgba(31,110,169,0.22)]'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}
