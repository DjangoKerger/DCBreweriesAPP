const listContainer = document.getElementById("listContainer")


// for(let index = 0; index < sampleDataArray.length; index++){

//     let brew = sampleDataArray[index]

//     let brewerie = `<li>
//                 <img src="${brew.imageURL}" />
//                 <b>${brew.brewery.name}</b>
//                 <p>${brew.brewery.description}</p>
//                 <b>${brew.streetAddress}</b>

//                 </li>`
//     listContainer.insertAdjacentHTML('beforeend',brewerie)
// }

const brewery = sampleDataArray.map(function(brew){
    return `<h1>${brew.brewery.name}</h1>
            <p> ${brew.brewery.description}</p>
            <a href ="${brew.brewery.website}">Visit the website</a>`

})

listContainer.innerHTML = brewery.join(" ")