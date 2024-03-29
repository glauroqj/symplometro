const INTERVAL_ALARM_VALUE = 40
// Add a listener for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  // When the alarm fires, set the icon path
  // chrome.action.setIcon({
  //   path: getRandomIconPath(),
  // });
  // console.log('< ALARMS LISTENER > ', alarm)
  if (alarm?.name === 'fetchSiteData') {
    fetchSite('https://www.sympla.com.br', true)
    startAlarm('fetchSiteData', INTERVAL_ALARM_VALUE)
  }
})
// Listen for tab activation
chrome.runtime.onMessage.addListener(
  function (message, sender, senderResponse) {
    // console.log('< BG > ', message, sender)
    if (message.type === 'callSite') {
      fetchSite(message.url).then((resp) => {
        // console.log('< GET HTML HERE > ', resp)
        if (!!resp) senderResponse(resp)
      })
    }
    return true
  }
)

// Start the alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Start an alarm with the specified name and delay in minutes
  // console.log('< ON INSTALLED >')
  fetchSite('https://www.sympla.com.br')
  startAlarm('fetchSiteData', INTERVAL_ALARM_VALUE)
})

// --------------- METHODS -------------------

async function fetchSite(url, hasNotification = false) {
  try {
    const responseRaw = await fetch(url)

    if (!responseRaw.ok) {
      throw new Error('Failed to fetch HTML')
    }
    const html = await responseRaw.text()

    // Sample HTML content
    const htmlContent = html

    // Regular expression to match the pattern of the text
    const regex = /<strong>([\d.]+)<\/strong>\s+eventos disponíveis/

    // Match the pattern in the HTML content
    const match = htmlContent.match(regex)

    // Extract the value if a match is found
    if (match && match.length > 1) {
      const value = match[1] // Extracted value
      // console.log('< FINAL VALUE >', value) // Output: 41.310

      handleBadge(value)

      if (hasNotification) handleNotification(value)

      return value
    } else {
      console.log('Value not found or pattern mismatch')
      return '---'
    }
  } catch (e) {
    console.error('Error fetching data:', e)
  }
}

function handleNotification(value) {
  const template = {
    type: 'basic',
    iconUrl: './symplometro-128.png',
    message: `${value} eventos`,
    title: 'Symplômetro informa:',
    priority: 2
  }

  // console.log('< HANDLE NOTIFICATION  > ', value)

  // eslint-disable-next-line
  chrome.notifications.create('notification-symplometro', template)

  setTimeout(function () {
    // eslint-disable-next-line
    chrome.notifications.clear('notification-symplometro')
  }, 10000)
}

function handleBadge(badgeValue) {
  const convertedNumber = badgeValue.split('.')
  // eslint-disable-next-line
  chrome.action.setBadgeText({ text: `${convertedNumber[0]}k` })
}

// Function to start an alarm
async function startAlarm(name, duration) {
  // console.log('< START ALARM > ', name, duration)
  // Create an alarm with the specified name and delay in minutes
  await chrome.alarms.create(name, { periodInMinutes: duration })
  // try {
  // } catch (e) {
  //   console.error('Error start alarm:', e)
  // }
}

// setInterval(fetchSite('https://www.sympla.com.br'), 10000)

// async function fetchDataAndSave() {
//   try {
//     const responseRaw = await fetch('https://www.sympla.com.br')

// if (!responseRaw.ok) {
//   throw new Error('Failed to fetch HTML')
// }
//     const html = await responseRaw.text()
//     const parser = new DOMParser()

//     const doc = parser.parseFromString(html, 'text/html')

//     const value = doc.querySelector(
//       '#navbar > div > span > span > strong'
//     ).textContent

//     console.log('< background - responseRaw > ', value)
//     // Save data to local storage
//     // if (!!chrome) {
//     //   chrome.storage.local.set({ data: data }, function () {
//     //     console.log('Data saved to local storage:', data)
//     //   })
//     // }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }

// Initial fetch and save
// fetchDataAndSave()

// Set up periodic fetching using setInterval
// setInterval(fetchDataAndSave, 30 * 60 * 1000) // 30 minutes
// setInterval(fetchDataAndSave, 10000)

