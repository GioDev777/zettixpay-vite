import { useState } from 'react'

const METHODS = [
  { id: 'pse',      icon: '🏦', label: 'PSE',        desc: 'Débito desde tu banco'        },
  { id: 'debito',   icon: '💳', label: 'T. Débito',  desc: 'Tarjeta débito'               },
  { id: 'credito',  icon: '💳', label: 'T. Crédito', desc: 'Tarjeta crédito'              },
  { id: 'efectivo', icon: '💵', label: 'Efectivo',   desc: 'Ticket para punto físico'     },
]

export default function StepMethod({ selected, onSelect, onBack, onNext }) {
  const [showError, setShowError] = useState(false)

  const handleNext = () => {
    if (!selected) { setShowError(true); return }
    setShowError(false); onNext()
  }

  return (
    <div className="wizard-step">
      <p className="wizard-step__lead">Elige cómo deseas pagar</p>

      <div className="method-grid">
        {METHODS.map(m => (
          <label
            key={m.id}
            htmlFor={`method-${m.id}`}
            className={`method-card${selected === m.id ? ' method-card--selected' : ''}`}
          >
            <input
              type="radio" id={`method-${m.id}`}
              name="metodoPago" value={m.id}
              className="method-card__radio"
              checked={selected === m.id}
              onChange={() => { onSelect(m.id); setShowError(false) }}
            />
            <span className="method-card__icon">{m.icon}</span>
            <span className="method-card__label">{m.label}</span>
            <span className="method-card__desc">{m.desc}</span>
          </label>
        ))}
      </div>

      {showError && (
        <p className="field-error" style={{ marginBottom: '1rem' }}>
          Selecciona un método de pago para continuar.
        </p>
      )}

      <div className="wizard-nav">
        <button className="btn btn-outline" onClick={onBack}>← Atrás</button>
        <button className="btn btn-primary" onClick={handleNext}>Continuar →</button>
      </div>
    </div>
  )
}
