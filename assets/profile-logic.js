//##### Loads Current User Favorites #######
function getFavorites(user){

  database.ref(user + "/favObj").once('value').then(function(snapshot){

    var getFav = snapshot.val();
    console.log(getFav);

    if(getFav){

      $('#tab1default').empty();

      for (var k = 0; k < getFav.length; k++) {
        buildProfile(getFav[k]);
      }
      
    } else {
      $('#tab1default').html('<h1>Oh man!</h1> <h3>You don\'t have any favorites, you can head back to the home page to get started.</h3>');
    }

  })

  getFriends();

}

function buildProfile(imdbID) {
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

        newDiv.append(titleElement, posterRow);

        $('#tab1default').prepend(newDiv);
    })
}

var friends = []; 
var friendID;  //var used to tag each UID as the ID on each div, currently commented out.

//###### Loads friends page #####
function getFriends(){

  database.ref().once('value').then(function(snapshot){



    //grabs all UIDs     
    friends = Object.keys(snapshot.val());
    //finds index of current UID, and removes it from the array
    var removeMe = friends.indexOf(uid)
    friends.splice(removeMe, 1);

    //loops through the UIDs

    for (var m = 0; m < friends.length; m++) {

      //i was trying to add the UID as a header for each element, but the loop is running too quickly, needs more debugging
      // var friName = $('<div>').attr('id', friends[m]).html('<h2>'+ friends[m] +'</h2>');
      // $('#tab2default').append(friName)

      //friendID = friends[m];

      database.ref(friends[m] + "/favObj").once('value').then(function(snapshot){

        var friendFav = snapshot.val();

        //if the UiD has favorites, loop through them
        if(friendFav){
          for (var n = 0; n < friendFav.length; n++) {
            buildFriend(friendFav[n]); //add the second argument here too, if it gets changed
          }
        }
      });
    }
  });
};

//if you start using the ID stuff commened out above, add another argument
function buildFriend(value){

   var queryURL = "https://www.omdbapi.com/?i=" + value + "&y=&plot=short&apikey=" + omdbKey;
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log('friends response: ', response);

        var title = response.Title;
        console.log(title);
        var friendDiv = $('<div>').addClass('movie-title');
        friendDiv.text(title);

        //$('#' + where).append(friendDiv); this is how you want to build to the correct ID with a second funtion argument
        $('#tab2default').append(friendDiv);
    });
}


