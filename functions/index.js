const express = require('express')

const app = express()

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()


app.get('/information', (req, res) => {

  axios.get('https://sympla.com.br')
  .then(response => {
    console.log('< RESPONSE > ', response)
  })
  .catch(error => console.warn('< GET : ERROR > ', error))
  
  
})