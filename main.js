console.log("connected to js")
// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  let heartsArray = Array.from(getHearts())
  heartsArray.forEach(heart => {
    heart.addEventListener('click', likeClick)
  });
})

function getHearts() {
  // returns an Node List
  return document.querySelectorAll(".like")
}

function getErrorMessage(){
  return document.getElementById("modal")
}

function changeLikeStatus(heart){
    console.log("I was invoked!!")
    if (heart.innerText === "Dislike! " + FULL_HEART) {
      heart.innerText = "Like! " + EMPTY_HEART
      heart.className = ""
    } else if (heart.innerText === "Like! " + EMPTY_HEART) {
      heart.innerText = "Dislike! " + FULL_HEART
      heart.className = "activated-heart"
    }
}

// function likeListener(){
//   // getHeart.addEventListener("click", likeClick) -- need to loop through collection
//   // turn Node into array
//   let heartsArray = Array.from(getHearts())
//   heartsArray.forEach(heart => {
//     heart.addEventListener('click', likeClick)
//   });
// }

function likeClick(event){
  let heart = event.target
  console.log("I was clicked!!")
  mimicServerCall()
     .then(function(respose){
       changeLikeStatus(heart)
    })
    .catch(function(error) {
      getErrorMessage().className = ""
      setTimeout(function(){ 
        alert("Something went wrong, sorry! Please wait 5 secs before clicking again :)"); 
        getErrorMessage().className = "hidden"
      }, 5000);
    });
}




//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
