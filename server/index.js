const express = require('express')
const request = require('request')
const HTMLParser = require('node-html-parser')

const app = express()


/** admin */
const admin = require('firebase-admin')
const credentials = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: "symplometro"
}
admin.initializeApp(credentials)

/** firestore */
const db = admin.firestore()

app.get('/', function(req, res) {
  res.status(200).send('HEALTH')
  res.end()
})

app.get('/get-information/:site', function(req, res) {
  
  const options = {
    url: 'https://www.'+req.params.site+'.com.br',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  }

  console.log('Visiting page ' + options.url)

  request(options, (error, response, body) => {
    if (error) {
      console.log('< ERROR > ', error)
      res.status(500).send('Something broke!')
    }
  
    console.log('Status code: ' + response.statusCode)
  
    if (response.statusCode === 200) {
      console.log('< DONE > ', typeof body)
      const DOM = HTMLParser.parse(body)

      let oldCount = 0
      db.collection('events').doc('config')
      .get()
      .then((doc) => {
        console.log('< OLV VALUE COUNT > ', doc.data())
        oldCount = doc.data().count
      })
      
      const actualValue = Number( DOM.querySelectorAll('h1 span strong')[0].innerHTML.replace(' eventos.','') )

      const payload = {
        count: actualValue,
        topCount: oldCount > actualValue ? oldCount : actualValue
      }
      
      console.log('< FIRESTORE > ', payload)
      
      db.collection('events').doc('config').set(payload, { merge: true })

      res.status(200).send(payload)
      res.end()
    }
  })

})


app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('< SERVER STARTED > ')
})