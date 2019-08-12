// https://learn.co/tracks/web-development-immersive-3-1-module-three/front-end-web-programming/communication-with-the-server/toy-tale-challenge

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const toyUrl = "http://localhost:3000/toys"
// Grab the whole form if you want to be able to submit on 'enter'
const newForm = document.getElementsByClassName('add-toy-form')[0]
// Or on submit button click
// const submitButton = document.getElementsByClassName('submit')
const formInputs = document.getElementsByClassName('input-text')
// Retrieve data from form. Use 'let' because you need to be able to change them. Don't use .value now because they aren't defined until after submit
let nameInput = formInputs[0]
let imageInput = formInputs[1]
let likeButton = []
let addToy = false


// Add defer to the script tag in the HTML file or DOMContentLoaded at the bottom of JS file

// Deliverable: When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
const renderToys = (toys) => {
  // Iterate through the parsed JSON
  toys.forEach(toy => {
    // Pass to the createCard function 
    createCard(toy)
  })
}

const fetchToys = () => {
  // Retrieve data from URL
  fetch(toyUrl)
  // Parse the retrieved data
  .then(resp => resp.json())

  // Console.log first to see the structure of the returned data
  // .then(toys => console.log(toys))

  // Pass the data to the renderToys function
  .then(toys => renderToys(toys))
  // Add error handling
  .catch(error => document.body.innerHTML = error.message)
}

// Create a new toy
const submitToy = () => {
  // Prevent default on submit (page reload)
  event.preventDefault()
  // Make POST request to API
  fetch (toyUrl, {
    method: "POST",
    // Send and receive data as JSON
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // Add to body, convert to JSON string
    body: JSON.stringify({
      // Get the form data variables from above, with .value
      name: nameInput.value,
      image: imageInput.value,
      // Set the default likes to zero
      likes: 0
    })
  })
  .then(resp => resp.json())
  // .then(toy => console.log(toy))
  .then(toy => createCard(toy))
  // Add error handling
  .catch(error => document.body.innerHTML = error.message)
}

const createCard = (toy) => {
  const toyCard = document.createElement('div')
  // Can add each element individually (e.g. document.createElement, appendChild, etc.) or add all the HTML like this:
  // Assign the ID from the API so you can refer to it later
  toyCard.innerHTML = `
    <div class="card" id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class ="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <a class="delete" href="#">Delete Me :(</a>
    </div>`
    // Add each card to the container
    toyCollection.appendChild(toyCard)
  }

const likeToy = () => {
  event.preventDefault()
  toy = event.target.parentNode
  toyId = toy.id
  toyLike = toy.querySelector("p")
  toyText = toyLike.innerText.split(" ")[0]
  toyInt = parseInt(toyText)
  likeButton = toyCollection.querySelectorAll('button')
  likeButton.forEach(like => {
    if (event.target == like) {
      fetch (`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify ({
          likes: toyInt += 1
        })
      })
      .then(resp => resp.json())
      .then(likedToy => {
        toyLike.innerText = `${likedToy.likes} Likes`
      })
    }
  })
}

const deleteToy = () => {
  event.preventDefault()
  toy = event.target.parentNode
  toyId = toy.id
  deleteButtons = toyCollection.querySelectorAll('a')
  // debugger
  deleteButtons.forEach(deleteButton => {
    if (event.target == deleteButton) {
      fetch (`http://localhost:3000/toys/${toyId}`, {
        method: "DELETE"
      })
      .then(deleteCard(toyId))
      }
  })
}

const deleteCard = (id) => {
  card = document.getElementById(id)
  card.remove();
}

const colorToy = () => {
  toy = event.target.parentNode
  cards = toyCollection.querySelectorAll('img')
  cards.forEach(card => {
    if (event.target == card){
      card.parentNode.style.background = "yellow"
    }
  })
}

// Add an event listener for the form submission. Pass to submitToy function
newForm.addEventListener('submit', () => submitToy())

// Add event listener to like ***button***
toyCollection.addEventListener('click', () => {
  likeToy()
  deleteToy()
  colorToy()
})



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// Call the function(s) individually or use something like this as a runner
const init = () => {
  fetchToys()
}

init()
