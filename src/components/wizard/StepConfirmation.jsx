const LABELS = { pse:'PSE', debito:'Tarjeta débito', credito:'Tarjeta crédito', efectivo:'Efectivo (ticket)' }
const fmt    = v => '$' + Number(v).toLocaleString('es-CO')
const folio  = ()  => 'ZTX-' + Date.now().toString().slice(-8)
const code   = ()  => Math.floor(100_000_000 + Math.random() * 899_999_999).toString()

const detail = (method, data) => {
  if (method === 'debito' || method === 'credito') {
    const n = (data.cardNumero || '').replace(/\s/g,'')
    return n.length >= 4 ? `Tarjeta ****${n.slice(-4)}` : '—'
  }
  if (method === 'pse')      return data.pseBanco || '—'
  if (method === 'efectivo') return `Punto: ${data.cashPunto || 'Efecty'}`
  return '—'
}

function Row({ label, value }) {
  return (
    <div className="summary-row">
      <span className="summary-row__label">{label}</span>
      <span className="summary-row__value">{value}</span>
    </div>
  )
}

function ResultApproved({ amount, method, folioId, onReset }) {
  return (
    <div className="result-card">
      <div className="result-card__icon result-card__icon--green">✔</div>
      <h3 className="result-card__title">Pago aprobado</h3>
      <p className="result-card__subtitle">Tu transacción se procesó correctamente.</p>
      <Row label="Monto"  value={fmt(amount)} />
      <Row label="Método" value={LABELS[method]} />
      <p className="result-card__folio">{folioId}</p>
      <button className="btn btn-primary" style={{ marginTop:'1rem' }} onClick={onReset}>
        + Realizar otro pago
      </button>
    </div>
  )
}

function ResultCash({ amount, cashPoint, cashCode, folioId, onReset }) {
  return (
    <div className="result-card">
      <div className="result-card__icon result-card__icon--amber">⏱</div>
      <h3 className="result-card__title">Ticket generado</h3>
      <p className="result-card__subtitle">Paga en cualquier punto {cashPoint} antes de que expire.</p>
      <div className="cash-ticket">
        <p className="cash-ticket__label">Código de pago</p>
        <p className="cash-ticket__code">{cashCode}</p>
        <p className="cash-ticket__amount">Monto: {fmt(amount)}</p>
      </div>
      <p className="result-card__folio">{folioId}</p>
      <button className="btn btn-primary" style={{ marginTop:'1rem' }} onClick={onReset}>
        + Realizar otro pago
      </button>
    </div>
  )
}

export default function StepConfirmation({ amount, concept, method, methodData, result, onBack, onConfirm, onReset }) {
  const handleConfirm = () => {
    onConfirm({
      folio:    folio(),
      amount, method, concept,
      status:   method === 'efectivo' ? 'pendiente' : 'aprobado',
      cashCode: method === 'efectivo' ? code() : null,
    })
  }

  if (result) {
    return method === 'efectivo'
      ? <ResultCash    amount={result.amount} cashPoint={methodData.cashPunto || 'Efecty'} cashCode={result.cashCode} folioId={result.folio} onReset={onReset} />
      : <ResultApproved amount={result.amount} method={result.method} folioId={result.folio} onReset={onReset} />
  }

  return (
    <div className="wizard-step">
      <h3 className="wizard-step__section-title">Resumen de tu pago</h3>
      <div className="card summary-card" style={{ marginBottom:'1.25rem' }}>
        <div className="card__body">
          <Row label="Monto"    value={fmt(amount)} />
          <Row label="Concepto" value={concept || 'Sin especificar'} />
          <Row label="Método"   value={LABELS[method]} />
          <Row label="Detalle"  value={detail(method, methodData)} />
        </div>
      </div>
      <div className="wizard-nav">
        <button className="btn btn-outline" onClick={onBack}>← Atrás</button>
        <button className="btn btn-accent"  onClick={handleConfirm}>🔒 Confirmar y pagar</button>
      </div>
    </div>
  )
}
