const express = require('express')
const request = require('request')
const HTMLParser = require('node-html-parser')

const app = express()


/** admin */
const admin = require('firebase-admin')
const serviceAccount = {
  "type": "service_account",
  "project_id": "intricate-sweep-148912",
  "private_key_id": "b9542da6a2e56b777c9c9677240d0679074912f3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9yKmwiVJ35m5x\nZh9D5756IvXntWKMSERt1AGHZTJE71SXICikKpm33COaSIgTRzlCRWOiptEt0QvB\nC7LMVQz6pIY91juZAx71cYoWeYPRURJN6lIes+4fXuv59KuJn/H+Xmi2WdfartUT\nREMYQ5sIthpva5MpCkTpG5K3ysOKtvkrHUGXPpa00x2wBbVzqGrdNBqBlaKp/cT3\nqNYbeoYdk/9y9piScMxFkfWexWJB697tQCY+rHAmJY+BtjjgTtTbSeA5/HAZoElF\nXQnd9PMNkKm/fhCS5tBuSUgoLxeKxdoQi+XmgmwweY4S3ACawhicemB5j0g9HGqP\nWVPvG64lAgMBAAECggEACNnhdB7LblUcZISHQ8L8orSbtF1Exdce/eJL2fUxxX5F\n+zBgRNvJxIXrUSg91GxXcsxKq8zM566etjel9Jqo2s2uhxbFO8sl9/t+HbM4HxyB\nVontn4nzupnSNpufHnGLtznO92Y0R3os7NObr3eDtQHNNNIXEGxur1J+Yrz9pqvy\nSq/mncq+Si/SbzwdjZx6UMWbDL03tXuB9ovxGx14JfAnT9zPMn2LZkCrtf9aXE1N\ndKZm/oH8hxZJWrwgPhowEmXsM48qGI4iDsDYxi+cu6YhcpKVficvGK+6PuhBy1ec\n/L5XtTKTJFrksus83cODkWe+QzFLxpXCpkZUZqqxgQKBgQDwdBbmKjWNia3yzPT4\ng0h/Av/tNYSnJCDFRiZ2n/XFHXihoTuOFp5g1eFZSSZBACBdO9zPvHJD2RkaQNTG\nAThriaI5Ierp4MmQ46nvuyCQvI+aOtYISUxRFDGUppFmK1dW4oY5BjiYp8Et1YPb\ny1kjDuZXUNHlskDt0KMUj/NOwQKBgQDKDefNfD+uAY0OfSwPa2jY8cmngpGth4Uv\nbgKMdGSciE+GhfaWHyAyP3uDMY8vsSKB6AJAsqPJS5k2+qcoDusC4NYLj4659vzH\nIdf+iSWiU3HJu4ONGsTmIZ0sBRIYwtuTsRKT6drSPeGfB8mmrHOxrPXuspjeuHWe\n1KhfCCCcZQKBgFdX9BF7d6SIRJWT+dBj7+ujLU//RsZoCzddug8RH/eQMweTR8zf\nTnyidI84URr/bsIvQpB7RY57x/CPaDrcqp/1iOXz+h8mtlFZQZuBf9zTgd5mTOUJ\nqx0wlqoGr35LdBhthJAmQFzDYxrBGnq2rRRdDzLcesJTM96vEO4hNCKBAoGBALD8\naTWHRkhnN2Wfoz6GeTq+4EKIjo6QDMu08yqQsaijhfVx1sM81HjvPoN2n9PIt09P\nKNn/IJSsUbLk8BKYrqbAxv0tbHncrSLItGhTPdHogd2REPRCpIJoo0Hx1x41YR0H\nmBxUVcafSciBi9Mhb94MgQfrDRjaPr03zZwghGA5AoGBAKWdwR4vRMGrPukGjLKh\nAxKDTIyarPSohyoPSbOn9JX8jN7/q/FuUPN2ZtzX9Ihw0UbQQci0HCBsZUNXZeka\nPUnDZgFZD8OsSC7zVt8E4iQXB5LtDsXD5P68KqnBBvvxRrNo++25xWT2rE6z5YEq\nckBaWDgYCGmh8BUnAI4AL9D3\n-----END PRIVATE KEY-----\n",
  "client_email": "symplometro@intricate-sweep-148912.iam.gserviceaccount.com",
  "client_id": "114953831382490472507",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/symplometro%40intricate-sweep-148912.iam.gserviceaccount.com"
}
// JSON.parse(process.env.SERVICE_ACCOUNT)
// const credentials = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: "symplometro"
// }
app.use((req, res, next) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://symplometro.firebaseio.com'
  })
  console.log('< DATABASE URL > ', process.env.DATABASE_URL)
  /** firestore */
  res.db = admin.database()
  next()
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

      let oldCount = 0
      await res.db.ref('/events')
      .once('value', snapshot => {
        console.log('< DATABASE : GET > ', snapshot.val() )
      })
      
      // const actualValue = Number( DOM.querySelectorAll('h1 span strong')[0].innerHTML.replace(' eventos.','') )

      // const payload = {
      //   count: actualValue,
      //   topCount: oldCount > actualValue ? oldCount : actualValue
      // }
      
      // console.log('< FIRESTORE : SEND > ', payload)

      res.status(200).send(payload)
      res.end()
    }
  })

})


app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('< SERVER STARTED > ')
})