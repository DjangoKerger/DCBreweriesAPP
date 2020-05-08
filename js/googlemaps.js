let map = {}
function initMap() {
    
    let myLatLng2 = {lat:29.749907, lng:-95.358421}//{lat:29.749907, lng:-82.9001}
    
    let mapOptions = {
        zoom: 13,
        center: myLatLng2
    }

    const mapContainer = document.getElementById("mapContainer")

    map = new google.maps.Map(mapContainer, mapOptions)
}

console.log('map is loaded')


//After we get user coordinates then center map
function moveToLocation(lat, lng){
    const center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
  }

// How to use the searchByLocation function
//When the api is live again we will use the data from the parameter instead of our variable 'data'
//  searchByLocation().then(data => {
//Takes so long that google maps beats it quickly and is defined. 
// //   -------------The rest of your code-----------------
//     console.log("COORDS: ", data.coord);
//     console.log("BREW LIST: ", data.brewList);
//     let myLatLng = {lat: data.coord.lat, lng: data.coord.lng};
//     console.log("MY LAT LNG: ", myLatLng);
//     let marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         title: "hello world",
//     });
//  })// Above each console log. 

 // ADD

 // api for places : AIzaSyAlkt5RglHfe4Dt_NcVr-3S6HJ8Yo47WIE


searchByLocation().then(data =>{
    moveToLocation(data.coord.lat, data.coord.lng)
    makeMarker(data.coord.lat, data.coord.lng, "myLocation", 'https://img.icons8.com/officexs/2x/dizzy-person.png')
 
    for (let index = 0; index < data.brewList.length; index++) {
        let title = data.brewList[index].brewery.name
        makeMarker(data.brewList[index].latitude, data.brewList[index].longitude, title, "https://img.icons8.com/officexs/2x/beer.png")// icon
    }


    renderList(data.brewList)
    
    
}) 
    function makeMarker(lat, lng, title, iconUrl) { //icon 
        myLatLng = new google.maps.LatLng(
            {lat: lat, lng: lng})
            ;
        new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: title,
            icon: iconUrl 
        }); 
    }
 



