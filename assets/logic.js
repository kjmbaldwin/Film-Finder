// beginning
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
$('#search-btn').on('click', function() {

    var ombdSearch = $('#search-input').val().trim()
    var omdbURL = "https://www.omdbapi.com/?s=" + ombdSearch + "&y=&plot=short&apikey=" + omdbKey + "&type=movie";

    $.ajax({
        url: omdbURL,
        method: 'GET'
    }).done(function(response) {

        console.log(response);
        var results = response.Search;
        for (var i = results.length - 1; i >= 0; i--) {
            var resultID = results[i].imdbID;
            console.log('ID: ', resultID);
            movieInfoDisplay(resultID);
        }
    });
});



// ###### Search for movies and build HTML elements into index.html #######

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

        // create classes for spans

        var titleElement = $('<div>');
        var titleDiv = $('<div>');
        var detailDiv = $('<div>');

        var titleSpan = $('<span>').text(response.Title).addClass('movie-title');
        var year = $('<span>').text(" (" + response.Year + ")").addClass('year');
        titleDiv.append(titleSpan).append(year);

        var detailSpan = $('<span>').text(response.Rated + " | " + runTime + " | " + genre + " | " + response.Released).addClass('detail-span');
        detailDiv.append(detailSpan);

        titleElement.append(titleDiv).append(detailDiv);



        var posterRow = $('<div>').addClass('row');



        // var posterURL = response.Poster;
        var posterHolder = $('<a>');
        posterHolder.attr('href', response.Poster);
        posterHolder.attr('data-lightbox', 'image-1');
        posterHolder.attr('data-title', response.Title + ' movie poster.');

        var posterElement = $('<img>');
        posterElement.attr('src', response.Poster);
        posterElement.attr('alt', response.Title);

        posterElement.addClass("poster");
        posterHolder.append(posterElement);
        var posterDiv = $('<div>').addClass('col-lg-4 col-md-4 col-sm-3').append(posterHolder);


        posterRow.append(posterDiv);



        var detailRow = $('<div>').addClass('col-lg-8 col-md-8 col-sm-9');
        var detailRow2 = $('<div>').addClass('col-lg-8 col-md-8 col-sm-9');


        // var plot = response.Plot;

        var plotElement = $('<p>').text(response.Plot).addClass('plot-text');
        var plotSpan = $('<div>').text('Plot: ').addClass('movie-details margin-top-10').append(plotElement);


        var director = $('<div>').text(response.Director).addClass('detail-font');
        var directorSpan = $('<div>').text('Director: ').addClass('movie-details margin-top-10').append(director);

        console.log(director);
        console.log(directorSpan.append(director));

        var writer = $('<div>').text(response.Writer).addClass('detail-font margin-t');
        var writerSpan = $('<div>').text('Writer: ').addClass('movie-details margin-top-10').append(writer);
        
        console.log(writer);

        var actors = $('<div>').text(response.Actors).addClass('detail-font');
        var actorSpan = $('<div>').text('Stars: ').addClass('movie-details margin-top-10').append(actors);

        console.log(actors);


        detailRow.append(plotSpan);
        detailRow2.append(directorSpan);
        detailRow2.append(writerSpan);
        detailRow2.append(actorSpan);
        // append 
        posterRow.append(detailRow);
        posterRow.append(detailRow2);

        // favorite button
        var favBtn = $('<button>').text(' Add to favorites');
        favBtn.addClass('add btn btn-default');
        favBtn.attr('data-movie-id', imdbID);

        var iconSpan = $('<span>');
        iconSpan.addClass('glyphicon glyphicon-star');
        favBtn.prepend(iconSpan);

        newDiv.append(titleElement, posterRow, favBtn);

        $('.movie-panel').prepend(newDiv);
    })
}

//run the bladerunner search:
//movieInfoDisplay(testImdbId);



//######## Modal load ##########

$(document).ready(function(){
    $("#login-btn").on('click', function(){
        $('#usrname').val('');
        $('#psw').val('');
        $("#myModal").modal();
    });

    // end
});




//######## Add a movie to favorites ##########
$(document).on('click', '.add', function() {
    if (!uid){
        $("#login-error-modal").modal(); //CHANGE THIS ALERT TO A MODAL <<<<<<<<<<<<<<<<<<<<<<
    } else {
        var movieID = $(this).attr('data-movie-id');
        var user = uid;
        console.log('data-movie-id: ', movieID);
        database.ref(user + '/favObj').once('value').then(function(snapshot) {
            var dataObj = snapshot.val();
            console.log('dataObj:', dataObj);
            if (!dataObj) {
                dataObj = []; // setup dataObj as an array, if no pre-existing data
            }
            console.log('test', dataObj.indexOf(movieID));
            if (dataObj.indexOf(movieID) < 0) {
                dataObj.push(movieID);
                console.log('new dataObj: ', dataObj);
                database.ref(user).set({
                    favObj: dataObj
                })
                console.log('done');
            }
        })
    }
});
