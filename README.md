# ZettixPay — Proyecto React con Vite

Plataforma de Pagos Digitales · Proyecto Formativo SENA ADSO

---

## ¿Cómo correr este proyecto?

### Paso 1 — Tener Node.js instalado
Descárgalo de https://nodejs.org (versión LTS).
Para verificar que ya lo tienes, abre una terminal y escribe:
```
node -v
```
Si aparece un número como `v20.x.x`, ya lo tienes.

---

### Paso 2 — Abrir la carpeta en VS Code
Abre VS Code → Archivo → Abrir carpeta → selecciona esta carpeta `zettixpay-vite`.

---

### Paso 3 — Abrir la terminal de VS Code
Menú Terminal → Nueva terminal (o Ctrl + `)

---

### Paso 4 — Instalar dependencias (solo la primera vez)
```
npm install
```
Esto descarga React y Vite. Puede tardar 1-2 minutos.

---

### Paso 5 — Arrancar la aplicación
```
npm run dev
```
Vite te mostrará algo como:
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```
Abre esa dirección en tu navegador y verás ZettixPay funcionando.

---

## Estructura del proyecto

```
zettixpay-vite/
├── index.html                     ← Punto de entrada (Vite lo usa)
├── package.json                   ← Dependencias del proyecto
├── vite.config.js                 ← Configuración de Vite
└── src/
    ├── main.jsx                   ← Monta React en el navegador
    ├── App.jsx                    ← Componente raíz (maneja sesión)
    ├── styles/
    │   └── global.css             ← Todos los estilos de la app
    └── components/
        ├── LoginScreen.jsx        ← Pantalla de login
        ├── Dashboard.jsx          ← Shell principal post-login
        ├── Header.jsx             ← Barra superior
        ├── Navbar.jsx             ← Menú de navegación
        ├── StatsRow.jsx           ← Tarjetas de estadísticas
        ├── PaymentWizard.jsx      ← Flujo de pago (coordinador)
        ├── History.jsx            ← Historial de transacciones
        ├── SupportForm.jsx        ← Formulario de soporte
        ├── SiteFooter.jsx         ← Footer / Mapa del sitio
        └── wizard/
            ├── StepIndicator.jsx  ← Indicador de progreso (1/4, 2/4…)
            ├── StepAmount.jsx     ← Paso 1: monto y concepto
            ├── StepMethod.jsx     ← Paso 2: método de pago
            ├── StepDetails.jsx    ← Paso 3: datos del método
            └── StepConfirmation.jsx ← Paso 4: resumen y resultado
```

## Para subir a Vercel
1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a vercel.com → Import Project → selecciona el repo.
3. Vercel detecta Vite automáticamente y despliega solo.
