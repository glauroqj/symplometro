/*
  State Tree: An object containing the data.
  Getters: Used to access data from the state tree of the store.
  Mutations: Handler functions that perform modifications of data in the state tree.
  Actions: Functions that commit mutations. The main difference to Mutations is that Actions can contain asynchronous operations.

  */

  (function() {
 
    const popup = {
      mutations: {
       popupLoadMutation(state, payload) {
        window.store_popup.state.popup = payload;
      },
      getInfoMutation(state, payload) {
        window.store_popup.state.popup = payload;
      }
    }, /* mutations */
    actions: {
      getInfoAction() {
        /* SHOW loading */
        let urlCall = "http://anyorigin.com/go?url=" + encodeURIComponent("https://www.globo.com/")+"&callback=?";
         $.ajax({
          url: urlCall,
          method: 'GET',
        })
        .done(function(data) {
          console.log(data)
        })
        .fail(function(error) {
          console.log('Error: ', error)
        });
        // window.store_popup.commit('getInfoMutation', payload);
      },
  			// popupLoadAction() {
  			// 	let localStorageImages = localStorage.getItem('Images-Gallery');

  			// 	if( localStorageImages == '' || localStorageImages == undefined || localStorageImages == null ) {
  			// 		let payload = {
  			// 			countImages: '',
  			// 			emptyStore: true,
  			// 			textGallery: 'Empty gallery'
  			// 		}
  			// 		window.store_popup.commit('popupLoadMutation', payload);
  			// 		return false
  			// 	}

  			// 	let payload = {
  			// 		countImages: localStorageImages.split(','),
  			// 		emptyStore: false,
  			// 		textGallery: 'Gallery'
  			// 	}
  			// 	window.store_popup.commit('popupLoadMutation', payload);
  			// 	/* call MUTATION to change store state */
  			// 	// window.store.commit('organizerSetHostIndex', payload);

  			// }
  		}, /* actions */
  		getters: {
  			popupActualStateGetter() {
  				return store_popup.state.popup;
  			}
  		}

  	};

  	window.store_popup = new Vuex.Store({
  		state: {
  			popup: {}
  		},
  		modules: {
  			popup: popup
  		}
  	});

  })();