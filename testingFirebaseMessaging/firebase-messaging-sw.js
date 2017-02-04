// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyAhV8qputTImKp3Z5DwwpUmT8lyNRktCfc",
    authDomain: "palfinder-6d55f.firebaseapp.com",
    databaseURL: "https://palfinder-6d55f.firebaseio.com",
    storageBucket: "palfinder-6d55f.appspot.com",
    messagingSenderId: "673459070337"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();