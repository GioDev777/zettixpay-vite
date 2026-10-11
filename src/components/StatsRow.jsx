const STATS = [
  { label: 'Saldo',   value: '$1.250.000', icon: '💰' },
  { label: 'Pagos',   value: '128',        icon: '💳' },
  { label: 'Tickets', value: '3',          icon: '🎫' },
]

export default function StatsRow() {
  return (
    <div className="container stats-row">
      {STATS.map(({ label, value, icon }) => (
        <div key={label} className="card stat-card">
          <div className="stat-card__body">
            <div className="stat-card__text">
              <p className="stat-card__label">{label}</p>
              <p className="stat-card__value">{value}</p>
            </div>
            <span className="stat-card__icon">{icon}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
