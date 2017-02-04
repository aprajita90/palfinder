
var config = {
    apiKey: "AIzaSyAhV8qputTImKp3Z5DwwpUmT8lyNRktCfc",
    authDomain: "palfinder-6d55f.firebaseapp.com",
    databaseURL: "https://palfinder-6d55f.firebaseio.com",
    storageBucket: "palfinder-6d55f.appspot.com",
    messagingSenderId: "673459070337"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.requestPermission()
  .then(function() {
    console.log('have permission');
    return messaging.getToken();
  })
  .then(function(token) {
    console.log(token);
  })
  .catch(function(err) {
    console.log('Error occured! ', err);
  })

messaging.onMessage(function(payload) {
  console.log('onMessage :', payload);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);
    // ...
  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});
