const functions = require('firebase-functions')
const request = require('request')

const admin = require('firebase-admin')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getEvents = functions.https.onRequest(async (req, res) => {
 
  const db = admin.database().collection('events').doc('config')

  res.send('< FINAL DB > ', db)
  // const options = {
  //   url: 'https://symplometro.herokuapp.com/get-information/sympla',
  //   headers: {
  //     'User-Agent':
  //       'Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
  //   }
  // }

  // request(options, function(error, response, body) {
  //   if (error) {
  //     console.log('< ERROR > ', error)
  //     res.status(500).send('Something broke!')
  //   }
  
  //   console.log('Status code: ' + response.statusCode)
  
  //   if (response.statusCode === 200) {
            

  //     res.status(200).send(payload)
  //     res.end()
  //   }
  // })

})