// ;(function () {
// const credentials = {
//   apiKey: "AIzaSyAOq1-ibTMS4HChhuxpCeCwUFFQai16I1c",
//   authDomain: "symplometro.firebaseapp.com",
//   databaseURL: "https://symplometro.firebaseio.com",
//   projectId: "symplometro",
//   storageBucket: "symplometro.appspot.com",
//   messagingSenderId: "106786872116",
//   appId: "1:106786872116:web:9c7693352d516bb425e361"
// }
// firebase.initializeApp(credentials)
// const db = firebase.firestore()
// /** start interval */
// setInterval(function() {
//   // console.log('< SET INTERVAL : TIMER > ')
//   getEvents('refresh')
// }, 10000) /* 2700000 = 45 minutes */
// function logIn() {
//   return new Promise(resolve => {
//     firebase.auth().signInAnonymously()
//     .then(() => {
//       console.log('< LOG IN : DONE > ')
//       checkUser()
//       resolve(true)
//     })
//     .catch(error => console.log('< LOG IN : ERROR > ', error), getEvents('init'), resolve(false))
//   })
// }
// function checkUser() {
//   /** check user */
//   let symplometroUser = localStorage.getItem('symplometro-user')
//   const payload = {
//     version: '0.2.3',
//     userAgent: navigator.userAgent,
//     notifications: true,
//     timeToNotification: 2.7e+6, /** TODO:change to => 2.7e+6 */
//     accountCreated: new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
//   }
//   if (symplometroUser !== null) {
//     /** user exist, get configs from database and call getEvents */
//     const user = JSON.parse(symplometroUser)
//     db.collection('users')
//       .doc(user.id)
//       .set(payload, {merge:true})
//       .then(() => {
//         payload.id = user.id
//         localStorage.setItem('symplometro-user', JSON.stringify(payload))
//         getEvents('init')
//       })
//       .catch(error => {
//         console.warn('< ERROR UPDATE USER IN DATABASE > ', error)
//         getEvents('init')
//       })
//   } else {
//     /** create user, set into database */
//     /** save in database */
//     db.collection('users')
//       .add(payload)
//       .then(ref => {
//         payload.id = ref.id
//         // console.log('< USER SAVED IN DATABASE > ', payload)
//         localStorage.setItem('symplometro-user', JSON.stringify(payload))
//         /** expose user id in window */
//         window.userID = ref.id
//         getEvents('init')
//       })
//       .catch(error => {
//         console.warn('< ERROR SAVE USER IN DATABASE > ', error)
//         getEvents('init')
//       })
//   }
// }
// function getEvents(action) {
//   const notificationPayload = localStorage.getItem('symplometro-data')
//   if (notificationPayload === null) localStorage.setItem('symplometro-data', JSON.stringify({notification: true}))
//   /** get events from database */
//   db.collection('events')
//   .doc('config')
//   .get()
//   .then(doc => {
//     // console.log('< FIRESTORE : GET DATA > ', doc.data())
//     const eventsPayload = doc.data()
//     /** show badge */
//     const onlyNumbers = doc.data().count.split(' ')[0].split('.')[0]
//     chrome.browserAction.setBadgeText({text: `${onlyNumbers}K`})
//     /** verify notification */
//     const userConfigs = localStorage.getItem('symplometro-user')
//     /** if doesnt exist user, check/create one */
//     if (userConfigs === null) logIn()
//     if (userConfigs) {
//       /** check actions and user preferences */
//       if (action === 'refresh') showNotification(eventsPayload.count)
//     }
//   })
//   .catch(error => {
//     console.warn('< DATABASE : GET : ERROR > ', error )
//   })
// }
// function showNotification(data) {
//   const notificationPayload = localStorage.getItem('symplometro-data')
//   if (notificationPayload !== null) {
//     const notification = JSON.parse(notificationPayload).notification
//     if (!notification) return false
//   }
// let options = {
//   type: 'basic',
//   iconUrl: './symplometro-128.png',
//   message: data,
//   title: 'O show vai continuar time =]', /** Eventos Online */
//   eventTime: 3000
// }
//   // console.log('< SHOW NOTIFICATION > ', options)
//   if (Notification.permission === 'granted') {
// 		// let notification = new Notification('', options);
// 		chrome.notifications.create('', options)
// 		return false
// 	}
//   if (Notification.permission !== 'denied') {
// 		Notification.requestPermission(function(permission) {
// 			if (permission === 'granted') {
// 				chrome.notifications.create('', options)
// 			}
// 		})
// 		return false
// 	}
// }
// /** init */
// logIn()
// })()
