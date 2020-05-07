const errorHandling = document.getElementById('errorHandling')
const baseURL = 'https://www.brewerydb.com'
const apiKey = 'key=2f48d2e1e703b3f083ef898dc1c27b0c'

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

//Gets around the CORS issue due to BrewerieDB's security

function doCORSRequest(options, dataHandler) {
  var x = new XMLHttpRequest();
  return new Promise(function(resolve,reject){
    x.open(options.method, cors_api_url + options.url);
    x.onload = function (data) {
      resolve(dataHandler(data))
    }
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  })
  
 }




//The callback function --- what I want to do with the data
const ferdaLocation = data => {
  const locationData = JSON.parse(data.target.response).data
  if(locationData){
    return locationData
  }else{
    return []
  }
}


// //----------------------------SHARED APIS BELOW!!!!!---------------------

//Location Search API
const searchByLocation = async () => {
  //Need to get user's current location.
  const promise = new Promise((resolve, reject) => {
    function getLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError)

      }else {
        errorHandling.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    function showPosition(position) {
      resolve(position)
    }
  
    function showError(error){
      if(error){
        errorHandling.innerHTML = "Geolocation was denied. Plz reload and try again.";
      }
    }

    getLocation()
  })

  const coords = await promise.then(data => data.coords) 
  const latitude = coords.latitude
  const longitude = coords.longitude
  const options = {
    method: 'GET',
    url: baseURL + `/browse/map/get-breweries?lat=${latitude}&lng=${longitude}&radius=10&` + apiKey
  }
  
  const locationData = await doCORSRequest(options, ferdaLocation).then(data => {
   
    return {
      coord: 
        {
        lat: latitude,
        lng: longitude
        },
      brewList: data
    }
  })
  return locationData
}

// How to use the searchByLocation function
//searchByLocation().then(data => {
//   -------------The rest of your code-----------------
//console.log(data)
//})

//-------------Function for List of beers-----------------

const ferdaListOfBeers = data => {
  const beerList = JSON.parse(data.target.response).data
  if(beerList){
    return beerList
  }else{
    return []
  }
}

const getListOfBeers = async (brewID) => {
  const options = {
    method: 'GET',
    url: baseURL + `/brewery/${brewID}/beers?` + apiKey
  }
  const listOfBeers = await doCORSRequest(options, ferdaListOfBeers).then(data => data)
    return listOfBeers
}
