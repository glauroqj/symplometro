import React from 'react'
import ReactDOM from 'react-dom'
/** style */
import './main.scss'
/** firebase */
import firebase from 'firebase/app'
import {credentials} from './credentials'
/** core */
import App from './App'

firebase.initializeApp(credentials)

ReactDOM.render(<App />, document.getElementById('root'))