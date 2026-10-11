export default function SiteFooter({ onLogout }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">

        <div className="site-footer__brand">
          <span className="brand-mark"><span className="brand-dot"></span>ZettixPay</span>
          <p className="site-footer__desc">
            Plataforma de pagos digitales para comercios afiliados. Proyecto formativo SENA ADSO.
          </p>
          <div className="status-badge">
            <span className="status-dot"></span> Plataforma operativa
          </div>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Navegación</h3>
          <ul className="site-footer__links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#pagos">Pagos</a></li>
            <li><a href="#historial">Historial</a></li>
            <li><a href="#soporte">Soporte</a></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Métodos de pago</h3>
          <ul className="site-footer__links">
            <li><a href="#pagos">PSE</a></li>
            <li><a href="#pagos">Tarjeta débito</a></li>
            <li><a href="#pagos">Tarjeta crédito</a></li>
            <li><a href="#pagos">Efectivo</a></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Cuenta</h3>
          <ul className="site-footer__links">
            <li><button className="btn-link" onClick={onLogout}>Cerrar sesión</button></li>
            <li><a href="#soporte">Ayuda</a></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Legal</h3>
          <ul className="site-footer__links">
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>© {new Date().getFullYear()} ZettixPay — Proyecto formativo SENA</span>
          <span>Hecho en Cali, Colombia 🇨🇴</span>
        </div>
      </div>
    </footer>
  )
}
