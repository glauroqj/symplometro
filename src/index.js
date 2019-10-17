import React from 'react'
import ReactDOM from 'react-dom'
/** style */
import './main.scss'
/** core */
import App from './App'
/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'

console.log('< ENV > ', process.env.NODE_ENV, secrets.CC_CREDENTIALS)

firebase.initializeApp(credentials)

ReactDOM.render(<App />, document.getElementById('root'))