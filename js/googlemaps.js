

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


let map = {}

const mapContainer = document.getElementById("mapContainer")
searchByLocation().then(data =>{
   
    let myLatLng; 
    
    makeMarker(data.coord.lat, data.coord.lng, "myLocation")
 
    for (let index = 0; index < data.brewList.length; index++) {
       // console.log(data.brewList[index].brewery.name)
       let title = data.brewList[index].brewery.name
        makeMarker(data.brewList[index].latitude, data.brewList[index].longitude, title)
    }

    renderList(data.brewList)
    
}) 
    function makeMarker(lat, lng, title) {
        myLatLng = new google.maps.LatLng(
            {lat: lat, lng: lng});
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: title,
        }); 
    }
 


function initMap() {
    
    let myLatLng2 = {lat:29.749907, lng:-82.9001} //{lat:29.749907, lng:-95.358421};
    
    let mapOptions = {
        zoom: 4,
        center: myLatLng2
    }

    map = new google.maps.Map(document.getElementById("mapContainer"), mapOptions)
}
