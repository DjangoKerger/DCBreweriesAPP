const errorHandling = document.getElementById('errorHandling')
const baseURL = 'https://api.brewerydb.com/v2'
const apiKey = 'key=f41704bcb789fcc7e9b58e63762aa764'

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
    url: baseURL + `/search/geo/point?lat=${latitude}&lng=${longitude}&radius=10&` + apiKey
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


// const bigSample = [
//   {
//     "id": "nSnV7u",
//     "name": "Main Brewery",
//     "streetAddress": "2202 Dallas St",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77003",
//     "phone": "713-397-0072",
//     "website": "http://8thwonderbrewery.com/",
//     "latitude": 29.7490257,
//     "longitude": -95.3557612,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-06-27 13:26:09",
//     "updateDate": "2015-12-03 18:59:30",
//     "timezoneId": "America/Chicago",
//     "breweryId": "1mv7t1",
//     "brewery": {
//       "id": "1mv7t1",
//       "name": "8th Wonder Brewery",
//       "nameShortDisplay": "8th Wonder",
//       "description": "A crafty brewery in HouTex. Our proximity to Minute Maid Park, Toyota Center & Dynamo Stadium, makes 8W the craft beer for the home team. \r\n\r\nWe are dedicated to brewing fresh, tasty artisanal ales.",
//       "website": "http://8thwonderbrew.com/",
//       "established": "2013",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-06-27 13:24:46",
//       "updateDate": "2018-11-02 22:42:22",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "3RS2MUOZF6",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 68,
//           "userId": 14660,
//           "user": {
//             "id": 14660,
//             "firstName": "Rob",
//             "lastName": "Piwonka",
//             "countryIsoCode": "US",
//             "email": "rob@8thwonderbrew.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2017-08-15 16:55:40",
//             "updateDate": "2017-08-21 02:04:00"
//           },
//           "breweryId": "1mv7t1",
//           "brewery": {
//             "id": "1mv7t1",
//             "name": "8th Wonder Brewery",
//             "nameShortDisplay": "8th Wonder",
//             "website": "http://8thwonderbrew.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/1mv7t1/upload_yUvtwa-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2012-06-27 13:24:46",
//             "updateDate": "2018-11-02 22:42:22",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "3RS2MUOZF6",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "2582842649977656c6cf5ba09cc700b6c57564cc",
//           "verifiedDate": "2017-08-20 22:02:56",
//           "createDate": "2017-08-15 16:56:04",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 0.4
//   },
//   {
//     "id": "M9JYEL",
//     "name": "True Anomaly Brewing",
//     "streetAddress": "2012 Dallas St",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77003",
//     "phone": "(346) 704-5701",
//     "website": "https://trueanomalybrewing.com/",
//     "latitude": 29.7497303,
//     "longitude": -95.3571354,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "yearOpened": "2019",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2019-06-25 19:15:08",
//     "updateDate": "2019-06-26 14:09:45",
//     "hoursOfOperationExplicit": {
//       "wed": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "thu": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "fri": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "sun": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "8:00pm"
//         }
//       ],
//       "mon": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "tue": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "wed-4:00pm-10:00pm,thu-4:00pm-10:00pm,fri-4:00pm-10:00pm,sat-12:00pm-10:00pm,sun-12:00pm-8:00pm,mon-4:00pm-10:00pm,tue-4:00pm-10:00pm",
//     "breweryId": "R2kZHB",
//     "brewery": {
//       "id": "R2kZHB",
//       "name": "True Anomaly Brewing Company",
//       "nameShortDisplay": "True Anomaly",
//       "description": "Brewery with Taproom, focusing on Belgian Ales, Hop-forward Ales, and Mixed Fermentation + Sour Ales",
//       "website": "http://www.trueanomalybrewing.com/",
//       "established": "2019",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/R2kZHB/upload_NNdAsA-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/R2kZHB/upload_NNdAsA-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/R2kZHB/upload_NNdAsA-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/R2kZHB/upload_NNdAsA-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/R2kZHB/upload_NNdAsA-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2019-06-25 19:11:12",
//       "updateDate": "2019-06-26 14:09:06",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 0.5
//   },
//   {
//     "id": "DIBFEt",
//     "name": "Main Brewery",
//     "streetAddress": "3118 Harrisburg Blvd",
//     "extendedAddress": "Unit 108",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77003",
//     "phone": "3463523190",
//     "website": "www.sigmabeer.com",
//     "latitude": 29.7491977,
//     "longitude": -95.3435423,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "brewpub",
//     "locationTypeDisplay": "Brewpub",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-07-08 19:22:46",
//     "updateDate": "2017-06-27 13:46:17",
//     "timezoneId": "America/Chicago",
//     "breweryId": "xqA7lD",
//     "brewery": {
//       "id": "xqA7lD",
//       "name": "Sigma Brewing Company",
//       "nameShortDisplay": "Sigma",
//       "website": "http://www.sigmabrewingcompany.com/",
//       "established": "2016",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-07-08 19:22:12",
//       "updateDate": "2018-11-03 00:17:00",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "3AXGHFJ5UR",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 1451,
//           "userId": 14012,
//           "user": {
//             "id": 14012,
//             "firstName": "Matt",
//             "lastName": "Peterson",
//             "countryIsoCode": "US",
//             "email": "Matt@sigmabrewingcompany.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2017-06-26 20:35:34"
//           },
//           "breweryId": "xqA7lD",
//           "brewery": {
//             "id": "xqA7lD",
//             "name": "Sigma Brewing Company",
//             "nameShortDisplay": "Sigma",
//             "website": "http://www.sigmabrewingcompany.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/xqA7lD/upload_z6qsXE-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2015-07-08 19:22:12",
//             "updateDate": "2018-11-03 00:17:00",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "3AXGHFJ5UR",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "88f69e247291ab0b7e178fdfd185a96f62298f40",
//           "verifiedDate": "2017-06-27 09:34:38",
//           "createDate": "2017-06-26 20:35:56",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 0.5
//   },
//   {
//     "id": "2sfE3h",
//     "name": "EADO Beerworks",
//     "locality": "Houston",
//     "postalCode": "77003",
//     "phone": "713-446-5734",
//     "website": "http://www.eado-beerworks.com/",
//     "latitude": 29.753611,
//     "longitude": -95.3442408,
//     "isPrimary": "Y",
//     "inPlanning": "Y",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-03-27 02:49:05",
//     "updateDate": "2015-03-31 20:29:27",
//     "timezoneId": "America/Chicago",
//     "breweryId": "j9r4ch",
//     "brewery": {
//       "id": "j9r4ch",
//       "name": "EaDo Beerworks",
//       "nameShortDisplay": "EaDo Beerworks",
//       "description": "EaDo (pronounced “EE-D'OH”) Beerworks is the brain-baby of a group of close friends and beer fans who dreamed of making brews in a way that would invite more people into the craft beer fold. \r\nAt EaDo Beerworks, we make a wide range delicious ales so all types of folks can find their BOC (brew of choice), whether they’re a craft beer aficionado or neophyte, While craft beer has permeated cities across America, there are many more people to reach who could both enjoy better beer and whose input will push the industry in new exciting directions.  EaDo (or East Downtown, Houston, TX) is a rather new name for a culturally and historically rich area in Houston. As a business, we value a highly urban environment and we hope to grow and evolve with the neighborhood. We will feature a free-standing taproom that is open to the public 5 days a week. It will have space for tasting events, live music, and community gatherings.\r\nAll truly transformative changes start at the smallest scale - one beer at a time, or so we like to think. Let's work together to make craft beer truly represent our community and all of our tastes.",
//       "website": "http://www.eado-beerworks.com/",
//       "established": "2015",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/j9r4ch/upload_02Yzzn-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/j9r4ch/upload_02Yzzn-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/j9r4ch/upload_02Yzzn-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/j9r4ch/upload_02Yzzn-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/j9r4ch/upload_02Yzzn-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-03-27 02:46:08",
//       "updateDate": "2015-12-22 16:06:59",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 0.6
//   },
//   {
//     "id": "BBgaaS",
//     "name": "Main Brewery",
//     "streetAddress": "3004 Canal Street",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77003",
//     "phone": "(832) 969-1934",
//     "website": "http://www.damngoodfoodcoldassbeer.com/",
//     "hoursOfOperation": "Monday: 12:00 PM – 2:00 AM,\nTuesday: 12:00 PM – 2:00 AM,\nWednesday: 12:00 PM – 2:00 AM,\nThursday: 12:00 PM – 2:00 AM,\nFriday: 12:00 PM – 3:00 AM,\nSaturday: 12:00 PM – 3:00 AM,\nSunday: 12:00 PM – 12:00 AM",
//     "latitude": 29.7542973,
//     "longitude": -95.3409206,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2018-08-17 18:33:46",
//     "updateDate": "2018-08-17 18:33:46",
//     "hoursOfOperationNotes": "Monday: 12:00 PM – 2:00 AM,\nTuesday: 12:00 PM – 2:00 AM,\nWednesday: 12:00 PM – 2:00 AM,\nThursday: 12:00 PM – 2:00 AM,\nFriday: 12:00 PM – 3:00 AM,\nSaturday: 12:00 PM – 3:00 AM,\nSunday: 12:00 PM – 12:00 AM",
//     "breweryId": "CwE4OX",
//     "brewery": {
//       "id": "CwE4OX",
//       "name": "Moon Tower Sudworks",
//       "nameShortDisplay": "Moon Tower Sudworks",
//       "website": "http://www.damngoodfoodcoldassbeer.com/",
//       "isOrganic": "N",
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2018-08-17 18:33:41",
//       "updateDate": "2018-11-02 23:28:00",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "N0UQBRLIEK",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 0.8
//   },
//   {
//     "id": "Yq3v6n",
//     "name": "Main Brewery",
//     "locality": "Houston",
//     "region": "Texas",
//     "phone": "713-234-0683",
//     "latitude": 29.7604267,
//     "longitude": -95.3698028,
//     "isPrimary": "Y",
//     "inPlanning": "Y",
//     "isClosed": "Y",
//     "openToPublic": "N",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-07-08 18:04:07",
//     "updateDate": "2020-01-17 14:36:21",
//     "timezoneId": "America/Chicago",
//     "breweryId": "JO2nd7",
//     "brewery": {
//       "id": "JO2nd7",
//       "name": "Allen's Landing Brewing",
//       "nameShortDisplay": "Allen's Landing",
//       "description": "Craft Brewery, in the planning stages.",
//       "website": "http://www.allenslandingbrewingcompany.com/",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/JO2nd7/upload_c6RyNI-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/JO2nd7/upload_c6RyNI-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/JO2nd7/upload_c6RyNI-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/JO2nd7/upload_c6RyNI-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/JO2nd7/upload_c6RyNI-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-07-08 18:02:35",
//       "updateDate": "2020-01-17 14:36:21",
//       "isMassOwned": "N",
//       "isInBusiness": "N",
//       "brandClassification": "craft",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 1.5
//   },
//   {
//     "id": "JNoY64",
//     "name": "Main Brewery",
//     "locality": "Houston",
//     "region": "Texas",
//     "website": "http://www.downeasybrewing.com/",
//     "latitude": 29.76045,
//     "longitude": -95.369784,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "yearOpened": "2010",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-01-03 02:41:53",
//     "updateDate": "2014-07-23 19:11:34",
//     "breweryId": "CgUpen",
//     "brewery": {
//       "id": "CgUpen",
//       "name": "Down Easy Brewing",
//       "nameShortDisplay": "Down Easy",
//       "description": "There are few enemies on a porch swing, and there are no strangers in a bar. Slide up with a few friends because good beer goes Down Easy!",
//       "website": "http://www.downeasybrewing.com/",
//       "established": "2010",
//       "isOrganic": "N",
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-01-03 02:41:53",
//       "updateDate": "2015-12-22 15:18:38",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 1.5
//   },
//   {
//     "id": "XWEuIw",
//     "name": "Main Brewery",
//     "streetAddress": "1506 Truxillo",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77004",
//     "latitude": 29.734181,
//     "longitude": -95.375942,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-07-08 20:01:53",
//     "updateDate": "2015-07-08 20:01:53",
//     "timezoneId": "America/Chicago",
//     "breweryId": "I4DmpG",
//     "brewery": {
//       "id": "I4DmpG",
//       "name": "Under the Radar Brewery",
//       "nameShortDisplay": "Under the Radar",
//       "description": "Houston's newest microbrewery is on its way!\r\n\r\nWe're in our start-up phase, dotting I's, crossing T's on our business plan and  looking for a commercial space to call home.\r\n\r\nWhat we have done is brew some great brew in our garages!  We can't wait to get up and running in a commercial setting.  We've had tons of people, both beer afficianados and newbies, try our beer and they love it!  That is why we are moving to a commercial scale. If we had a dollar for every time someone said, \"Hey where can I buy this?\", we'll we'd have most of our start-up capital!",
//       "website": "http://www.undertheradarbrewery.com/",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/I4DmpG/upload_ON8171-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/I4DmpG/upload_ON8171-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/I4DmpG/upload_ON8171-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/I4DmpG/upload_ON8171-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/I4DmpG/upload_ON8171-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-07-08 19:56:41",
//       "updateDate": "2018-11-04 21:14:01",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "P04K68NUYB",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 1.7
//   },
//   {
//     "id": "jPbb33",
//     "name": "Main Brewery",
//     "streetAddress": "2000 Lyons Avenue",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77020",
//     "phone": "713-686-9494",
//     "website": "http://www.saintarnold.com/",
//     "latitude": 29.7715192,
//     "longitude": -95.3484972,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "yearOpened": "1994",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-01-03 02:42:07",
//     "updateDate": "2014-07-23 19:11:34",
//     "breweryId": "H3UW27",
//     "brewery": {
//       "id": "H3UW27",
//       "name": "Saint Arnold Brewing Company",
//       "nameShortDisplay": "Saint Arnold",
//       "description": "Saint Arnold Brewing Company, located in Houston, is Texas' Oldest Craft Brewery. Our goal is to brew world class beers and deliver them to our customers as fresh as possible making them the best beers in Texas and Louisiana. Our customers are beer lovers - people that appreciate great, full-flavored beers.\r\n\r\nOur small crew does everything at the brewery: brew the beer, filter the beer, keg the beer, bottle the beer, sell the beer and drink the beer. For us, this is a passion, not a job. We believe that this comes through in the beers we make. Our beers have soul.\r\n\r\nWe brew several different beers; some are year round, some are seasonal and a few are single batch brews. They are available in bars, restaurants, grocery stores, liquor stores and warehouse stores throughout Texas and Louisiana.\r\n\r\nOur first keg of beer was shipped on June 9, 1994. Founded by Brock Wagner and Kevin Bartol, we chose Houston because, other than living here, this was the largest city in the country that did not have a microbrewery. Brock was a longtime homebrewer and had considered opening a brewery as far back as college, although that was quickly dismissed as a silly idea. Seven years after graduating, Brock revisited the idea, enlisted Kevin's help and the brewery was off and running. Kevin has since left the business after a bitter battle. (Just kidding - but don't you wish people wrote that when it was the truth?).\r\n\r\nPlease visit us if you are in Houston. We have a public open house every weekday at 3:00 PM and every Saturday starting at 11:00 AM.\r\n\r\nCheers!",
//       "website": "http://www.saintarnold.com/",
//       "established": "1994",
//       "mailingListUrl": "http://visitor.constantcontact.com/manage/optin?v=001uBxRG66eq3ajbdfZ6GjL91di7O20EmmX",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/H3UW27/upload_rnr6XH-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/H3UW27/upload_rnr6XH-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/H3UW27/upload_rnr6XH-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/H3UW27/upload_rnr6XH-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/H3UW27/upload_rnr6XH-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-01-03 02:42:07",
//       "updateDate": "2018-11-03 19:56:54",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "IMU3ZJH0NL",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 1.8
//   },
//   {
//     "id": "N4ZUZr",
//     "name": "Main Location",
//     "streetAddress": "1902 Washington Ave., Suite E",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77007",
//     "phone": "83",
//     "latitude": 29.768051,
//     "longitude": -95.3775152,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2017-07-18 19:59:00",
//     "updateDate": "2018-04-10 14:08:19",
//     "timezoneId": "America/Chicago",
//     "breweryId": "xl9INg",
//     "brewery": {
//       "id": "xl9INg",
//       "name": "Platypus Brewing",
//       "nameShortDisplay": "Platypus",
//       "description": "Working craft brewery with Tap Room. Full service dining throughout serving Australian and Local favorites. Various spaces available for private events and parties. Outdoor seating, ample free parking. Non alcoholic beverages and wine also available. Kid and dog friendly!",
//       "website": "http://www.platypusbrewing.com/",
//       "established": "2016",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/xl9INg/upload_9LsVDI-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/xl9INg/upload_9LsVDI-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/xl9INg/upload_9LsVDI-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/xl9INg/upload_9LsVDI-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/xl9INg/upload_9LsVDI-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2017-04-26 17:51:06",
//       "updateDate": "2018-11-04 21:08:41",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "BAJI02CZ3E",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 2.2
//   },
//   {
//     "id": "PWI06H",
//     "name": "Main Location",
//     "streetAddress": "2206 Edwards St.",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77007",
//     "latitude": 29.7707804,
//     "longitude": -95.3803011,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2017-07-24 18:25:20",
//     "updateDate": "2017-07-24 18:25:20",
//     "timezoneId": "America/Chicago",
//     "breweryId": "7V9tdi",
//     "brewery": {
//       "id": "7V9tdi",
//       "name": "Holler Brewing Co.",
//       "nameShortDisplay": "Holler",
//       "description": "John and Kathryn Holler make a wide variety of fresh, delicious beers in small batches for Houston. Visit the tasting room to drink their beer fresh from the brewery tanks!",
//       "website": "http://hollerbeer.com",
//       "established": "2016",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2017-02-14 02:02:52",
//       "updateDate": "2018-11-03 01:45:34",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "1BL6NVM9IO",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 223,
//           "userId": 13766,
//           "user": {
//             "id": 13766,
//             "firstName": "Kathryn",
//             "lastName": "Holler",
//             "countryIsoCode": "US",
//             "email": "kathrynlholler@gmail.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2017-06-20 16:29:05",
//             "updateDate": "2017-06-20 16:44:57"
//           },
//           "breweryId": "7V9tdi",
//           "brewery": {
//             "id": "7V9tdi",
//             "name": "Holler Brewing Co.",
//             "nameShortDisplay": "Holler",
//             "website": "http://hollerbeer.com",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/7V9tdi/upload_a55EEc-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2017-02-14 02:02:52",
//             "updateDate": "2018-11-03 01:45:34",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "1BL6NVM9IO",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "c22fdce03177b58d1ee59ba155ee77bd5ccbc2a3",
//           "verifiedDate": "2017-06-20 12:37:53",
//           "createDate": "2017-06-20 16:31:59",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 2.5
//   },
//   {
//     "id": "z19IqT",
//     "name": "Buffalo Bayou Brewing Company",
//     "streetAddress": "2101 Summer Street",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77007",
//     "phone": "713-750-9795",
//     "website": "https://www.buffbrew.com/",
//     "hoursOfOperation": "New location, the former location has since closed.",
//     "latitude": 29.7727455,
//     "longitude": -95.3794527,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "yearOpened": "2019",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2020-01-28 17:36:31",
//     "updateDate": "2020-01-28 18:05:26",
//     "hoursOfOperationExplicit": {
//       "sun": [
//         {
//           "startTime": "11:00am",
//           "endTime": "12:00am"
//         }
//       ],
//       "mon": [
//         {
//           "startTime": "11:00am",
//           "endTime": "12:00am"
//         }
//       ],
//       "tue": [
//         {
//           "startTime": "11:00am",
//           "endTime": "12:00am"
//         }
//       ],
//       "wed": [
//         {
//           "startTime": "11:00am",
//           "endTime": "12:00am"
//         }
//       ],
//       "thu": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "fri": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "sun-11:00am-12:00am,mon-11:00am-12:00am,tue-11:00am-12:00am,wed-11:00am-12:00am,thu-11:00am-2:00am,fri-11:00am-2:00am,sat-11:00am-2:00am",
//     "hoursOfOperationNotes": "New location, the former location has since closed.",
//     "breweryId": "sk5YLK",
//     "brewery": {
//       "id": "sk5YLK",
//       "name": "Buffalo Bayou Brewing Company",
//       "nameShortDisplay": "Buffalo Bayou",
//       "description": "Buffalo Bayou Brewing Company is a new twist on an old craft. With creativity as our main goal, we subscribe to our own definitions regarding brewing parameters and guidelines, without sacrificing flavor or consistency.\r\n\r\nCombining cutting-edge technology and technique with wildly sourced flavors, our innovative offerings create new narratives for how we think about beer. From grain to glass Buff Brews tell a story, invoking traditional and balanced flavor symmetry in our “Heritage Series,” as well as revolutionary and radical palates in our “Secessionist Series,” that break all the rules and alter the beer landscape.\r\n\r\nIt is our mission to create beers that not only honor the pioneering history of Texas, but celebrate the adventurous spirit of a city built on outlaws and invention.",
//       "website": "http://www.buffalobayoubrewing.com/",
//       "established": "2011",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-06-27 14:06:37",
//       "updateDate": "2018-11-08 21:22:26",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "R7D8B0SLON",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 1189,
//           "userId": 6332,
//           "user": {
//             "id": 6332,
//             "firstName": "Leanna",
//             "lastName": "Fossler",
//             "countryIsoCode": "US",
//             "email": "leanna@buffbrew.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2015-06-09 16:03:16",
//             "updateDate": "2015-06-09 16:07:35"
//           },
//           "breweryId": "sk5YLK",
//           "brewery": {
//             "id": "sk5YLK",
//             "name": "Buffalo Bayou Brewing Company",
//             "nameShortDisplay": "Buffalo Bayou",
//             "website": "http://www.buffalobayoubrewing.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2012-06-27 14:06:37",
//             "updateDate": "2018-11-08 21:22:26",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "R7D8B0SLON",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "e5d25b811c51c201cbf76dcc9573922f4b3b22b5",
//           "verifiedDate": "2015-06-09 14:10:20",
//           "createDate": "2015-06-09 16:08:39",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 2.5
//   },
//   {
//     "id": "HwpJMn",
//     "name": "Main Brewery",
//     "streetAddress": "1915 Westheimer RD",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77098",
//     "phone": "(713) 526-3100",
//     "website": "http://www.phoenixow.com/dr8/",
//     "latitude": 29.7425187,
//     "longitude": -95.4077174,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "brewpub",
//     "locationTypeDisplay": "Brewpub",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-06-05 15:51:58",
//     "updateDate": "2020-02-25 13:59:53",
//     "hoursOfOperationExplicit": {
//       "tue": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "wed": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "thu": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "fri": [
//         {
//           "startTime": "11:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "10:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "sun": [
//         {
//           "startTime": "9:00am",
//           "endTime": "2:00am"
//         }
//       ],
//       "mon": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "2:00am"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "tue-11:00am-2:00am,wed-11:00am-2:00am,thu-11:00am-2:00am,fri-11:00am-2:00am,sat-10:00am-2:00am,sun-9:00am-2:00am,mon-4:00pm-2:00am",
//     "timezoneId": "America/Chicago",
//     "breweryId": "wuC97w",
//     "brewery": {
//       "id": "wuC97w",
//       "name": "The Phoenix On Westheimer",
//       "nameShortDisplay": "The Phoenix On Westheimer",
//       "description": "Welcome friends. The Phoenix on Westheimer is formerly known as the Firkin and Phoenix. Firkin Die-Hards will always call it the Firkin. Many of you have noticed the cosmetic changes that came with the name change. It's the still same great bar, owners and staff. For those who have never stopped in, come and make it your home away from home. NOW BREWING! - As of January 14, 2015, the Phoenix became a brewpub. We started selling our Kinfolk (Kolsch style) beer on February 17, 2015. Come checkout the latest changes to the pub and sample our house made beer!",
//       "website": "http://www.phoenixow.com",
//       "established": "2006",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/wuC97w/upload_HgPKG0-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/wuC97w/upload_HgPKG0-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/wuC97w/upload_HgPKG0-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/wuC97w/upload_HgPKG0-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/wuC97w/upload_HgPKG0-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-06-05 14:58:57",
//       "updateDate": "2020-02-25 13:59:14",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "BPTVHF1ON7",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 3.4
//   },
//   {
//     "id": "0kUxc5",
//     "name": "Baileson Brewing Company",
//     "streetAddress": "2322 Bissonnet St, Houston, TX 77005",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77005",
//     "phone": "(832) 516-9828",
//     "website": "https://www.bailesonbrewing.com/",
//     "latitude": 29.7257349,
//     "longitude": -95.4137431,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2018-09-12 20:30:56",
//     "updateDate": "2019-06-27 15:00:38",
//     "hoursOfOperationExplicit": {
//       "fri": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "10:00pm"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "11:00am",
//           "endTime": "10:00pm"
//         }
//       ],
//       "sun": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "8:00pm"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "fri-4:00pm-10:00pm,sat-11:00am-10:00pm,sun-12:00pm-8:00pm",
//     "breweryId": "Tr8Hvi",
//     "brewery": {
//       "id": "Tr8Hvi",
//       "name": "Baileson Brewing Company",
//       "nameShortDisplay": "Baileson",
//       "description": "Baileson Brewing Company is a brewpub located in the neighborhood of Boulevard Oaks, just on the outskirts of the Rice Village area.  We are a husband and wife team that loves craft beer and focuses on brewing hand-crafted ales that we love to drink. Stop on by and see why so many of our Houston friends who love craft beer have become regulars.",
//       "website": "http://Baileson Brewing Co.",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/Tr8Hvi/upload_CQU4M5-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/Tr8Hvi/upload_CQU4M5-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/Tr8Hvi/upload_CQU4M5-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/Tr8Hvi/upload_CQU4M5-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/Tr8Hvi/upload_CQU4M5-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2018-08-17 15:53:45",
//       "updateDate": "2019-06-27 15:00:14",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "9I7NPQKTOY",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 4
//   },
//   {
//     "id": "SX51ao",
//     "name": "Houston - Kirby",
//     "streetAddress": "4527 Lomitas Ave.",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77098",
//     "phone": "(713) 520-7730",
//     "website": "http://www.twinpeaksrestaurant.com/locations/houston/",
//     "hoursOfOperation": "Sunday-Wednesday:\r\n11am-midnight\r\nThursday-Saturday\r\n11am-2am",
//     "latitude": 29.7314739,
//     "longitude": -95.4172099,
//     "isPrimary": "N",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "restaurant",
//     "locationTypeDisplay": "Restaurant/Ale House",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2014-09-22 15:34:30",
//     "updateDate": "2014-09-22 15:34:30",
//     "hoursOfOperationNotes": "Sunday-Wednesday:\r\n11am-midnight\r\nThursday-Saturday\r\n11am-2am",
//     "timezoneId": "America/Chicago",
//     "breweryId": "woTHSe",
//     "brewery": {
//       "id": "woTHSe",
//       "name": "Twin Peaks Brewing Co.",
//       "nameShortDisplay": "Twin Peaks",
//       "description": "Located inside the Twin Peaks restaurant at the N. Irving, Texas location. This system has a 10,000 bbl. annual capacity and will supply all of the Twin Peaks locations in Texas.",
//       "website": "http://www.twinpeaksrestaurant.com/",
//       "established": "2013",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/woTHSe/upload_NLs5yu-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/woTHSe/upload_NLs5yu-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/woTHSe/upload_NLs5yu-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/woTHSe/upload_NLs5yu-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/woTHSe/upload_NLs5yu-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2014-09-20 00:59:56",
//       "updateDate": "2018-11-03 00:10:08",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "3QB7TPV0A5",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 4.1
//   },
//   {
//     "id": "ePxvaD",
//     "name": "Main Brewery",
//     "streetAddress": "5301 Nolda St",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77007",
//     "phone": "713-750-9795",
//     "website": "http://www.buffalobayoubrewing.com/",
//     "hoursOfOperation": "Friday Happy Hour: 5pm-9pm\r\nSaturday Tours: Noon-3pm",
//     "latitude": 29.7759957,
//     "longitude": -95.4160868,
//     "isPrimary": "N",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-06-27 14:07:32",
//     "updateDate": "2020-01-28 18:05:27",
//     "hoursOfOperationNotes": "Friday Happy Hour: 5pm-9pm\r\nSaturday Tours: Noon-3pm",
//     "breweryId": "sk5YLK",
//     "brewery": {
//       "id": "sk5YLK",
//       "name": "Buffalo Bayou Brewing Company",
//       "nameShortDisplay": "Buffalo Bayou",
//       "description": "Buffalo Bayou Brewing Company is a new twist on an old craft. With creativity as our main goal, we subscribe to our own definitions regarding brewing parameters and guidelines, without sacrificing flavor or consistency.\r\n\r\nCombining cutting-edge technology and technique with wildly sourced flavors, our innovative offerings create new narratives for how we think about beer. From grain to glass Buff Brews tell a story, invoking traditional and balanced flavor symmetry in our “Heritage Series,” as well as revolutionary and radical palates in our “Secessionist Series,” that break all the rules and alter the beer landscape.\r\n\r\nIt is our mission to create beers that not only honor the pioneering history of Texas, but celebrate the adventurous spirit of a city built on outlaws and invention.",
//       "website": "http://www.buffalobayoubrewing.com/",
//       "established": "2011",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-06-27 14:06:37",
//       "updateDate": "2018-11-08 21:22:26",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "R7D8B0SLON",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 1189,
//           "userId": 6332,
//           "user": {
//             "id": 6332,
//             "firstName": "Leanna",
//             "lastName": "Fossler",
//             "countryIsoCode": "US",
//             "email": "leanna@buffbrew.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2015-06-09 16:03:16",
//             "updateDate": "2015-06-09 16:07:35"
//           },
//           "breweryId": "sk5YLK",
//           "brewery": {
//             "id": "sk5YLK",
//             "name": "Buffalo Bayou Brewing Company",
//             "nameShortDisplay": "Buffalo Bayou",
//             "website": "http://www.buffalobayoubrewing.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/sk5YLK/upload_fAQ7mq-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2012-06-27 14:06:37",
//             "updateDate": "2018-11-08 21:22:26",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "R7D8B0SLON",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "e5d25b811c51c201cbf76dcc9573922f4b3b22b5",
//           "verifiedDate": "2015-06-09 14:10:20",
//           "createDate": "2015-06-09 16:08:39",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 4.4
//   },
//   {
//     "id": "9pxiSN",
//     "name": "Main Brewery",
//     "streetAddress": "1125 W. Cavalcade St.",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77009",
//     "phone": "(832) 409-1650",
//     "latitude": 29.8038722,
//     "longitude": -95.3868648,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-07-08 20:03:30",
//     "updateDate": "2015-07-08 20:03:30",
//     "timezoneId": "America/Chicago",
//     "breweryId": "uNwayh",
//     "brewery": {
//       "id": "uNwayh",
//       "name": "Town in City Brewing Company",
//       "nameShortDisplay": "Town in City",
//       "description": "We love our neighborhood. We love how eclectic, unique, and quaint the Heights is. So what better way to honor our home than to name our brewery after it. The heights is known as the Small Town In The Big City. So we decided to name our brewery Town In City Brewing Company in honor of Houston's first official suburb that was established way back in 1896.",
//       "website": "http://townincitybrewing.com/",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-07-08 20:02:32",
//       "updateDate": "2018-11-02 22:58:07",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "E90YZWJPAG",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 1299,
//           "userId": 9736,
//           "user": {
//             "id": 9736,
//             "firstName": "Justin",
//             "lastName": "Engle",
//             "countryIsoCode": "US",
//             "email": "justin@townincitybrewing.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2016-06-22 15:36:26"
//           },
//           "breweryId": "uNwayh",
//           "brewery": {
//             "id": "uNwayh",
//             "name": "Town in City Brewing Company",
//             "nameShortDisplay": "Town in City",
//             "website": "http://townincitybrewing.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/uNwayh/upload_sTGsG8-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2015-07-08 20:02:32",
//             "updateDate": "2018-11-02 22:58:07",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "E90YZWJPAG",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "9da8dd4fd265e9a5b49440b03af7995ee1fb1ad4",
//           "verifiedDate": "2016-06-23 17:40:32",
//           "createDate": "2016-06-22 15:37:02",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 4.5
//   },
//   {
//     "id": "LiqcRm",
//     "name": "Houston",
//     "streetAddress": "775 Gellhorn Dr",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77029",
//     "phone": "(713) 675-2311",
//     "website": "http://anheuser-busch.com/",
//     "latitude": 29.773088,
//     "longitude": -95.269255,
//     "isPrimary": "N",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "N",
//     "locationType": "production",
//     "locationTypeDisplay": "Production Facility",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2013-07-13 23:07:07",
//     "updateDate": "2014-07-23 19:11:34",
//     "breweryId": "BznahA",
//     "brewery": {
//       "id": "BznahA",
//       "name": "Anheuser-Busch InBev",
//       "nameShortDisplay": "Anheuser-Busch InBev",
//       "description": "Anheuser-Busch operates 12 breweries in the United States, 14 in China and one in the United Kingdom. Anheuser-Busch's operations and resources are focused on adding to life's enjoyment not only through the responsible consumption of beer by adults, but through theme park entertainment and packaging.  In the United States, the company holds a 48.5 percent share of U.S. beer sales. Worldwide, Anheuser-Busch's beer sales volume was 128.4 million barrels in 2007.  The St. Louis-based company's subsidiaries include one of the largest U.S. manufacturers of aluminum beverage containers and one of the world's largest recyclers of aluminum beverage cans. Anheuser-Busch also has interests in malt production, rice milling, real estate development, turf farming, metalized and paper label printing, bottle production and transportation services.",
//       "website": "http://www.anheuser-busch.com/",
//       "established": "1852",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/BznahA/upload_0FkKKl-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-01-03 02:41:44",
//       "updateDate": "2017-08-29 13:36:31",
//       "isMassOwned": "Y",
//       "isInBusiness": "Y",
//       "brandClassification": "mass",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 5.2
//   },
//   {
//     "id": "VlDdk9",
//     "name": "Main Brewery",
//     "streetAddress": "941 W 18th St.",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77008",
//     "phone": "(832) 953-4677",
//     "website": "http://www.eurekaheights.com/",
//     "latitude": 29.8018003,
//     "longitude": -95.4168219,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2016-11-17 17:40:58",
//     "updateDate": "2016-11-17 17:40:58",
//     "hoursOfOperationExplicit": {
//       "fri": [
//         {
//           "startTime": "4:00pm",
//           "endTime": "8:00pm"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "8:00pm"
//         }
//       ],
//       "sun": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "4:00pm"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "fri-4:00pm-8:00pm,sat-12:00pm-8:00pm,sun-12:00pm-4:00pm",
//     "timezoneId": "America/Chicago",
//     "breweryId": "GvqVLz",
//     "brewery": {
//       "id": "GvqVLz",
//       "name": "Eureka Heights Brew Co.",
//       "nameShortDisplay": "Eureka Heights Brew Co.",
//       "description": "Eureka Heights Brewing Company was forged in the dark depths of the Eureka Heights fault line and the hellfire of Houston summer. Once emerged we spent years on a spirit quest that guy at the gas station recommended. Then we decided we wanted to make some beer.",
//       "website": "http://www.eurekaheights.com/",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/GvqVLz/upload_31gjoL-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/GvqVLz/upload_31gjoL-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/GvqVLz/upload_31gjoL-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/GvqVLz/upload_31gjoL-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/GvqVLz/upload_31gjoL-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2016-11-17 17:38:38",
//       "updateDate": "2018-11-03 00:14:43",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "YA9RWCDU2V",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 5.5
//   },
//   {
//     "id": "yejcw1",
//     "name": "Main Brewery",
//     "streetAddress": "1700 Oak Post Blvd.",
//     "extendedAddress": "Suite 100",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77056",
//     "latitude": 29.7487033,
//     "longitude": -95.4617571,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "brewpub",
//     "locationTypeDisplay": "Brewpub",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2015-07-08 19:16:28",
//     "updateDate": "2015-07-08 19:19:18",
//     "timezoneId": "America/Chicago",
//     "breweryId": "jCiVSL",
//     "brewery": {
//       "id": "jCiVSL",
//       "name": "Whole Foods Market Brewing",
//       "nameShortDisplay": "Whole Foods Market",
//       "description": "Whole Foods Market Brewing Company is the first of its kind—a brewpub located right inside America’s favorite natural and organic grocery store. With an unlimited array of fresh ingredients on site, the beer and food menus  feature an exciting array of local and seasonal flavors. Our Head Brewer Dave Ohmer loves to incorporate local produce, fresh herbs and innovative flavor combinations that reflect the diverse and beloved tastes of Texas.",
//       "website": "http://brewing.wfm.com/",
//       "established": "2014",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/jCiVSL/upload_XoUVzi-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/jCiVSL/upload_XoUVzi-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/jCiVSL/upload_XoUVzi-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/jCiVSL/upload_XoUVzi-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/jCiVSL/upload_XoUVzi-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2015-07-08 19:15:31",
//       "updateDate": "2018-11-06 04:40:46",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "SQ3YLFG8UZ",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 6.7
//   },
//   {
//     "id": "dt2o9z",
//     "name": "Main Brewery",
//     "streetAddress": "508 West Crosstimbers Road",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77018",
//     "website": "https://www.facebook.com/alesatanhouston/",
//     "latitude": 29.8294505,
//     "longitude": -95.4076586,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "yearOpened": "2012",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2013-01-21 19:54:03",
//     "updateDate": "2020-02-12 12:49:57",
//     "breweryId": "JqufBE",
//     "brewery": {
//       "id": "JqufBE",
//       "name": "Brash Brewing Company",
//       "nameShortDisplay": "Brash",
//       "description": "After being exiled by our home state of Texas because of archaic three tier laws, we found a home and much nicer weather in Ipswich Massachusetts. There we have been able to share our passion for craft beer in the form of what we believe to be world class examples of traditional and non traditional styles.\r\n\r\nWe hope you dig them, cause if you don’t we’ll have to get real jobs.",
//       "website": "https://www.facebook.com/alesatanhouston/",
//       "established": "2012",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/JqufBE/upload_Q80hrw-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/JqufBE/upload_Q80hrw-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/JqufBE/upload_Q80hrw-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/JqufBE/upload_Q80hrw-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/JqufBE/upload_Q80hrw-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2013-01-21 19:53:10",
//       "updateDate": "2020-02-12 12:48:56",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "UYNKQX3HOF",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 6.7
//   },
//   {
//     "id": "Pl4x1D",
//     "name": "Main Location",
//     "streetAddress": "938 Wakefield Drive",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77018",
//     "phone": "(281) 220-6900",
//     "website": "http://www.greatheightsbrewing.com/",
//     "latitude": 29.821852,
//     "longitude": -95.4222857,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2017-10-04 18:49:53",
//     "updateDate": "2017-10-04 18:50:13",
//     "timezoneId": "America/Chicago",
//     "breweryId": "Iy2Mue",
//     "brewery": {
//       "id": "Iy2Mue",
//       "name": "Great Heights Brewing",
//       "nameShortDisplay": "Great Heights",
//       "description": "Neighborhood craft beer microbrewery featuring a laid-back taproom with an industrial vibe.",
//       "website": "http://www.greatheightsbrewing.com/",
//       "established": "2017",
//       "mailingListUrl": "info@greatheightsbrewing.com",
//       "isOrganic": "N",
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2017-10-04 18:48:14",
//       "updateDate": "2018-11-02 23:35:28",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "6W0YFLMONC",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 715,
//           "userId": 16801,
//           "user": {
//             "id": 16801,
//             "firstName": "Sean",
//             "lastName": "Bednarz",
//             "countryIsoCode": "US",
//             "email": "sean@greatheightsbrewing.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2018-02-11 13:39:03"
//           },
//           "breweryId": "Iy2Mue",
//           "brewery": {
//             "id": "Iy2Mue",
//             "name": "Great Heights Brewing",
//             "nameShortDisplay": "Great Heights",
//             "website": "http://www.greatheightsbrewing.com/",
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2017-10-04 18:48:14",
//             "updateDate": "2018-11-02 23:35:28",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "6W0YFLMONC",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "c2dfa6299ee04da60b8581c59b58057a9c5988ca",
//           "verifiedDate": "2018-02-13 11:27:05",
//           "createDate": "2018-02-11 13:39:45",
//           "status": "verified_claim"
//         }
//       ]
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 6.8
//   },
//   {
//     "id": "Gjgjje",
//     "name": "Main Brewery",
//     "streetAddress": "3421 Folger",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77093",
//     "phone": "832-377-0237",
//     "website": "http://www.cityacrebrewing.com/",
//     "latitude": 29.856249,
//     "longitude": -95.335345,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-06-27 14:19:43",
//     "updateDate": "2014-07-23 19:11:34",
//     "breweryId": "V3oMUl",
//     "brewery": {
//       "id": "V3oMUl",
//       "name": "City Acre Brewing Company",
//       "nameShortDisplay": "City Acre",
//       "website": "http://www.cityacrebrewing.com/",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/V3oMUl/upload_Rmnk9Y-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/V3oMUl/upload_Rmnk9Y-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/V3oMUl/upload_Rmnk9Y-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/V3oMUl/upload_Rmnk9Y-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/V3oMUl/upload_Rmnk9Y-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-06-27 14:18:33",
//       "updateDate": "2018-11-02 23:05:47",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "XARDV59QSI",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 7.7
//   },
//   {
//     "id": "HIHSx3",
//     "name": "Main Brewery",
//     "streetAddress": "2032 Karbach Street",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77092",
//     "website": "http://www.karbachbrewing.com/",
//     "latitude": 29.80585,
//     "longitude": -95.460598,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2012-01-03 02:41:59",
//     "updateDate": "2014-07-23 19:11:34",
//     "breweryId": "gJZUdw",
//     "brewery": {
//       "id": "gJZUdw",
//       "name": "Karbach Brewing Company",
//       "nameShortDisplay": "Karbach",
//       "description": "We like beer. A lot. \r\n\r\nOur background is in the beer biz. Everything from distribution and importing to German training and brewery operations. A few years ago we had an opportunity that would allow us to open up our own brewery. We jumped on it.\r\n\r\nWe’re extremely excited about this project, and we think it shows in everything we do. This is just plain fun for us. The day it starts to feel like a job is the day when lightning shall strike us dead. Cause, hey, at the end of the day we're making beer. And beer is fun.\r\n\r\nJoin us, it should be a kick ass ride with some cool stops along the way!",
//       "website": "http://www.karbachbrewing.com/",
//       "established": "2011",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/gJZUdw/upload_vtnVMf-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/gJZUdw/upload_vtnVMf-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/gJZUdw/upload_vtnVMf-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/gJZUdw/upload_vtnVMf-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/gJZUdw/upload_vtnVMf-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2012-01-03 02:41:59",
//       "updateDate": "2017-06-22 13:58:15",
//       "isMassOwned": "Y",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "isVerified": "N"
//     },
//     "country": {
//       "isoCode": "US",
//       "name": "UNITED STATES",
//       "displayName": "United States",
//       "isoThree": "USA",
//       "numberCode": 840,
//       "createDate": "2012-01-03 02:41:33"
//     },
//     "distance": 7.8
//   },
//   {
//     "id": "26TMxp",
//     "name": "Main Brewery",
//     "streetAddress": "10622 Hirsch Rd.",
//     "locality": "Houston",
//     "region": "Texas",
//     "postalCode": "77016",
//     "phone": "7133251477",
//     "hoursOfOperation": "FRIDAYS: 12PM NOON – 9PM\r\nSATURDAYS: NOON – 9PM\r\nSUNDAYS: CLOSED UNTIL FOOTBALL SEASON",
//     "latitude": 29.8682358,
//     "longitude": -95.3143839,
//     "isPrimary": "Y",
//     "inPlanning": "N",
//     "isClosed": "N",
//     "openToPublic": "Y",
//     "locationType": "micro",
//     "locationTypeDisplay": "Micro Brewery",
//     "countryIsoCode": "US",
//     "status": "verified",
//     "statusDisplay": "Verified",
//     "createDate": "2017-04-24 18:29:43",
//     "updateDate": "2017-07-05 20:30:44",
//     "hoursOfOperationExplicit": {
//       "fri": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "9:00pm"
//         }
//       ],
//       "sat": [
//         {
//           "startTime": "12:00pm",
//           "endTime": "9:00pm"
//         }
//       ]
//     },
//     "hoursOfOperationExplicitString": "fri-12:00pm-9:00pm,sat-12:00pm-9:00pm",
//     "hoursOfOperationNotes": "FRIDAYS: 12PM NOON – 9PM\r\nSATURDAYS: NOON – 9PM\r\nSUNDAYS: CLOSED UNTIL FOOTBALL SEASON",
//     "timezoneId": "America/Chicago",
//     "breweryId": "mZvCrK",
//     "brewery": {
//       "id": "mZvCrK",
//       "name": "Spindletap Brewery",
//       "nameShortDisplay": "Spindletap",
//       "description": "SpindleTap Brewery is a micro brewery in Houston, TX dedicated to delivering high quality craft beers to our Houston and Gulf Coast Family.",
//       "website": "http://spindletapbrewery.com/",
//       "established": "2014",
//       "isOrganic": "N",
//       "images": {
//         "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-icon.png",
//         "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-medium.png",
//         "large": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-large.png",
//         "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-squareMedium.png",
//         "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-squareLarge.png"
//       },
//       "status": "verified",
//       "statusDisplay": "Verified",
//       "createDate": "2017-04-24 18:28:19",
//       "updateDate": "2018-11-03 01:34:15",
//       "isMassOwned": "N",
//       "isInBusiness": "Y",
//       "brandClassification": "craft",
//       "brewersAssociation": {
//         "brewersAssocationId": "9BHASY2LRN",
//         "isCertifiedCraftBrewer": "Y"
//       },
//       "isVerified": "Y",
//       "claims": [
//         {
//           "id": 914,
//           "userId": 18654,
//           "user": {
//             "id": 18654,
//             "firstName": "Garrison",
//             "lastName": "Mathis",
//             "countryIsoCode": "US",
//             "email": "garrison@spindletap.com",
//             "sandboxAppLimit": 1,
//             "country": {
//               "isoCode": "US",
//               "name": "UNITED STATES",
//               "displayName": "United States",
//               "isoThree": "USA",
//               "numberCode": 840,
//               "createDate": "2012-01-03 02:41:33"
//             },
//             "createDate": "2018-06-05 18:56:12",
//             "updateDate": "2018-06-06 14:58:34"
//           },
//           "breweryId": "mZvCrK",
//           "brewery": {
//             "id": "mZvCrK",
//             "name": "Spindletap Brewery",
//             "nameShortDisplay": "Spindletap",
//             "website": "http://spindletapbrewery.com/",
//             "images": {
//               "icon": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-icon.png",
//               "medium": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-medium.png",
//               "large": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-large.png",
//               "squareMedium": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-squareMedium.png",
//               "squareLarge": "https://brewerydb-images.s3.amazonaws.com/brewery/mZvCrK/upload_927mQ9-squareLarge.png"
//             },
//             "status": "verified",
//             "statusDisplay": "Verified",
//             "createDate": "2017-04-24 18:28:19",
//             "updateDate": "2018-11-03 01:34:15",
//             "isInBusiness": "Y",
//             "brewersAssociation": {
//               "brewersAssocationId": "9BHASY2LRN",
//               "isCertifiedCraftBrewer": "Y"
//             },
//             "isVerified": "Y"
//           },
//           "verificationCode": "35ff504eff0af0d9e82726e27e29096729a1381e",
//           "verifiedDate": "2018-06-05 15:35:12",
//           "createDate": "2018-06-05 19:04:22",
//           "status": "verified_claim"
//         }
//       ]},
//     }
    
//     ]

