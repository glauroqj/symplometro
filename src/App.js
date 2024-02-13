import React, { useState, useEffect } from 'react'
/** firebase */
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'

const packageValues = require('../package.json')

const App = () => {
  // const db = firebase.firestore()
  const notificationData = localStorage.getItem('symplometro-data')

  const [state, setState] = useState({
    loading: true,
    events: null,
    notification: JSON.parse(notificationData)
      ? JSON.parse(notificationData).notification
      : false
  })

  useEffect(() => {
    /** logIn */
    // signInAnonymous();
    // fetchSympla()
    serviceWorkerListener()
  }, [])

  const serviceWorkerListener = () => {
    // eslint-disable-next-line
    console.log(chrome)
    // eslint-disable-next-line
    if (!!chrome && chrome?.runtime) {
      console.log('< SEND MESSAGE APP >')
      // eslint-disable-next-line
      chrome.runtime.sendMessage(
        {
          type: 'callSite',
          url: 'https://www.sympla.com.br'
        },
        (response) => {
          // console.log('< RESPONSE HTML >', response)
          handleHtmlResponse(response)
        }
      )
    }
  }

  const handleHtmlResponse = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const value = doc.querySelector(
      '#navbar > div > span > span > strong'
    ).textContent

    console.log('< responseRaw > ', value)
    if (!!value) {
      setState({
        events: value,
        loading: false
      })
    }
  }

  // const fetchSympla = async () => {
  //   try {
  //     const responseRaw = await fetch('https://www.sympla.com.br')

  //     if (!responseRaw.ok) {
  //       throw new Error('Failed to fetch HTML')
  //     }
  //     const html = await responseRaw.text()
  // const parser = new DOMParser()

  // const doc = parser.parseFromString(html, 'text/html')

  // const value = doc.querySelector(
  //   '#navbar > div > span > span > strong'
  // ).textContent

  // console.log('< responseRaw > ', value)
  // if (!!value) {
  //   setState({
  //     events: value,
  //     loading: false
  //   })
  // }
  //   } catch (e) {
  //     console.log('< FETCH SYMPLA ERROR > ', e)
  //   }
  // }

  // const signInAnonymous = () => {
  //   // firebase
  //   //   .auth()
  //   //   .signInAnonymously()
  //   //   .then(() => {
  //   //     // console.log('< LOG IN : DONE > ', response)
  //   //     getData()
  //   //   })
  //   //   .catch((error) => console.log('< LOG IN : ERROR > ', error))
  // }

  // const getData = () => {
  //   // db.collection('events')
  //   //   .doc('config')
  //   //   .get()
  //   //   .then((doc) => {
  //   //     // console.log('< FIRESTORE : GET DATA > ', doc.data(), process.env)
  //   //     setState({
  //   //       ...state,
  //   //       loading: false,
  //   //       events: doc.data()
  //   //     })
  //   //   })
  //   //   .catch(() => {
  //   //     // console.warn('< DATABASE : GET : ERROR > ', error )
  //   //     setState({
  //   //       ...state,
  //   //       loading: false,
  //   //       events: { count: 'Aguardando atualização...' }
  //   //     })
  //   //   })
  // }

  // const toggleNotification = () => {
  //   const notificationPayload = localStorage.getItem('symplometro-data')

  //   if (notificationPayload !== null) {
  //     const notificationTest = JSON.parse(notificationPayload).notification

  //     localStorage.setItem(
  //       'symplometro-data',
  //       JSON.stringify({ notification: notificationTest ? false : true })
  //     )
  //     setState({ ...state, notification: notificationTest ? false : true })
  //   }
  // }

  const eventsTemplate = () => (
    <div className="box-events">
      <div className="cute-text">O show vai continuar time \o/</div>
      <div className="actual-events">{`${state.events} eventos`}</div>
      {/* <div className="top-events">{`Recorde: ${state.events.topCount} eventos`}</div> */}
    </div>
  )

  return (
    <div className="symplometro-app">
      {state.loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        eventsTemplate()
      )}

      <div className="footer">
        Feito com amor por{' '}
        <a href="https://www.linkedin.com/in/glauro-juliani/" target="new">
          Glauro Juliani
        </a>
        {' - '}
        <b>{packageValues?.version}</b>
      </div>

      {/* <div className="notification">
        {state.notification ? (
          <div
            className="on"
            onClick={() => {
              toggleNotification()
            }}
          >
            Notificações ON (click para desativar)
          </div>
        ) : (
          <div
            className="off"
            onClick={() => {
              toggleNotification()
            }}
          >
            Notificações OFF (click para ativar)
          </div>
        )}
      </div> */}
    </div>
  )
}

export default App
