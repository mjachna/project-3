$.noConflict();
(function($) {
  $(document).ready(
    function() {
      var zip;
      var url;    
      $('#city-zip-form').on('submit', function(event) {
        $('#zip-error').text(''); 
        zip = $('#zip').val();
        url = 'http://api.zippopotam.us/us/' + zip;
        $.get(url).done(
          function(data) {
            /* Parsing data from zip API */
            var infoStr;
            var map;
            var marker;
            var sUrl;
            var sSUrl;
            var city = data.places[0]['place name'];
            var state = data.places[0].state;
            var longitude = data.places[0].longitude; 
            var latitue = data.places[0].latitude; 
            var stateAB = data.places[0]['state abbreviation'];
            var latLng = new google.maps.LatLng(latitue, longitude);
            var mapOptions = {
              center: latLng,
              zoom: 10
            };
            infoStr = 'The city is ' + city + ' in the state of ' + state;
            $('#city-info').text(infoStr);
  
            /* Load the map and marker of the city */
            map = new google.maps.Map(document.getElementById('map'), mapOptions); 
            marker = new google.maps.Marker({
              position: latLng,
              map:map
            });
          
            sUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/astronomy/q/'+stateAB+'/'+city+'.json';
            $.get(sUrl,
              function(data){
                /* Get sunrise, sunset data */
                var sunrise = data.moon_phase.sunrise.hour + ":" + data.moon_phase.sunrise.minute;
                var sunset = data.moon_phase.sunset.hour - 12 + ":" + data.moon_phase.sunset.minute;
                var dayInfoStr = 'In ' + city + ' Sunrise is at ' + sunrise + ' A.M. Sunset is at ' + sunset + ' P.M.';
                $('#day-info').text(dayInfoStr);
              })
            
            sSUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/conditions/q/'+stateAB+'/'+city+'.json';
            $.get(sSUrl,
              function(data){
                /* Ge weather condition data */
                var weather = data.current_observation.weather;
                var temp = data.current_observation.temperature_string;
                var wInfoStr = 'It\'s ' + weather + ' with a temperture of ' + temp;
                $('#w-info').text(wInfoStr);        
              })
          }
        ).fail(function() {$('#zip-error').text('Invalid zip code');})
        event.preventDefault();
      })
    }
    )
})(jQuery);
  

 