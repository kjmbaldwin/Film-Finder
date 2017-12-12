

function getFavorites(){

  database.ref(uid + "/favObj").once('value').then(function(snapshot){

    var getFav = snapshot.val();
    console.log(getFav);

    if(getFav){

      $('#tab1default').empty();

      for (var k = 0; k < getFav.length; k++) {
        $('#tab1default').append(getFav[k]);
      }
      
    } else {
      $('#tab1default').html('<h1>Oh man!</h1> <h3>You don\'t have any favorites, you can head back to the home page to get started.</h3>');
    }

  })

}
