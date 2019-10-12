import React, { useState, useEffect } from 'react'
/** firebase */
import firebase from 'firebase/app'
import 'firebase/firestore'

const App = () => {
  const db = firebase.firestore()
  
  const [state, setState] = useState({ loading: true, events: 0, notification: null })

  useEffect(() => {

    // db.collection('events')
    // .doc('config')
    // .get()
    // .then(doc => {
    //   console.log('< FIRESTORE : GET DATA > ', doc.data())

    //   setState({
    //     ...state,
    //     loading: false,
    //     events: doc.data().count
    //   })

    // })
    // .catch(error => {
    //   console.warn('< DATABASE : GET : ERROR > ', error )
    // })

    // db.collection('users')
    // .doc('config')
    // .get()
    // .then(doc => {
    //   console.log('< FIRESTORE : GET DATA > ', doc.data())

    //   setState({
    //     ...state,
    //     loading: false,
    //     events: doc.data().count
    //   })

    // })
    // .catch(error => {
    //   console.warn('< DATABASE : GET : ERROR > ', error )
    // })

  }, [])

  const toggleNotification = () => {
    // const notificationPayload = localStorage.getItem('Symplometro-Data')

    // if (notificationPayload !== null) {
    //   const notificationTest = JSON.parse(notificationPayload).notification

    //   localStorage.setItem('Symplometro-Data', JSON.stringify({notification: notificationTest ? false : true}))
    //   setState({...state, notification: notificationTest ? false : true})
    // }

  }

  return (
    <div className="symplometro-app">

      {state.loading
        ? <div className="symplometro-loading">Carregando...</div>
        : <div className="symplometro-events">{state.events}</div>
      }

      <div className="symplometro-footer">
        Feito com amor por <a href="https://www.linkedin.com/in/glauro-juliani/" target="new">Glauro Juliani</a> <b>0.1.2</b>
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
