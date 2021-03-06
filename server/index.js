const express = require('express')
const request = require('request')
const HTMLParser = require('node-html-parser')

const app = express()

const environment = process.env.NODE_ENV || 'development'
console.log('< ENV > ', environment)

/** admin */
const admin = require('firebase-admin')
const serviceAccount = environment === 'development' ? require('./localAUTH.json') : JSON.parse(process.env.SERVICE_ACCOUNT)

console.log('< ADMIN INITIALIZE > ')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://symplometro.firebaseio.com'
})

app.use((req, res, next) => {
  /** firebase database  */
  const db = admin.firestore()
  res.adminDatabase = db

  db.collection('events')
    .doc('config')
    .get()
    .then(doc => {
      console.log('< FIRESTORE : GET DATA > ', doc.data())
      res.payloadDatabase =  doc.data()
      next()
    })
    .catch(error => {
      console.warn('< DATABASE : GET : ERROR > ', error )
      res.status(500).end()
    })

})

app.get('/', (req, res) => {
  res.status(200).send('HEALTH')
  res.end()
})

app.get('/get-information/:site', (req, res) => {
  
  const options = {
    url: 'https://www.'+req.params.site+'.com.br',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  }

  console.log('Visiting page ' + options.url)

  request(options, async (error, response, body) => {
    if (error) {
      console.log('< ERROR > ', error)
      res.status(500).send('Something broke!')
    }
  
    console.log('< STATUS CODE > ' + response.statusCode)
  
    if (response.statusCode === 200) {
      console.log('< BODY > ', typeof body)
      const DOM = HTMLParser.parse(body)
      
      const actualValue = DOM.querySelectorAll('h1 span strong')[0].innerHTML.replace(' eventos.','')
      
      console.log(`< ACTUAL VALUE > ${actualValue} - < TOP VALUE > ${res.payloadDatabase.topCount}`)

      const payload = {
        count: String(actualValue),
        topCount: String(res.payloadDatabase.topCount) > String(actualValue) ? String(res.payloadDatabase.topCount) : String(actualValue)
      }
      
      console.log('< FIRESTORE : SEND > ', payload)

      res.adminDatabase
        .collection('events')
        .doc('config')
        .update(payload)
        .then(() => {
          res.status(200).send('< UPDATE DONE >')
          res.end()
        })
        .catch(() => {
          console.warn('< ERROR TO SAVE IN DATABASE >')
          res.status(500).send('ERROR TO SAVE IN DATABASE')
          res.end()
        })

    }
  })

})


app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('< SERVER STARTED > ')
})

/*
  DOC: https://firebase.google.com/docs/database/web/read-and-write
*/