import { useState } from 'react'

const BANKS      = ['Bancolombia','Banco de Bogotá','Davivienda','BBVA Colombia','Banco de Occidente','Nequi']
const CASH_PTS   = ['Efecty','Baloto','Su Red']

/* ── Sub-formulario: tarjeta ── */
function CardForm({ data, onChange, errors }) {
  const f = (id, label, ph, extra = {}) => (
    <div className={`field-group${extra.full ? ' field-group--full' : ''}`}>
      <label htmlFor={id} className="field-label">{label}</label>
      <input
        id={id} type="text"
        className={`field-input field-input--mono${errors[id] ? ' field-input--error' : ''}`}
        placeholder={ph}
        maxLength={extra.max}
        value={data[id] || ''}
        onChange={e => onChange({ [id]: e.target.value })}
      />
      {errors[id] && <span className="field-error">{errors[id]}</span>}
    </div>
  )
  return (
    <div className="form-grid">
      {f('cardNumero', 'Número de tarjeta', '0000 0000 0000 0000', { max: 19, full: true })}
      {f('cardNombre', 'Nombre del titular', 'Como aparece en la tarjeta', { full: true })}
      {f('cardVence',  'Vencimiento', 'MM/AA', { max: 5 })}
      {f('cardCvv',    'CVV', '123', { max: 4 })}
    </div>
  )
}

/* ── Sub-formulario: PSE ── */
function PseForm({ data, onChange, errors }) {
  return (
    <div className="form-grid">
      <div className="field-group field-group--full">
        <label htmlFor="pseBanco" className="field-label">Banco</label>
        <select id="pseBanco"
          className={`field-input field-select${errors.pseBanco ? ' field-input--error' : ''}`}
          value={data.pseBanco || ''}
          onChange={e => onChange({ pseBanco: e.target.value })}>
          <option value="">Selecciona tu banco</option>
          {BANKS.map(b => <option key={b}>{b}</option>)}
        </select>
        {errors.pseBanco && <span className="field-error">{errors.pseBanco}</span>}
      </div>
      <div className="field-group field-group--full">
        <label htmlFor="pseTipo" className="field-label">Tipo de persona</label>
        <select id="pseTipo" className="field-input field-select"
          value={data.pseTipo || 'natural'}
          onChange={e => onChange({ pseTipo: e.target.value })}>
          <option value="natural">Persona natural</option>
          <option value="juridica">Persona jurídica</option>
        </select>
      </div>
      <div className="field-group field-group--full">
        <label htmlFor="pseDoc" className="field-label">Número de documento</label>
        <input id="pseDoc" type="text"
          className={`field-input field-input--mono${errors.pseDocumento ? ' field-input--error' : ''}`}
          placeholder="Ej: 1098765432"
          value={data.pseDocumento || ''}
          onChange={e => onChange({ pseDocumento: e.target.value })} />
        {errors.pseDocumento && <span className="field-error">{errors.pseDocumento}</span>}
      </div>
    </div>
  )
}

/* ── Sub-formulario: efectivo ── */
function CashForm({ data, onChange, errors }) {
  return (
    <div className="form-grid">
      <div className="field-group field-group--full">
        <label htmlFor="cashPunto" className="field-label">Punto de pago</label>
        <select id="cashPunto" className="field-input field-select"
          value={data.cashPunto || 'Efecty'}
          onChange={e => onChange({ cashPunto: e.target.value })}>
          {CASH_PTS.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div className="field-group field-group--full">
        <label htmlFor="cashNombre" className="field-label">Nombre de quien paga</label>
        <input id="cashNombre" type="text"
          className={`field-input${errors.cashNombre ? ' field-input--error' : ''}`}
          placeholder="Nombre completo"
          value={data.cashNombre || ''}
          onChange={e => onChange({ cashNombre: e.target.value })} />
        {errors.cashNombre && <span className="field-error">{errors.cashNombre}</span>}
      </div>
      <p className="field-hint field-group--full" style={{ gridColumn: '1/-1' }}>
        ⏱ El ticket tiene vigencia de 24 horas para ser pagado en el punto físico.
      </p>
    </div>
  )
}

/* ── Mapa método → componente y campos requeridos ── */
const FORMS = { debito: CardForm, credito: CardForm, pse: PseForm, efectivo: CashForm }
const REQUIRED = {
  debito:   ['cardNumero','cardNombre','cardVence','cardCvv'],
  credito:  ['cardNumero','cardNombre','cardVence','cardCvv'],
  pse:      ['pseBanco','pseDocumento'],
  efectivo: ['cashNombre'],
}
const LABELS = {
  cardNumero: 'El número de tarjeta es requerido.',
  cardNombre: 'El nombre del titular es requerido.',
  cardVence:  'La fecha de vencimiento es requerida.',
  cardCvv:    'El CVV es requerido.',
  pseBanco:   'Selecciona un banco.',
  pseDocumento:'El número de documento es requerido.',
  cashNombre: 'El nombre es requerido.',
}

export default function StepDetails({ method, methodData, onDataChange, onBack, onNext }) {
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const errs = {}
    ;(REQUIRED[method] || []).forEach(f => {
      if (!methodData[f]?.toString().trim()) errs[f] = LABELS[f]
    })
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); onNext()
  }

  const handleChange = (patch) => {
    onDataChange(patch)
    setErrors(prev => {
      const next = { ...prev }
      Object.keys(patch).forEach(k => delete next[k])
      return next
    })
  }

  const Form = FORMS[method]
  if (!Form) return null

  return (
    <div className="wizard-step">
      <Form data={methodData} onChange={handleChange} errors={errors} />
      <div className="wizard-nav">
        <button className="btn btn-outline" onClick={onBack}>← Atrás</button>
        <button className="btn btn-primary" onClick={handleNext}>Continuar →</button>
      </div>
    </div>
  )
}
