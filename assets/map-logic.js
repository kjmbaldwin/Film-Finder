var ipURL = 'https://ipapi.co/ip/';
var ipAddress;
var ipJSON;
var mapsApiKey = 'AIzaSyBtP37Me6HqcIEFq8KCyIoNiNRh5G0CWNE';
$.ajax({
	url: ipURL,
	method: "GET"
}).done(function(ipResponse) {
	// get IP address using API
	ipAddress = ipResponse;
	$.ajax({
		url: 'https://ipapi.co/' + ipAddress + '/json/',
		method: "GET"
	}).done(function(response) {
		// get zip code and insert into Google Maps API
		// query displays theaters near the zip code
		$('#map-frame').attr('src', 'https://www.google.com/maps/embed/v1/search?q=theaters%20near%20' + response.postal + '&key=' + mapsApiKey);
	})
})