import React from 'react'
import ReactDOM from 'react-dom'
/** style */
import './main.css'
/** core */
import App from './App'
/** firebase */
// import firebase from "firebase/app";
// import { credentials } from "./credentials";

console.log('< ENV > ', process.env.NODE_ENV)

// firebase.initializeApp(credentials)

ReactDOM.render(<App />, document.getElementById('root'))
