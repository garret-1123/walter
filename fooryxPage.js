const firebaseConfig = {
      apiKey: "AIzaSyAe9j3ZvRZBmwb68Js6DaaEHJoOgG8FXPQ",
      authDomain: "vvalter-d8428.firebaseapp.com",
      databaseURL: "https://vvalter-d8428-default-rtdb.firebaseio.com",
      projectId: "vvalter-d8428",
      storageBucket: "vvalter-d8428.appspot.com",
      messagingSenderId: "432041605849",
      appId: "1:432041605849:web:d8e103f914f349508b9cc8",
      measurementId: "G-GJDNJFWW83"
    };
  
    firebase.initializeApp(firebaseConfig)
    userName = localStorage.getItem("userName");
    roomName = localStorage.getItem("roomName")
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código


console.log(childKey);
console.log(childData);
name = messageData['op'];
message = messageData['message']
like = messageData['likes']
nameTag = "<h3 class=nameClass>" + message + "</h3> <img class= 'user_tick' src='tick.png'>"
messageTag = "<h4>" + name + "</h4>"
likeTag = "<button  class='btn btn-warning' id="+firebaseMessageId + "onclick='updateLike(this.id)'>" 
spanTag = "<span class='glyphicon glyphicon-thumbs-up'> Likes " + like + "</span> </button> </hr>"

row = nameTag + messageTag + likeTag + spanTag;
document.getElementById("output").innerHTML += row;






//Fim do código
} });  }); }

getData();

function updateLike(mID) {
      
      buttonId = mID;
      likes = document.getElementById(buttonId).value;
      updatedLike = Number(likes) + 1;
      firebase.database().ref(roomName).child(mID).update({
      like : updatedLike
      
      })
}
function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
          window.location = "index.html";
      }
      
      function send() {
mess = document.getElementById("msg").value
firebase.database().ref(roomName).push({ 
op: localStorage.getItem("userName"),
message:mess,
likes:0
})
document.getElementById("msg").value = ""
      }