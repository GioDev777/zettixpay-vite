export default function Header({ email, onLogout }) {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <div>
          <span className="brand-mark">
            <span className="brand-dot"></span>ZettixPay
          </span>
          <small className="topbar__tagline">Plataforma de Pagos Digitales</small>
        </div>
        <div className="topbar__session">
          {email && <span className="topbar__email">{email}</span>}
          <button className="btn btn-outline btn--sm btn--light" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}
