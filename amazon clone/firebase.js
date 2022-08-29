var firebaseConfig = {
  apiKey: "AIzaSyDlJxJkvDNp7qQvT2FBEDShWAoBixYvYkY",
  authDomain: "clone-two-7d212.firebaseapp.com",
  projectId: "clone-two-7d212",
  storageBucket: "clone-two-7d212.appspot.com",
  messagingSenderId: "813532939822",
  appId: "1:813532939822:web:cf75e5de12acaa20ee81bf"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);