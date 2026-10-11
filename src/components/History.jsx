const MOCK = [
  { id: '1001', amount: '$120.000', method: 'PSE',      status: 'Aprobado',  cls: 'badge--success' },
  { id: '1002', amount: '$80.000',  method: 'Efectivo', status: 'Pendiente', cls: 'badge--warn'    },
]

export default function History() {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Monto</th><th>Método</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {MOCK.map(tx => (
            <tr key={tx.id}>
              <td className="mono">{tx.id}</td>
              <td>{tx.amount}</td>
              <td>{tx.method}</td>
              <td><span className={`badge ${tx.cls}`}>{tx.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
