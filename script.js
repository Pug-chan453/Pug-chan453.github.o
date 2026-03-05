let currentUser = "Visitante"

function save(key,value){

localStorage.setItem(key,JSON.stringify(value))

}

function load(key){

return JSON.parse(localStorage.getItem(key))

}

function setUser(){

let name = document.getElementById("usernameInput").value

if(!name) return

currentUser = name

document.getElementById("profileName").innerText = name

}

function createPost(){

let text = document.getElementById("postText").value
let img = document.getElementById("postImage").value

if(!text) return

let posts = load("posts") || []

posts.unshift({

user:currentUser,
text:text,
img:img,
likes:0

})

save("posts",posts)

document.getElementById("postText").value=""

renderPosts()

}

function likePost(i){

let posts = load("posts")

posts[i].likes++

save("posts",posts)

renderPosts()

}

function renderPosts(){

let feed = document.getElementById("feed")

feed.innerHTML=""

let posts = load("posts") || []

posts.forEach((p,i)=>{

let div = document.createElement("div")

div.className="feedPost"

let imgHTML = p.img ? `<img src="${p.img}">` : ""

div.innerHTML = `

<strong>${p.user}</strong>

<p>${p.text}</p>

${imgHTML}

<p>❤️ ${p.likes}</p>

<button onclick="likePost(${i})">Curtir</button>

`

feed.appendChild(div)

})

}

function sendMessage(){

let msg = document.getElementById("chatInput").value

if(!msg) return

let chat = document.getElementById("chatBox")

let div = document.createElement("div")

div.innerText = currentUser + ": " + msg

chat.appendChild(div)

chat.scrollTop = chat.scrollHeight

document.getElementById("chatInput").value=""

}

renderPosts()
