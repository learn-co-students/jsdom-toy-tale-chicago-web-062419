const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const URL = "http://localhost:3000/toys"
const addToyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

const fetchToys = (URL) => {
fetch(URL)
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToy(toy)
    })
})
}

const renderToy = (toy) => {
  const div = document.createElement('div')
  div.className = 'card'
  const h2 = document.createElement('h2')
  const img = document.createElement('img')

  const p = document.createElement('p')
  const button  = document.createElement('button')
  const deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete"

  deleteButton.addEventListener("click", (event) => {

    fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "DELETE"
    }).then(event.target.parentNode.remove())
  })

  div.id = toy.id
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerText = `${toy.likes} likes`
  button.innerText = "Like ♡"
  
    button.addEventListener("click", (event) => {

        event.preventDefault()

        fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }, 
            body: JSON.stringify({
              likes: toy.likes++
            })
        })
        .then(res => res.json())
        .then(toy => {
          p.innerText = `${toy.likes} likes`
        })
    })

  div.append(h2, img, p, button, deleteButton)
  toyCollection.appendChild(div)
}

const addNewToy = () => {

  addToyForm.addEventListener("submit", (event) => {

    event.preventDefault()

    let name = document.getElementsByName('name')[0]
    let image = document.getElementsByName('image')[0]

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        image: image.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(toy => renderToy(toy))
  })

}







// Likes

// const likes = (URL, toy) => {

//     let currentLikes = toy.likes

//     fetch(`${URL}/${toy.id}`, {
//         method: "patch",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         }, 
//         body: JSON.stringify({
//           likes: `${currentLikes++} likes`
//         })
//     })
//     .then(res => res.json())
//     .then(toy => renderToy(toy))

//   }





fetchToys(URL)
addNewToy()