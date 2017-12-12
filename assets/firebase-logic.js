var config = {
  apiKey: "AIzaSyBlAgFLX4MoD4fxQ8b_O-FCJ4SvNyFGPtg",
  authDomain: "api-group-project.firebaseapp.com",
  databaseURL: "https://api-group-project.firebaseio.com",
  projectId: "api-group-project",
  storageBucket: "api-group-project.appspot.com",
  messagingSenderId: "1016861619283"
};
firebase.initializeApp(config);

var database = firebase.database();

var uid;

//##### USER ACCOUNT SETUP #####

//Sign in/Sign out Button functions
function toggleSignIn() {

  //hide error messages if are any
  $('#valid-email-alert').hide();
  $('#strong-password-alert').hide();


  //Sign out:
  //If there is a user, and the button is pressed, sign out.
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    uid = null;

  } 

  //if there is no user signed in already:
  else {
    var email = $('#usrname').val().trim();
    var password = $('#psw').val().trim();
    
    //validate email and pass
    if (email.length < 6) {
      $('#valid-email-alert').show();
      return;
    }
    if (password.length < 4) {
      $('#strong-password-alert').show();
      return;
    }


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      if (errorCode === 'auth/wrong-password') {
        $('#valid-email-alert').text('Wrong email or password').show();
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('sign-in-btn').disabled = false;
    });

  }
  document.getElementById('sign-in-btn').disabled = true;

  //close modal after signing in.
  $('#myModal').modal('toggle');
}

//Sign up button function
function handleSignUp() {

  //hide error messages if are any
  $('#valid-email-alert').hide();
  $('#strong-password-alert').hide();

  var email = $('#usrname').val().trim();
  var password = $('#psw').val().trim();
  
    if (email.length < 6) {
      $('#valid-email-alert').show();
      return;
    }
    if (password.length < 4) {
      $('#strong-password-alert').show();
      return;
    }

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // var pushUID = 


    if (errorCode == 'auth/weak-password') {
      $('#valid-email-alert').text('Wrong email or password').show();
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

  console.log('i think i forgot to save');
  console.log("a new user was just create: " + firebase.auth().currentUser.uid);



}

//setup firebase listener.
function initApp() {



  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in, this is all of the available info:
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      uid = user.uid;
      var providerData = user.providerData;

      //if a user is signed in, set button to read Sign out
      $('#sign-in-btn').text('Log Out');
      // $('#login-link').('Log Out');

      //update welcome messasge
      var current = firebase.auth().currentUser.email
      var split = current.split('@')
      $('#welcome').text('Welcome back, ' + split[0]);

      newUID(uid);

    } else {
      // if user is signed out, set button to say sign in
      $('#sign-in-btn').text('Log In');
      $('#welcome').text('Welcome to Film Finder! To save movies, please sign up or log in!');
      // $('#login-link').text('Log In');
    }
    
    document.getElementById('sign-in-btn').disabled = false;
  });

  document.getElementById('sign-in-btn').addEventListener('click', toggleSignIn, false);
  document.getElementById('sign-up-btn').addEventListener('click', handleSignUp, false);
}

//on load start the listener function
window.onload = function() {
  initApp();
};

// writes UIDs to the database.
function newUID(data){

  database.ref().once('value').then(function(snapshot){
    // console.log('current UIDs: ' + snapshot.val());

    setTimeout(function(){
      if(!snapshot.child(data).exists()){
        database.ref().child(data).set('initialized');
        console.log('I just added ' + uid + 'to the database');
      }
    }, 5000);
    
  });
}

