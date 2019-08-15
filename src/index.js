
const toysUrl = "http://localhost:3000/toys" //Get a full list of toys that we need.  
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let toyCollection = document.getElementById('toy-collection')
let addToy = false

// Fetch Andy's Toys
// On the index.html page, there is a div with the id "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
//READ-Load the Toys
getToys() 
function getToys() {
  fetch(toysUrl)
	.then(resp => resp.json()) 
 	.then(toys => createCards(toys)) //passes in the data from toys to hold the information to create a card 
}

function createCards(items){ //this function iterates through the toys array and calls on the createOnecard method to create a card for each individual toy. 
  items.forEach(item => {
    createOneCard(item)
  })
}
// //Create a card for each toy and append that card to the toy-collection div. 

function createOneCard(plaything) {  
  let toyCard = document.createElement("div") //making a div class of "card" for each toy and appending that to the toy-collection div. 
  toyCard.className = "card"

  let h2 = document.createElement("h2")
  h2.innerText = plaything.name 

  let img = document.createElement ("img")
  img.src = plaything.image
  img.className = "toy-avatar"

  let p = document.createElement("p")
  p.innerText = plaything.likes 

  let likeButton = document.createElement("button")
  likeButton.innerText = "like"
  toyCard.append(h2,img,p,likeButton)
  likeButton.addEventListener("click", (event) => addALike(plaything))

  //  Add Likes 
  function addALike(plaything){
    fetch(toysUrl + `/${plaything.id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
        body: JSON.stringify({
            likes: ++plaything.likes
        })
      })
      .then(res => res.json())
      .then(toy => {
        p.innerText = `${plaything.likes} likes`
      })
  }

  let deleteButton = document.createElement("button")
    deleteButton.innerText = "Bye-Bye"
    toyCard.append(deleteButton)
    deleteButton.addEventListener("click", (event) => deleteAToy(plaything))


    toyCollection.appendChild(toyCard) 
  }

  let addButton = document.createElement("button")
    addButton.innerText = "Add Toy"
  
  addBtn.addEventListener('click', (event) => { 
  event.preventDefault()
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// Add a New Toy
// When a user clicks on the add new toy button, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
// The toy should conditionally render to the page.
// In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

  toyForm.addEventListener("submit", (event) =>{ 
  event.preventDefault()
  let name = document.getElementsByName("name")[0]
  let image = document.getElementsByName("image")[0]

  fetch(toysUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    },
        body: JSON.stringify({ 
        name: name.value,
        image: image.value,
        likes: 0
  })
})
  .then(resp => resp.json()) 
  .then(toy => {
    createOneCard(toy)
    })
  })



  //DeleteATOY 
  function deleteAToy(plaything){
    let card = event.target.parentNode
    card.remove()
    fetch(toysUrl + `/${plaything.id}`, {
    method: "DELETE"
   })
  }
  