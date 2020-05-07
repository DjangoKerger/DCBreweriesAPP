listContainer = document.getElementById("listContainer")


const renderList = (breweryArray) => {
  let brewery = breweryArray.map(function (brew) {
    let image = ""
    try{
     
      image = `<img src="${brew.brewery.images.squareMedium}" class="img-fluid rounded-circle w-50 mb-3"></img>`

  }catch {}
    return `
    <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
          ${image}
          <div>
            <h3 class="card-title">${brew.brewery.name}</h3>
            <h5>${brew.locationTypeDisplay}</h5>
            <p class="card-text">${brew.streetAddress}, ${brew.locality} ${brew.postalCode}</p>
          </div>
          <div class="bottom-card">
            <button type="button" class="btn btn-outline-#C47335"><i class="fab fa-facebook-square fa-2x" style="color:#C47335"></i></button><button type="button" class="btn btn-md btn-fb"><i class="fab fa-instagram fa-2x"style="color:#C47335"></i></button><button type="button" class="btn btn-md btn-fb"><i class="fab fa-twitter-square fa-2x"style="color:#C47335"></i></button>
            <button type="button" id = "btn1" class="btn btn1">Beer menu</button>
          </div>
        </div>      
      </div>    
    </div>`
  
  })
  listContainer.innerHTML = brewery.join(" ")
 // document.getElementById("btn1").addEventListener("click",function(){
 //   ferdaListOfBeers().then(data => {
      //   -------------The rest of your code-----------------
 //     console.log(data)
 //     })
  //}


//
//<img src="${brew.brewery.images.squareMedium}" class="img-fluid rounded-circle w-50 mb-3">



// listContainer.innerHTML = <nav class="navbar navbar-expand-lg navbar-light">
// <a class="navbar-brand" href="#">BreweryAPP</a>
// <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//   <span class="navbar-toggler-icon"></span>
// </button>
// <div class="collapse navbar-collapse" id="navbarNavDropdown">
//   <ul class="navbar-nav">
//     <li class="nav-item active">
//       <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" href="#">Highest rated</a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" href="#">closest</a>
//     </li>
    
//   </ul>
// </div>
// </nav>

// ${brew.brewery.name}</h3>
//     <img src="${brew.brewery.images.squareMedium} alt="brewImage">
//     <p class="card-text">${brew.streetAddress}</p>

