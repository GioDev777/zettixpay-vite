import { useState } from 'react'

export default function SupportForm() {
  const [subject, setSubject]       = useState('')
  const [description, setDesc]      = useState('')
  const [message, setMessage]       = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) {
      setMessage({ type: 'error', text: 'Completa el asunto y la descripción.' })
      return
    }
    const id = 'TCK-' + Date.now().toString().slice(-6)
    setMessage({ type: 'success', text: `Ticket ${id} creado. Te responderemos pronto.` })
    setSubject(''); setDesc('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="sAsunto" className="field-label">Asunto</label>
        <input id="sAsunto" type="text" className="field-input"
          placeholder="Describe brevemente tu problema"
          value={subject} onChange={e => setSubject(e.target.value)} />
      </div>
      <div className="field-group">
        <label htmlFor="sDesc" className="field-label">Descripción</label>
        <textarea id="sDesc" className="field-input field-textarea" rows={4}
          placeholder="Detalla el problema que estás experimentando"
          value={description} onChange={e => setDesc(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Enviar Ticket</button>
      {message && (
        <div className={`alert alert--${message.type}`}>{message.text}</div>
      )}
    </form>
  )
}
