(function() {
  getEvents('init')

  setInterval(()=> {
		let verifyLocalStorage = localStorage.getItem('Count-Event')

		if (verifyLocalStorage != '' && verifyLocalStorage != undefined) {
			getEvents('refresh')
			return false;
		}
	}, 2.7e+6) /* 2.7e+6 = 45 minutes */

  function getEvents(action) {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      // Process our return data
      if (xhr.status >= 200 && xhr.status < 300) {
        // What do when the request is successful
        // console.log('success!', xhr)
        const parser = new DOMParser()
        const domResponse = parser.parseFromString(xhr.responseText, 'text/html')
        // console.log('DOM RESPONSE: >>>> ', domResponse)
        const countEvents = domResponse.querySelectorAll('h1 span strong')[0].innerText
        // console.log('Events >>>>>>>> ', countEvents)
        localStorage.setItem('Count-Event', countEvents)

        const onlyNumbers = countEvents.split(' ')[0].split('.')[0]

        chrome.browserAction.setBadgeText({text: `${onlyNumbers}K`})

        if (action === 'refresh') {
          showNotification(countEvents)
        }

      } else {
        // What do when the request fails
        console.log('The request failed!')
      }
    }
    
    xhr.open('GET', 'https://www.sympla.com.br/index.html')
    xhr.send()
  }

  function showNotification(data) {
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