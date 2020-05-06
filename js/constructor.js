listContainer = document.getElementById("listContainer")

let brewery = sampleDataArray.map(function (brew) {
  return `
  <div class="col-lg-3 col-md-6">
    <div class="card my-3 py-5 text-center">
      <div class="card-body">
        <img src="${brew.brewery.images.squareMedium}" class="img-fluid rounded-circle w-50 mb-3">
        <h3 class="card-title">${brew.brewery.name}</h3>
        <h5>${brew.locationTypeDisplay}</h5>
        <p class="card-text">${brew.streetAddress}, ${brew.locality} ${brew.postalCode}</p>
        <button type="button" class="btn btn-outline-#C47335"><i class="fab fa-facebook-square fa-2x" style="color:#C47335"></i></button><button type="button" class="btn btn-md btn-fb"><i class="fab fa-instagram fa-2x"style="color:#C47335"></i></button><button type="button" class="btn btn-md btn-fb"><i class="fab fa-twitter-square fa-2x"style="color:#C47335"></i></button>
        
      
  </div>
    
  </div>
</div>`


})
listContainer.innerHTML = brewery.join(" ")

// ${brew.brewery.name}</h3>
//     <img src="${brew.brewery.images.squareMedium} alt="brewImage">
//     <p class="card-text">${brew.streetAddress}</p>

//try and do it with for each