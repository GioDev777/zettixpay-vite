import { useState } from 'react'

const EMAIL_REGEX          = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MERCHANT_ID_LEN  = 4

export default function LoginScreen({ onLogin }) {
  const [email,      setEmail]      = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [errors,     setErrors]     = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!EMAIL_REGEX.test(email.trim()))
      errs.email = 'Ingresa un correo electrónico válido.'
    if (merchantId.trim().length < MIN_MERCHANT_ID_LEN)
      errs.merchantId = 'El ID debe tener al menos 4 caracteres.'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onLogin(email.trim(), merchantId.trim())
  }

  return (
    <div className="login-screen">
      <div className="login-card card">

        <div className="login-head">
          <span className="brand-mark">
            <span className="brand-dot"></span>ZettixPay
          </span>
          <p className="login-subtitle">Pasarela de pagos para comercios afiliados</p>
          <span className="login-badge">🔒 Acceso de comercio</span>
        </div>

        <div className="login-body">
          <form onSubmit={handleSubmit} noValidate>

            <div className="field-group">
              <label htmlFor="lEmail" className="field-label">Correo electrónico</label>
              <input
                id="lEmail" type="email"
                className={`field-input${errors.email ? ' field-input--error' : ''}`}
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="lMerchant" className="field-label">ID de transacción del comercio</label>
              <input
                id="lMerchant" type="text"
                className={`field-input field-input--mono${errors.merchantId ? ' field-input--error' : ''}`}
                placeholder="Ej: ZTX-48213-COM"
                value={merchantId}
                onChange={e => setMerchantId(e.target.value)}
              />
              {errors.merchantId && <span className="field-error">{errors.merchantId}</span>}
              <span className="field-hint">Este ID lo genera el comercio al iniciar tu compra.</span>
            </div>

            <button type="submit" className="btn btn-primary btn--full">
              Continuar al pago →
            </button>

            <div className="info-chip">
              <span className="info-chip__icon">ℹ</span>
              <span>Próximamente: verificación real contra Firebase. Por ahora el sistema simula el acceso.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
