//console.log('Will we be able to pull this one off?')

let mapContainer = document.getElementById("mapContainer")


document.body.innerHTML='<div id="map-canvas" style="width:1000px; height:500px;"></div>'

// the option in the map
    function initMap() {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(29.7604, 95.3698)
    };

//new map
    var map = new google.maps.Map(document.getElementById("map-canvas"), 
    mapOptions);
    }

   /* // marker
    var marker = new google.maps.Marker({
      position:{lat:29.7604,lng:95.3698},
      map:map,
      icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }); */ 

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlkt5RglHfe4Dt_NcVr-3S6HJ8Yo47WIE&callback=initMap';
  document.body.appendChild(script);
}

window.onload = loadScript;



