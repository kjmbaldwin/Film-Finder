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

$('#search-btn').on('click', function(){

var ombdSearch = $('#search-input').val().trim()
var omdbURL = "https://www.omdbapi.com/?s=" + ombdSearch + "&y=&plot=short&apikey=15c27a54";

$.ajax({
  url: omdbURL,
  method: 'GET'
}).done(function(response){ 

  console.log(response);

});

 });

// omdb search setup
var omdbKey = 'trilogy';
// var omdbURL = 'http://img.omdbapi.com/?apikey=' + omdbKey;

var testImdbId = 'tt0083658'; // imdbID for bladerunner

movieInfoDisplay(testImdbId);
function movieInfoDisplay(imdbID) {
    var queryURL = "https://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&apikey=" + omdbKey;
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    	console.log('RESPONSE: ', response);
        var newDiv = $('<div>');

        var titleElement = $('<h2>').text(response.Title);
        newDiv.append(titleElement);

        // var rating = response.Rated;
        var ratingElement = $('<p>').text('Rating: ' + response.Rated);
        newDiv.append(ratingElement);

        // var plot = response.Plot;
        var plotElement = $('<p>').text('Plot: ' + response.Plot);
        newDiv.append(plotElement);

        // var posterURL = response.Poster;
        var posterElement = $('<img>');
        posterElement.attr('src', response.Poster);
        posterElement.attr('alt', response.Title);
        newDiv.append(posterElement);

        $('#movie-panel').prepend(newDiv);
    })
}
