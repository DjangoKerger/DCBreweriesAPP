

// How to use the searchByLocation function
//  searchByLocation().then(data => {
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


let map = {}

const mapContainer = document.getElementById("mapContainer")
//searchByLocation().then(data =>{
    const data = {
        coord : {
            lat: 29.7604,
            lng: -95.3698
        },
        brewList: bigSample
    }
    console.log(data);
    let myLatLng; 
    //let icon = "https://cdn.dribbble.com/users/11591/screenshots/1139923/beer_pin.png"//
    makeMarker(data.coord.lat, data.coord.lng, "myLocation")
 
    for (let index = 0; index < data.brewList.length; index++) {
       // console.log(data.brewList[index].brewery.name)
       let title = data.brewList[index].brewery.name
       
        makeMarker(data.brewList[index].latitude, data.brewList[index].longitude, title)// icon
    }

    renderList(data.brewList)
    
//}) 
    function makeMarker(lat, lng, title) { //icon 
        myLatLng = new google.maps.LatLng(
            {lat: lat, lng: lng})
            ;
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: title,
            icon: "http://maps.google.com/mapfiles/kml/pal2/icon2.png" //"https://cdn.dribbble.com/users/11591/screenshots/1139923/beer_pin.png"
        }); 
    }
 


function initMap() {
    
    let myLatLng2 = {lat:29.749907, lng:-95.358421}//{lat:29.749907, lng:-82.9001}
    
    let mapOptions = {
        zoom: 9,
        center: myLatLng2
    }

    map = new google.maps.Map(document.getElementById("mapContainer"), mapOptions)
}
