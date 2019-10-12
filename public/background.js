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

  checkUser()
  
  function checkUser() {
    /** check user */
    let symplometroUser = localStorage.getItem('symplometro-user')

    if (symplometroUser !== null) {
      /** user exist, get configs from database and call getEvents */
      // const user = JSON.parse(symplometroUser)
      // db.collection('users')
      //   .doc(user.id)
      //   .get()
      //   .then(doc => {

      //   })
      //   .catch(error => {

      //   })
      getEvents('init')

    } else {
      /** create user, set into database */
      const payload = {
        userAgent: navigator.userAgent,
        notifications: true,
        timeToNotification: 60000, /** TODO:change to => 2.7e+6 */
        accountCreated: new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      }
      /** set timer as global variable */
      window.timeToNotification = payload.timeToNotification

      /** save in database */
      db.collection('users')
      .add(payload)
      .then(ref => {
        payload.id = ref.id
        console.log('< USER SAVED IN DATABASE > ', payload)
        localStorage.setItem('symplometro-user', JSON.stringify(payload))
        getEvents('init')
      })
      .catch(error => {
        console.warn('< ERROR SAVE USER IN DATABASE > ', error)
        getEvents('init')
      })
    }

    /** start interval */
    setInterval(()=> {
      console.log('< SET INTERVAL : TIMER > ', window.timeToNotification)
      getEvents('refresh')
    }, window.timeToNotification || 2.7e+6) /* 2.7e+6 = 45 minutes */

  }

  function getEvents(action) {

    /** get events from database */
    db.collection('events')
    .doc('config')
    .get()
    .then(doc => {
      console.log('< FIRESTORE : GET DATA > ', doc.data())
      const eventsPayload = doc.data()
      /** verify notification */
      const userConfigs = localStorage.getItem('symplometro-user')
      /** if doesnt exist user, check/create one */
      if (userConfigs === null) checkUser()

      if (userConfigs) {
        const userPreferences = JSON.parse(userConfigs) 
        /** check actions and user preferences */
        if (action === 'refresh' && userPreferences.notifications) showNotification(eventsPayload.count)
      }
    })
    .catch(error => {
      console.warn('< DATABASE : GET : ERROR > ', error )
    })
  }

  function showNotification(data) {
    let options = {
      type: 'basic',
      iconUrl: './symplometro-128.png',
      message: data,
      title: 'Eventos Online',
      eventTime: 3000
    }
      
    console.log('< SHOW NOTIFICATION > ', options)

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