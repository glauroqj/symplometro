import React, { useState, useEffect } from 'react'

const App = () => {

  const [state, setState] = useState({ loading: true, events: 0 })

  useEffect(() => {
    const data = localStorage.getItem('Count-Event')

    if (data) setState({ ...state, loading: false, events: data })

    if (!data) setState({ ...state, loading: false, events: 'Aguardando atualização...' })
  }, [])

  return (
    <div className="symplometro-app">

      {state.loading
        ? <div className="symplometro-loading">Carregando...</div>
        : <div className="symplometro-events">{state.events}</div>
      }
      
      <div className="symplometro-footer">
        Feito com amor por <a href="https://www.linkedin.com/in/glauro-juliani/" target="new">Glauro Juliani</a> <b>0.1.0</b>
      </div>
    </div>
  )
}

export default App
