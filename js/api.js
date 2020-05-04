<<<<<<< HEAD
// How to use the searchByLocation function
//searchByLocation().then(data => {
//   -------------The rest of your code-----------------
//console.log(data)
//})

const sampleDataArray = [
    {
      "id": "LiqcRm",
      "name": "Houston",
      "streetAddress": "775 Gellhorn Dr",
      "locality": "Houston",
      "region": "Texas",
      "postalCode": "77029",
      "phone": "(713) 675-2311",
      "website": "http://anheuser-busch.com/",
      "latitude": 29.773088,
      "longitude": -95.269255,
      "isPrimary": "N",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "N",
      "locationType": "production",
      "locationTypeDisplay": "Production Facility",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2013-07-13 23:07:07",
      "updateDate": "2018-11-02 02:14:56",
      "breweryId": "BznahA",
      "brewery": {
        "id": "BznahA",
        "name": "Anheuser-Busch InBev",
        "nameShortDisplay": "Anheuser-Busch InBev",
        "description": "Anheuser-Busch operates 12 breweries in the United States, 14 in China and one in the United Kingdom. Anheuser-Busch's operations and resources are focused on adding to life's enjoyment not only through the responsible consumption of beer by adults, but through theme park entertainment and packaging.  In the United States, the company holds a 48.5 percent share of U.S. beer sales. Worldwide, Anheuser-Busch's beer sales volume was 128.4 million barrels in 2007.  The St. Louis-based company's subsidiaries include one of the largest U.S. manufacturers of aluminum beverage containers and one of the world's largest recyclers of aluminum beverage cans. Anheuser-Busch also has interests in malt production, rice milling, real estate development, turf farming, metalized and paper label printing, bottle production and transportation services.",
        "website": "http://www.anheuser-busch.com/",
        "established": "1852",
        "isOrganic": "N",
        "images": {
          "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-icon.png",
          "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-medium.png",
          "large": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-large.png",
          "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareMedium.png",
          "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareLarge.png"
        },
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2012-01-03 02:41:44",
        "updateDate": "2017-08-29 13:36:31",
        "isMassOwned": "Y",
        "isInBusiness": "Y",
        "brandClassification": "mass",
        "isVerified": "N"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      },
      "distance": 5.2
    },
    {
      "id": "LiqcRm",
      "name": "Houston",
      "streetAddress": "775 Gellhorn Dr",
      "locality": "Houston",
      "region": "Texas",
      "postalCode": "77029",
      "phone": "(713) 675-2311",
      "website": "http://anheuser-busch.com/",
      "latitude": 29.773088,
      "longitude": -95.269255,
      "isPrimary": "N",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "N",
      "locationType": "production",
      "locationTypeDisplay": "Production Facility",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2013-07-13 23:07:07",
      "updateDate": "2018-11-02 02:14:56",
      "breweryId": "BznahA",
      "brewery": {
        "id": "BznahA",
        "name": "Steves Semen Slurping",
        "nameShortDisplay": "Anheuser-Busch InBev",
        "description": "Anheuser-Busch operates 12 breweries in the United States, 14 in China and one in the United Kingdom. Anheuser-Busch's operations and resources are focused on adding to life's enjoyment not only through the responsible consumption of beer by adults, but through theme park entertainment and packaging.  In the United States, the company holds a 48.5 percent share of U.S. beer sales. Worldwide, Anheuser-Busch's beer sales volume was 128.4 million barrels in 2007.  The St. Louis-based company's subsidiaries include one of the largest U.S. manufacturers of aluminum beverage containers and one of the world's largest recyclers of aluminum beverage cans. Anheuser-Busch also has interests in malt production, rice milling, real estate development, turf farming, metalized and paper label printing, bottle production and transportation services.",
        "website": "http://www.anheuser-busch.com/",
        "established": "1852",
        "isOrganic": "N",
        "images": {
          "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-icon.png",
          "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-medium.png",
          "large": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-large.png",
          "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareMedium.png",
          "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareLarge.png"
        },
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2012-01-03 02:41:44",
        "updateDate": "2017-08-29 13:36:31",
        "isMassOwned": "Y",
        "isInBusiness": "Y",
        "brandClassification": "mass",
        "isVerified": "N"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      },
      "distance": 5.2
    },
    {
      "id": "LiqcRm",
      "name": "Houston",
      "streetAddress": "775 Gellhorn Dr",
      "locality": "Houston",
      "region": "Texas",
      "postalCode": "77029",
      "phone": "(713) 675-2311",
      "website": "http://anheuser-busch.com/",
      "latitude": 29.773088,
      "longitude": -95.269255,
      "isPrimary": "N",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "N",
      "locationType": "production",
      "locationTypeDisplay": "Production Facility",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2013-07-13 23:07:07",
      "updateDate": "2018-11-02 02:14:56",
      "breweryId": "BznahA",
      "brewery": {
        "id": "BznahA",
        "name": "Germany 7-1 Brazil ",
        "nameShortDisplay": "Anheuser-Busch InBev",
        "description": "Anheuser-Busch operates 12 breweries in the United States, 14 in China and one in the United Kingdom. Anheuser-Busch's operations and resources are focused on adding to life's enjoyment not only through the responsible consumption of beer by adults, but through theme park entertainment and packaging.  In the United States, the company holds a 48.5 percent share of U.S. beer sales. Worldwide, Anheuser-Busch's beer sales volume was 128.4 million barrels in 2007.  The St. Louis-based company's subsidiaries include one of the largest U.S. manufacturers of aluminum beverage containers and one of the world's largest recyclers of aluminum beverage cans. Anheuser-Busch also has interests in malt production, rice milling, real estate development, turf farming, metalized and paper label printing, bottle production and transportation services.",
        "website": "http://www.anheuser-busch.com/",
        "established": "1852",
        "isOrganic": "N",
        "images": {
          "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-icon.png",
          "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-medium.png",
          "large": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-large.png",
          "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareMedium.png",
          "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareLarge.png"
        },
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2012-01-03 02:41:44",
        "updateDate": "2017-08-29 13:36:31",
        "isMassOwned": "Y",
        "isInBusiness": "Y",
        "brandClassification": "mass",
        "isVerified": "N"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      },
      "distance": 5.2
=======
const errorHandling = document.getElementById('errorHandling')
const baseURL = 'http://api.brewerydb.com/v2'
const apiKey = '&key=2f48d2e1e703b3f083ef898dc1c27b0c'

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

//Gets around the CORS issue due to BrewerieDB's security

function doCORSRequest(options, dataHandler) {
  var x = new XMLHttpRequest();
  return new Promise(function(resolve,reject){
    x.open(options.method, cors_api_url + options.url);
    x.onload = function (data) {
      resolve(dataHandler(data))
>>>>>>> 7f1315a1293a7e26b9224dd42f74d6225db7e18b
    }
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  })
  
}




//The callback function --- what I want to do with the data
const ferdaLocation = data => JSON.parse(data.target.response).data




//----------------------------SHARED APIS BELOW!!!!!---------------------

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

  '/search/geo/point?lat=29.746149&lng=-95.350801'

  const coords = await promise.then(data => data.coords) 
  const latitude = coords.latitude
  const longitude = coords.longitude
  const options = {
    method: 'GET',
    url: baseURL + `/search/geo/point?lat=${latitude}&lng=${longitude}` + apiKey
  }
  const locationData = await doCORSRequest(options, ferdaLocation).then(data => data)
  return locationData
}

// How to use the searchByLocation function
// searchByLocation().then(data => {
//   -------------The rest of your code-----------------
//   would start with console.log(data)
// })

