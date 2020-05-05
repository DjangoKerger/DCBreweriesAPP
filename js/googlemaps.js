//console.log(searchByLocation);

// How to use the searchByLocation function
// searchByLocation().then(data => {
//   -------------The rest of your code-----------------
 //  console.log(data)
// })// HANNAH WORKS IS ABOVE FOR BJANGO 

const sampleApiResponse = {
    coord: {
        lat: 123123,
        lng: 1234234234
    },
    dataArray: ['brew1','brew2']
}

let map = {}

const mapContainer = document.getElementById("mapContainer")
searchByLocation().then(data =>{
    console.log(map)
    //let myLatLng = sampleApiResponse.coord
    let myLatLng = {lat:29.749907, lng:-95.358421};
    let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "hello world",
    });


    
})

function initMap() {
    let myLatLng = {lat:29.749907, lng:-95.358421};
    
    let mapOptions = {
        zoom: 4,
        center: myLatLng
    }

    map = new google.maps.Map(document.getElementById("mapContainer"), mapOptions);
    
}