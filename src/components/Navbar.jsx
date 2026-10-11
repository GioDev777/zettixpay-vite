const LINKS = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Pagos',     href: '#pagos'     },
  { label: 'Historial', href: '#historial' },
  { label: 'Soporte',   href: '#soporte'   },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        {LINKS.map(({ label, href }) => (
          <a key={href} href={href} className="navbar__link">{label}</a>
        ))}
      </div>
    </nav>
  )
}
