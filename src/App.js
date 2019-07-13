import React, { useState, useEffect } from 'react'

const App = () => {

  const [state, setState] = useState({ loading: true, events: 0, notification: null })

  useEffect(() => {
    const data = localStorage.getItem('Count-Event')
    const notificationData = localStorage.getItem('Symplometro-Data')

    if (data) setState({ ...state, loading: false, events: data, notification: JSON.parse(notificationData) ? JSON.parse(notificationData).notification : false })

    if (!data) setState({ ...state, loading: false, events: 'Aguardando atualização...', notification: JSON.parse(notificationData) ? JSON.parse(notificationData).notification : false })
  }, [])

  const toggleNotification = () => {
    const notificationPayload = localStorage.getItem('Symplometro-Data')

    if (notificationPayload !== null) {
      const notificationTest = JSON.parse(notificationPayload).notification

      localStorage.setItem('Symplometro-Data', JSON.stringify({notification: notificationTest ? false : true}))
      setState({...state, notification: notificationTest ? false : true})
    }

  }

  return (
    <div className="symplometro-app">

      {state.loading
        ? <div className="symplometro-loading">Carregando...</div>
        : <div className="symplometro-events">{state.events}</div>
      }
      
      <div className="symplometro-footer">
        Feito com amor por <a href="https://www.linkedin.com/in/glauro-juliani/" target="new">Glauro Juliani</a> <b>0.1.1</b>
      </div>
      <div className="symplometro-notification">
        {state.notification
          ? <div className="on" onClick={ () => {toggleNotification()} }>Notificações ON (click para desativar)</div>
          : <div className="off" onClick={ () => {toggleNotification()} }>Notificações OFF (click para ativar)</div>
        }
      </div>
    </div>
  )
}

export default App
