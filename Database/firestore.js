
import * as React from 'react';
import * as firebase from 'firebase';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
require('firebase/auth')
const firebaseConfig = {
    apiKey: "AIzaSyDoF1cY6tZXj72KTzqdZgCuvPNhCB2E3hc",
    authDomain: "ingkungguwosari-3ce59.firebaseapp.com",
    databaseURL: "https://ingkungguwosari-3ce59.firebaseio.com",
    projectId: "ingkungguwosari-3ce59",
    storageBucket: "ingkungguwosari-3ce59.appspot.com",
    messagingSenderId: "921111554796",
    appId: "1:921111554796:web:2b3d5d31d4aff82f6e13c9",
    measurementId: "G-993N795LND"
  };
  firebase.initializeApp(config);

  firebase.firestore().settings(settings);
  
  export default firestore;

