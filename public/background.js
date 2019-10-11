(function() {
  const credentials = {
    apiKey: "AIzaSyAOq1-ibTMS4HChhuxpCeCwUFFQai16I1c",
    authDomain: "symplometro.firebaseapp.com",
    databaseURL: "https://symplometro.firebaseio.com",
    projectId: "symplometro",
    storageBucket: "symplometro.appspot.com",
    messagingSenderId: "106786872116",
    appId: "1:106786872116:web:9c7693352d516bb425e361"
  }
  firebase.initializeApp(credentials)
  const db = firebase.firestore()

  db.collection('events')
    .doc('config')
    .get()
    .then(doc => {
      console.log('< FIRESTORE : GET DATA > ', doc.data())
    })
    .catch(error => {
      console.warn('< DATABASE : GET : ERROR > ', error )
    })

  getEvents('init')

  setInterval(()=> {
		let verifyLocalStorage = localStorage.getItem('Count-Event')

		if (verifyLocalStorage !== null) {
			getEvents('refresh')
			return false
		}
	}, 2.7e+6) /* 2.7e+6 = 45 minutes */

  function getEvents(action) {
    const xhr = new XMLHttpRequest()

    /** verify notification */
    const notificationPayload = localStorage.getItem('Symplometro-Data')
    if (notificationPayload === null) localStorage.setItem('Symplometro-Data', JSON.stringify({notification: true}))

    // xhr.onload = () => {
    //   // Process our return data
    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     // What do when the request is successful
    //     // console.log('success!', xhr)
    //     const parser = new DOMParser()
    //     const domResponse = parser.parseFromString(xhr.responseText, 'text/html')
    //     // console.log('DOM RESPONSE: >>>> ', domResponse)
    //     const countEvents = domResponse.querySelectorAll('h1 span strong')[0].innerText
    //     // console.log('Events >>>>>>>> ', countEvents)
    //     localStorage.setItem('Count-Event', countEvents)

    //     const onlyNumbers = countEvents.split(' ')[0].split('.')[0]

    //     chrome.browserAction.setBadgeText({text: `${onlyNumbers}K`})

    //     if (action === 'refresh') {
    //       showNotification(countEvents)
    //     }

    //   } else {
    //     // What do when the request fails
    //     console.log('The request failed!')
    //   }
    // }
    
    // xhr.open('GET', 'https://www.sympla.com.br/index.html')
    // xhr.send()
  }

  function showNotification(data) {
    const notificationPayload = localStorage.getItem('Symplometro-Data')

    if (notificationPayload !== null) {
      /** verify if notification is allowed */
      const verifyNotification = JSON.parse(notificationPayload).notification
      if (!verifyNotification) return false
    }

    let options = {
			type: 'basic',
			iconUrl: './symplometro-128.png',
			message: data,
      title: 'Eventos Online',
      eventTime: 3000
    }
    
    if (Notification.permission === 'granted') {
			// let notification = new Notification('', options);
			chrome.notifications.create('', options)
			return false
		}

    if (Notification.permission !== 'denied') {
			Notification.requestPermission((permission) => {
				if (permission === 'granted') {
					chrome.notifications.create('', options)
				}
			})
			return false
		}
  }

})()