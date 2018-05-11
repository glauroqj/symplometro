/*
  State Tree: An object containing the data.
  Getters: Used to access data from the state tree of the store.
  Mutations: Handler functions that perform modifications of data in the state tree.
  Actions: Functions that commit mutations. The main difference to Mutations is that Actions can contain asynchronous operations.

  */

  (function() {

    const popup = {
      mutations: {
        popupGetInfoMutation(state, payload) {
          window.store_popup.state.popup = payload;
          window.store_popup.dispatch('popupLoadingAction', false);
        },
        popupLoadingMutation(state, payload) {
          window.store_popup.state.loading = payload;
        },
      }, /* mutations */
      actions: {
        popupLoadingAction(state, action) {
          // console.log('Init loading', action)
          if( action == true ) {
            window.store_popup.commit('popupLoadingMutation', action);
            return false;
          }
          /* removing loading timeout 750ms */
          setTimeout(()=> {
            window.store_popup.commit('popupLoadingMutation', action);
          }, 550);
        },
        popupGetInfoAction() {
          /* verify on local storage */
          let verifyLocalStorage = localStorage.getItem('Count-Event');

          if( verifyLocalStorage != '' && verifyLocalStorage != undefined ) {
            console.log( 'Exist events: ', verifyLocalStorage )
            let payload = {
              events: verifyLocalStorage
            };
            window.store_popup.commit('popupGetInfoMutation', payload);
            return false;
          }

          /* info to wait next request */
          let payload = {
            events: 'Aguardando receber os dados...'
          };
          window.store_popup.commit('popupGetInfoMutation', payload);

          // setTimeout(()=> {
          //   window.store_popup.dispatch('popupLoadingAction', false);
          // }, 3000)
          // let urlCall = 'https://www.sympla.com.br/index.html'
          // $.ajax({
          //   url: urlCall,
          //   method: 'GET',
          //   // contentType: 'application/json',
          //   xhrFields: {
          //     withCredentials: false
          //   },
          //   crossDomain: true,
          // })
          // .done(function(data) {
          //   let parser = new DOMParser();
          //   let domResponse = parser.parseFromString(data, 'text/html')
          //   // console.log( $(domResponse).find('h1 span strong').text() );
          //   const countEvents = $(domResponse).find('h1 span strong').text();
          //   let payload = {
          //     events: countEvents
          //   };
          //   window.store_popup.commit('getInfoMutation', payload);
          // })
          // .fail(function(error) {
          //   console.log('Error: ', error)
          // });
        },
      }, /* actions */
      getters: {
       popupActualStateGetter() {
        return window.store_popup.state.popup;
      },
      popupActualLoading() {
        return window.store_popup.state.loading;
      },
    }

  };

  window.store_popup = new Vuex.Store({
    state: {
     popup: {},
     loading: true
   },
   modules: {
     popup: popup
   }
 });

})();



//   $.ajax({
//     url: urlCall,
//     method: 'GET',
//     dataType: 'jsonp',
//     xhrFields: {
//      withCredentials: false
//    },
//    crossDomain: true,
//    beforeSend: function(xhr) {
//     xhr.setRequestHeader('Access-Control-Allow-origin', 'true');
//   },
// })
//   .done(function(data) {
//     console.log(data)
//   })
//   .fail(function(error) {
//     console.log('Error: ', error)
//   });