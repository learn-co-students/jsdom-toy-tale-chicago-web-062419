const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
const createBtn = toyForm.querySelector('input[type=submit]')
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

const createCard = (toy)=>{
  let node = document.createElement("div")
  
  let html = `<div class="card" id="${toy['id']}">
            <h2>${toy['name']}</h2>
            <img src=${toy['image']} class="toy-avatar" />
            <p>${toy['likes']} Likes </p>
            <button class="like-btn">Like <3</button>
          </div>`
  node.innerHTML = html
  return node
}
const createHTML = (toy)=>{
  let card = createCard(toy)
  toyCollection.appendChild(card)
}


// OR HERE!
const createToy = ()=>{
  event.preventDefault()
  let formArray = toyForm.getElementsByClassName("input-text");
  let toyName = formArray[0].value;
  let toyImage = formArray[1].value;

  fetch('http://localhost:3000/toys', {
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
  .then( resp => resp.json())
  .then( toy => createHTML(toy))
  .catch(error => console.log(error))
}

const refresh = ()=>{
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      for(const element of toys){
        createHTML(element)
      }
    })
}

createBtn.addEventListener("click",()=>createToy())

//Like Button
const likeButtons = document.getElementsByClassName("like-btn")


// for(const element of likeButtons){
//   element.addEventListener("click", ()=>{console.log("like!")})
// }

toyCollection.addEventListener("click", ()=>{
  for(const element of likeButtons){
    if(element == event.target){
      let card = event.target.parentNode
      let id = event.target.parentNode.id
      let like = card.querySelector("p")
      let likeNum = like.innerText.split(" ")[0]
      
      fetch(`http://localhost:3000/toys/${id}`,{
        method: "PATCH",
        headers:  {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: Number(likeNum) + 1
          
        })
      })
      .then(res => res.json())
      .then(toy => {
        like.innerHTML = `${toy['likes']} likes`;
      })
      
    }
  }
})

refresh()