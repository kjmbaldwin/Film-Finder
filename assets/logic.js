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


//api keys
var OmdbKey = '15c27a54';

// $('#search-input').onkeypress(function(){ 

// });


$('#search-btn').on('click', function(){

  var OmdbSearch = $('#search-input').val().trim();

  $.ajax({
  url: 'https://www.omdbapi.com/?s=' + OmdbSearch + '&plot=short&apikey=' + OmdbKey,
  method: "GET"
  }).done(function(response) {

    var movieArr = response.Search;
    console.log(movieArr);
    
    for (var i = 0; i < movieArr.length; i++) {
      var $results = $('<div>').addClass("panel panel-default").text(movieArr[i].Title);
      $('#results').append($results);
    
    }
  
  });
});






 // on click search-btn