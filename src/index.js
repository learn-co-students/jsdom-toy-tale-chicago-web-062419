const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
const createBtn = toyForm.getElementsByClassName("submit")[0]
const likeBtn = document.getElementsByClassName("like-btn")
let addToy = false

// YOUR CODE HERE

createBtn.addEventListener("click", () => createToy())

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


const createCard = (toy) => {
  let node = document.createElement("div")
  let html = `<div class="card" id="${toy['id']}">
            <h2>${toy['name']}</h2>
            <img src=${toy['image']} class="toy-avatar" />
             <p>${toy['likes']} Likes </p>
            <button class="like-btn">Like <3</button>
          </div> `
  node.innerHTML = html
  return node
}


const createHmtl = (toy) => {
  let card = createCard(toy)
  toyCollection.appendChild(card)
}
const createToy = () => {
  event.preventDefault()
  let formArray = toyForm.getElementsByClassName("input-text")
  let toyName = formArray[0].value
  let toyImage = formArray[1].value
  fetch ("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(toy => createHmtl(toy))
}

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    for (const element of toys){
      createHmtl(element)
    }
  })

// const addLike = () => {
// for(const element in likeBtn) {
//   element.addEventListener("click", () => {
//     console.log("hi")
//   }) 
// }
// }

toyCollection.addEventListener("click", () => {
  for(const element of likeBtn){
    if(element == event.target){
      let card = event.target.parentNode
      let id = card.id
      let like = card.querySelector("p")
      let likeNum = like.innerText.split(" ")[0]
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: Number(likeNum) + 1
        })
      })
      .then(resp => resp.json())
      .then(toy => {
        like.innerText = `${toy['likes']} likes`;
      })
    }
  }
})