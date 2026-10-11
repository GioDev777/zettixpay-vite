import Header        from './Header'
import Navbar        from './Navbar'
import StatsRow      from './StatsRow'
import PaymentWizard from './PaymentWizard'
import History       from './History'
import SupportForm   from './SupportForm'
import SiteFooter    from './SiteFooter'

export default function Dashboard({ session, onLogout }) {
  return (
    <div className="app-shell">
      <Header email={session.email} onLogout={onLogout} />
      <Navbar />

      <main>
        <section id="inicio" className="hero container">
          <h1 className="hero__title">Bienvenido a ZettixPay</h1>
          <p className="hero__subtitle">Gestión segura de pagos digitales.</p>
        </section>

        <StatsRow />

        <section id="pagos" className="container section-gap">
          <div className="card">
            <div className="card__body">
              <h2 className="section-title">Realizar Pago</h2>
              <PaymentWizard />
            </div>
          </div>
        </section>

        <section id="historial" className="container section-gap">
          <div className="card">
            <div className="card__body">
              <h2 className="section-title">Historial</h2>
              <History />
            </div>
          </div>
        </section>

        <section id="soporte" className="container section-gap">
          <div className="card">
            <div className="card__body">
              <h2 className="section-title">Soporte</h2>
              <SupportForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onLogout={onLogout} />
    </div>
  )
}
