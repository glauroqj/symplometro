(function() {
	/* initial verification */
	getEvents('init');
	// let verifyLocalStorage = localStorage.getItem('Count-Event');
	// if( verifyLocalStorage === '' && verifyLocalStorage === undefined ) {
	// 	/* init */
	// 	console.log('INITIAL call info')
		
	// 	return false;
	// }

	setInterval(()=> {
		let verifyLocalStorage = localStorage.getItem('Count-Event');

		if( verifyLocalStorage != '' && verifyLocalStorage != undefined ) {
			console.log( 'REFRESH call info ', verifyLocalStorage )
			getEvents('refresh');
			return false;
		}
	}, 1.5e+6); /* 1 minute */

	function getEvents(action) {
		let urlCall = 'https://www.sympla.com.br/index.html'
		$.ajax({
			url: urlCall,
			method: 'GET',
			xhrFields: {
				withCredentials: false
			},
			crossDomain: true,
		})
		.done(function(data) {
			const parser = new DOMParser();
			const domResponse = parser.parseFromString(data, 'text/html');
			const countEvents = $(domResponse).find('h1 span strong').text();
			localStorage.setItem('Count-Event', countEvents);
			if(action === 'refresh') {
				showNotification(countEvents);
			}
		})
		.fail(function(error) {
			console.log('Error: ', error)
		});
	};

	function showNotification(data) {
		let options = {
			type: 'basic',
			iconUrl: './images/symplometro-20.png',
			message: data,
			title: 'Eventos Online'
		}
		if (Notification.permission === 'granted') {
			// let notification = new Notification('', options);
			let notification = chrome.notifications.create('', options);
			setTimeout(() => {
				// notification.close();
			}, 15000);
			// notification.onclick = () => {
			// 	chrome.tabs.create({
			// 		url: chrome.extension.getURL('pages/popup.html'),
			// 		active: true
			// 	}, function(tab) {
			// 		chrome.windows.create({
			// 			tabId: tab.id,
			// 			type: 'popup',
			// 			height: 500, 
			// 			width: 550,
			// 			focused: true
			// 		});
			// 	});
			// }
			return false;
		}

		if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					// let notification = new Notification('',options);
					let notification = chrome.notifications.create('', options);
					setTimeout(() => {
						// notification.close();
					}, 15000);
					// notification.onclick = () => {
					// 	chrome.tabs.create({
					// 		url: chrome.extension.getURL('pages/popup.html'),
					// 		active: true
					// 	}, function(tab) {
					// 		chrome.windows.create({
					// 			tabId: tab.id,
					// 			type: 'popup',
					// 			height: 500, 
					// 			width: 550,
					// 			focused: true
					// 		});
					// 	});
					// }
				}
			});
			return false;
		}
	} /* end notification */

	// const today = moment().format('DD/MM/YYYY');
	// if( today == '08/03/2018' ) {
	// 	console.log('Reset localStorage, update to path encode64: 08/03/2018')
	// 	localStorage.removeItem('Images-Gallery');
	// }

	// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// 	let store = localStorage.getItem('Images-Gallery');

	// 	if( store == '' || store == undefined || store == null ) {
	// 		let arr = [];
	// 		/* convert path to base64 */
	// 		let encode = window.btoa(request.link)
	// 		console.log(request.link)
	// 		console.log(encode)
	// 		arr.push(encode)
	// 		localStorage.setItem('Images-Gallery', arr);

	// 		// insertMessage('message', 'Imagem enviada para galeria!');
	// 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 			chrome.tabs.sendMessage(tabs[0].id, {"message": "insert_message_gallery"}, function(response) {
	// 				console.log(response);
	// 			});
	// 		});

	// 		// window.open(request.link);
	// 		chrome.tabs.create({url: request.link, active: false});
	// 		return false;
	// 	}

	// 	/* get new store and create encode again */
	// 	let arrayStore = store.split(',');
	// 	let encode = window.btoa(request.link);
	// 	console.log(arrayStore)


	// 	 verify if link exist on storage 
	// 	let hasLinkOnStorage = false; 
	// 	arrayStore.filter(function(value, index) {
	// 		console.log(value, encode)
	// 		if( value == encode ) {
	// 			hasLinkOnStorage = true;
	// 			return false;
	// 		}
	// 	});


	// 	if( !hasLinkOnStorage ) {
	// 		/* convert path to base64 */
	// 		let encode = window.btoa(request.link)
	// 		console.log(request.link)
	// 		arrayStore.push(encode)
	// 		localStorage.setItem('Images-Gallery', arrayStore);

	// 		// insertMessage('message', 'Imagem enviada para galeria!');
	// 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 			chrome.tabs.sendMessage(tabs[0].id, {"message": "insert_message_gallery"}, function(response) {
	// 				console.log(response);
	// 			});
	// 		});

	// 		// window.open(request.link);
	// 		chrome.tabs.create({url: request.link, active: false});
	// 		return false;
	// 	}

	// 	// insertMessage('message', 'Imagem já está na galeria!');
	// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 		chrome.tabs.sendMessage(tabs[0].id, {"message": "insert_message_on_gallery"}, function(response) {
	// 			console.log(response);
	// 		});
	// 	});
	// 	// window.open(request.link);
	// 	chrome.tabs.create({url: request.link, active: false});

	// });

})();