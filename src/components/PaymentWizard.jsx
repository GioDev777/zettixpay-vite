import { useReducer, useCallback } from 'react'
import StepIndicator    from './wizard/StepIndicator'
import StepAmount       from './wizard/StepAmount'
import StepMethod       from './wizard/StepMethod'
import StepDetails      from './wizard/StepDetails'
import StepConfirmation from './wizard/StepConfirmation'

const INIT = { step:1, amount:'', concept:'', method:null, methodData:{}, result:null }

function reducer(state, { type, payload }) {
  switch (type) {
    case 'STEP':   return { ...state, step: payload, result: payload < 4 ? null : state.result }
    case 'AMOUNT': return { ...state, amount: payload }
    case 'CONCEPT':return { ...state, concept: payload }
    case 'METHOD': return { ...state, method: payload, methodData: {} }
    case 'DATA':   return { ...state, methodData: { ...state.methodData, ...payload } }
    case 'RESULT': return { ...state, result: payload }
    case 'RESET':  return { ...INIT }
    default:       return state
  }
}

export default function PaymentWizard() {
  const [s, dispatch] = useReducer(reducer, INIT)

  const goTo      = useCallback(n    => dispatch({ type:'STEP',   payload:n }),    [])
  const setAmount = useCallback(v    => dispatch({ type:'AMOUNT', payload:v }),    [])
  const setConcept= useCallback(v    => dispatch({ type:'CONCEPT',payload:v }),    [])
  const setMethod = useCallback(m    => dispatch({ type:'METHOD', payload:m }),    [])
  const setData   = useCallback(data => dispatch({ type:'DATA',   payload:data }), [])
  const setResult = useCallback(r    => dispatch({ type:'RESULT', payload:r }),    [])
  const reset     = useCallback(()   => dispatch({ type:'RESET' }),                [])

  const step = () => {
    switch (s.step) {
      case 1: return <StepAmount    amount={s.amount} concept={s.concept} onAmountChange={setAmount} onConceptChange={setConcept} onNext={()=>goTo(2)} />
      case 2: return <StepMethod    selected={s.method} onSelect={setMethod} onBack={()=>goTo(1)} onNext={()=>goTo(3)} />
      case 3: return <StepDetails   method={s.method} methodData={s.methodData} onDataChange={setData} onBack={()=>goTo(2)} onNext={()=>goTo(4)} />
      case 4: return <StepConfirmation amount={s.amount} concept={s.concept} method={s.method} methodData={s.methodData} result={s.result} onBack={()=>goTo(3)} onConfirm={setResult} onReset={reset} />
      default: return null
    }
  }

  return (
    <div className="wizard">
      <StepIndicator currentStep={s.step} totalSteps={4} labels={['Monto','Método','Datos','Confirmación']} />
      <div className="wizard__content">{step()}</div>
    </div>
  )
}
