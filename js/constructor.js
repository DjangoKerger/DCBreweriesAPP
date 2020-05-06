listContainer = document.getElementById("listContainer")

let brewery = sampleDataArray.map(function (brew) {
  return `<div class ="row">
      <div class="col-lg-2 col-md-4 col-sm-6" style="background-color:#00a1ab; border: 1px solid">
      <h1>${brew.brewery.name}</h1>
      
      <p> ${brew.streetAddress}</p>
      <a href ="${brew.brewery.website}">Visit the website</a>
  </div>
</div>`


})
listContainer.innerHTML = brewery.join(" ")