export default function StepIndicator({ currentStep, totalSteps, labels }) {
  return (
    <nav className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => {
        const n       = i + 1
        const isDone  = n < currentStep
        const isActive= n === currentStep
        return (
          <div key={n} className="step-indicator__item">
            <div className={[
              'step-indicator__circle',
              isDone   ? 'step-indicator__circle--done'   : '',
              isActive ? 'step-indicator__circle--active' : '',
            ].join(' ')}>
              {isDone ? '✔' : n}
            </div>
            <span className={`step-indicator__label${isActive ? ' step-indicator__label--active' : ''}`}>
              {labels[i]}
            </span>
            {n < totalSteps && (
              <div className={`step-indicator__connector${isDone ? ' step-indicator__connector--done' : ''}`} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
