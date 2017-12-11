// var config = {
//   apiKey: "AIzaSyBlAgFLX4MoD4fxQ8b_O-FCJ4SvNyFGPtg",
//   authDomain: "api-group-project.firebaseapp.com",
//   databaseURL: "https://api-group-project.firebaseio.com",
//   projectId: "api-group-project",
//   storageBucket: "api-group-project.appspot.com",
//   messagingSenderId: "1016861619283"
// };
// firebase.initializeApp(config);

// var database = firebase.database();


//##### OMDB API Calls #########

var omdbKey = '15c27a54';

//Search from using user input
$('#search-btn').on('click', function(){

  var ombdSearch = $('#search-input').val().trim()
  var omdbURL = "https://www.omdbapi.com/?s=" + ombdSearch + "&y=&plot=short&apikey=" + omdbKey;

  $.ajax({
    url: omdbURL,
    method: 'GET'
  }).done(function(response){ 

  console.log(response);

  });
});



var testImdbId = 'tt0083658'; // imdbID for bladerunner

function movieInfoDisplay(imdbID) {
    var queryURL = "https://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&apikey=" + omdbKey;
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    	console.log('RESPONSE: ', response);
        var newDiv = $('<div>');

        var movieYear = response.Year;
        var director = response.Director;
        var runTime = response.Runtime;
        var genre = response.Genre;
        var actors = response.Actors;


        var titleElement = $('<div>');
        var titleDiv = $('<div>');
        var detailDiv = $('<div>');

        var titleSpan = $('<span>').text(response.Title).addClass('movie-title');
        var year = $('<span>').text( " (" + response.Year + ")");
        titleDiv.append(titleSpan).append(year);
        
        var detailSpan = $('<span>').text(response.Rated + " | " + runTime + " | " + genre + " | " + response.Released);
        detailDiv.append(detailSpan);

        titleElement.append(titleDiv).append(detailDiv);

        

        var posterRow = $('<div>').addClass('row');
        
              

        // var posterURL = response.Poster;
        var posterElement = $('<img>');
        posterElement.attr('src', response.Poster);
        posterElement.attr('alt', response.Title);
        posterElement.addClass("poster");
        var posterDiv = $('<div>').addClass('col-lg-4 col-md-4 col-sm-3').append(posterElement);


        posterRow.append(posterDiv);

        

        var detailRow = $('<div>').addClass('col-lg-8 col-md-8 col-sm-9');


        // var plot = response.Plot;
        var plotElement = $('<p>').text('Plot: ' + response.Plot);
        detailRow.append(plotElement);
        posterRow.append(detailRow);

        // favorite button
        var favBtn = $('<button>').text(' Add to favorites');
        favBtn.addClass('add btn btn-default');

        var iconSpan = $('<span>');
        iconSpan.addClass('glyphicon glyphicon-star');
        favBtn.prepend(iconSpan);
        
        newDiv.append(titleElement, posterRow, favBtn);
        
        $('.movie-panel').prepend(newDiv);
    })
}

//run the bladerunner search:
movieInfoDisplay(testImdbId);



//######## Modal load ##########
$(document).ready(function(){
    $("#login-btn").click(function(){
        $("#myModal").modal();
    });
});

//######## Add a movie to favorites ##########
$(document).on('click', '.add', function() {
  var movieID = $(this).attr('data-movie-id');
  var user = 'testuser';  // hardcode for testing
  console.log('data-movie-id: ', movieID);
  database.ref(user + '/favObj').once('value').then(function(snapshot) {
    var dataObj = snapshot.val();
    console.log('dataObj:', dataObj);
    if (!dataObj) {
      dataObj = []; // setup dataObj as an array, if no pre-existing data
    }
    dataObj.push(movieID);
    console.log('new dataObj: ', dataObj);
    database.ref(user).set({
      favObj: dataObj
    })
    console.log('done');
  })
})