import { useState } from 'react'

const MIN = 1000

export default function StepAmount({ amount, concept, onAmountChange, onConceptChange, onNext }) {
  const [error, setError] = useState('')

  const handleNext = () => {
    const v = parseInt(amount, 10)
    if (!amount || isNaN(v) || v < MIN) {
      setError(`El monto mínimo es $${MIN.toLocaleString('es-CO')} COP.`)
      return
    }
    setError(''); onNext()
  }

  return (
    <div className="wizard-step">
      <div className="field-group">
        <label htmlFor="monto" className="field-label">Monto a pagar (COP)</label>
        <div className="input-prefix-group">
          <span className="input-prefix">$</span>
          <input
            id="monto" type="number"
            className={`field-input field-input--mono${error ? ' field-input--error' : ''}`}
            placeholder="0" min={MIN} step="1000"
            value={amount}
            onChange={e => { onAmountChange(e.target.value); setError('') }}
          />
        </div>
        {error && <span className="field-error">{error}</span>}
        <span className="field-hint">Monto mínimo $1.000 COP</span>
      </div>

      <div className="field-group">
        <label htmlFor="concepto" className="field-label">
          Concepto <span className="field-label--optional">(opcional)</span>
        </label>
        <input
          id="concepto" type="text" className="field-input"
          placeholder="Ej: Compra en tienda, factura #4521"
          value={concept}
          onChange={e => onConceptChange(e.target.value)}
        />
      </div>

      <div className="wizard-nav wizard-nav--end">
        <button className="btn btn-primary" onClick={handleNext}>Continuar →</button>
      </div>
    </div>
  )
}
