 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyB1Fadv4nhZxGtIMn17wwtemfUfMBMPhNA",
    authDomain: "rps-multiplayer-ca25e.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-ca25e.firebaseio.com",
    projectId: "rps-multiplayer-ca25e",
    storageBucket: "",
    messagingSenderId: "659969455293",
    appId: "1:659969455293:web:e6164a145c257521"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();