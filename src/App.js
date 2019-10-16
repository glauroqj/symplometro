import React, { useState, useEffect } from 'react'
/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

const App = () => {
  const db = firebase.firestore()
  const notificationData = localStorage.getItem('symplometro-data')
  
  const [state, setState] = useState({
    loading: true,
    events: null,
    notification: JSON.parse(notificationData) ? JSON.parse(notificationData).notification : false
  })

  useEffect(() => {

    db.collection('events')
    .doc('config')
    .get()
    .then(doc => {
      // console.log('< FIRESTORE : GET DATA > ', doc.data(), process.env)

      setState({
        ...state,
        loading: false,
        events: doc.data()
      })

    })
    .catch(() => {
      // console.warn('< DATABASE : GET : ERROR > ', error )
      setState({
        ...state,
        loading: false,
        events: {count: 'Aguardando atualização...'}
      })
    })


  }, [])

  const toggleNotification = () => {
    const notificationPayload = localStorage.getItem('symplometro-data')

    if (notificationPayload !== null) {
      const notificationTest = JSON.parse(notificationPayload).notification

      localStorage.setItem('symplometro-data', JSON.stringify({notification: notificationTest ? false : true}))
      setState({...state, notification: notificationTest ? false : true})
    }

  }

  const eventsTemplate = () => (
    <div className="box-events">
      <div className="actual-events">{`${state.events.count} eventos`}</div>
      <div className="top-events">{`Recorde: ${state.events.topCount} eventos`}</div>
    </div>
  )

  return (
    <div className="symplometro-app">

      {state.loading
        ? <div className="loading">Carregando...</div>
        : eventsTemplate()
      }

      <div className="footer">
        Feito com amor por <a href="https://www.linkedin.com/in/glauro-juliani/" target="new">Glauro Juliani</a> <b>0.2.1</b>
      </div>
      
      <div className="notification">
        {state.notification
          ? <div className="on" onClick={ () => {toggleNotification()} }>Notificações ON (click para desativar)</div>
          : <div className="off" onClick={ () => {toggleNotification()} }>Notificações OFF (click para ativar)</div>
        }
      </div>
    </div>
  )
}

export default App
