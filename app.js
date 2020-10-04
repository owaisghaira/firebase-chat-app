
//  var user1 = prompt("enter name here user1")
// if (user1 !== " ") {
//     var inner1 = document.getElementById("username").innerHTML
//     inner1 = user1
//     console.log(user1)


// }
// else {
//     var user2 = prompt("enter name here user2")
//     var inner2 = document.getElementById("username").innerHTML
//     inner2 = user2
//     console.log(user2)

// }

// //#sign in thorough input box
// var user;
// let username = ()=>{
// var inner1 = document.getElementById("username1").value
// var inner2 = document.getElementById("username2").value
// // console.log(inner2)
// if (inner1 != ""){
//     user = 'user1'
// }
// else if(inner1 == ""){
//     user = 'user2'
// }
// else{
//     alert("enter name plz")
// }
// console.log(user)

// }
// const fbLogin = ()=>{
//     var provider = new firebase.auth.FacebookAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//     .then(function(result) {
//         var token = result.credential.accessToken;
//         var user = result.user;
//         console.log("user==>",user.displayName)
//         // ...
//       }).catch(function(error) {
//        console.log("error==>",error.message)
//       });

// }
// const fbOut = ()=>{
//     firebase.auth().signOut()
//     .then(function() {
//         alert('Sign-out successful.')
//       }).catch(function(error) {

//       });
// }
// var userdata = 'user2'
// firebase.database().ref("sms").on('child_added', function (data) {
//     // console.log(data.val().value)
//     var cheekUser = data.val().user
//     if (cheekUser === "user1") {
//         // console.log(cheekUser)
//         var spn = document.createElement("span")
//         var li = document.createElement("li")
//         var text = document.createTextNode(data.val().value)
//         spn.appendChild(text)
//         spn.setAttribute("class", "hello")
//         li.setAttribute("class", "left")
//         li.appendChild(spn)
//         render.appendChild(li)
//     }
//     else {
//         var spn = document.createElement("span")
//         var li = document.createElement("li")
//         var text = document.createTextNode(data.val().value)
//         spn.appendChild(text)
//         spn.setAttribute("class", "hello")
//         li.setAttribute("class", "right")
//         li.appendChild(spn)
//         render.appendChild(li)
//     }
// })



// let show = () => {
//     var item = document.getElementById("msg");
//     //     var render = document.getElementById("render");
//     var key = firebase.database().ref().push().key
//     var msg = {
//         key: key,
//         user: userdata,
//         value: item.value
//     }
//     firebase.database().ref('sms').child(key).set(msg)
//     item.value = "";
// }

///////////////// /////////////////////////////////////////
var currentUserkey = '';
var chatKey;
function populatefrndlst() {
    // document.getElementById('lstfriend').innerHTML = ` <div class="d-flex justify-content-center">
    //                                                       <div class="spinner-border" role="status">
    //                                                       <li>
    //                                                         <span class="sr-only">Loading...</span>
    //                                                         </li>
    //                                                    </div>
    //                                                 </div>`
    var db = firebase.database().ref("users");
    var lst;
    db.on("value", function (users) {
        users.forEach(function (data) {
            var user = data.val();
            console.log(data.val())
            if (user.email !== firebase.auth().currentUser.email) {
                lst += `<li class="list-group-item list-group-item-action" data-dismiss="modal" onclick="startChat('${data.key}','${user.name}','${user.photoURL}')">
                <div class="row">
                    <div class="col-md-2">
                        <img src="${user.photoURL}" class="profile-pic rounded-circle" alt="">
                    </div>
                    <div class="col-md-10">
                        <div class="name">${user.name}</div>
                    </div>
                </div>
            </li>`;
            }

        })
        document.getElementById('lstfriend').innerHTML = lst
        console.log(lst)
    })
}


let startChat = (friendkey, friendname, friendphoto) => {
    console.log(friendname)
    var friendList = {
        firenId: friendkey,
        userId: currentUserkey
    }
    var db = firebase.database().ref('friend_list')
    var flag = false
    db.on('value', function (users) {
        users.forEach(function (data) {
            var user = data.val()
            if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || (user.friendId === friendList.userId && user.userId === friendList.friendId)) {
                flag = true
                chatKey = data.key;
                // console.log(chatKey)
            }
        })
        if (flag === false) {
            chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
                if (error) alert(error)
                else {
                    document.getElementById("start").removeAttribute("style");
                    document.getElementById("divstart").setAttribute("style", "display:none")
                    hideFlist();
                }
            }).getKey();
        }
        else {
            document.getElementById("start").removeAttribute("style");
            document.getElementById("divstart").setAttribute("style", "display:none")
            hideFlist();
        }
        console.log(friendname)
        document.getElementById("divChatname").innerHTML = friendname
        document.getElementById("divpic").src = friendphoto

    })



}

const signIn = () => {
    ///////////// fb login////////////////
    // var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider)
    //////////////google login ///////////

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
let signOut = () => {
    firebase.auth().signOut();
    // .then(function () {
    //     alert('Sign-out successful.')
    // }).catch(function (error) {

    // });
}

let onfirebasestatechange = () => {
    firebase.auth().onAuthStateChanged(onStatechange);
}
let onStatechange = (user) => {
    if (user) {
        // console.log(firebase.auth().currentUser.displayName, firebase.auth().currentUser.photoURL)
        var userprofile = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        }
        var db = firebase.database().ref('users');
        var flag = false;
        db.on('value', function (users) {
            users.forEach(function (data) {
                var user = data.val();
                console.log(data.key, userprofile.email)
                if (user.email === userprofile.email) {
                    currentUserkey = data.key
                    // console.log(currentUserkey)
                    flag = true;
                }
            })
            console.log(flag)
            if (flag === false) {
                firebase.database().ref('users').push(userprofile, callback)
            }
            else {
                document.getElementById('profile-img').src = firebase.auth().currentUser.photoURL;
                document.getElementById('profile-img').title = firebase.auth().currentUser.displayName;

                document.getElementById('lnksignin').style = 'display:none';
                document.getElementById('lnksignout').style = '';
            }
        })



    }
    else {
        document.getElementById('profile-img').src = "images/profile.png";
        document.getElementById('profile-img').title = '';

        document.getElementById('lnksignin').style = '';
        document.getElementById('lnksignout').style = 'display:none';
        document.getElementById('lnknewchat').classList.add('disabled');
    }
}
function callback(error) {
    if (error) {
        alert(error)
    }
    else {
        document.getElementById('profile-img').src = firebase.auth().currentUser.photoURL;
        document.getElementById('profile-img').title = firebase.auth().currentUser.displayName;

        document.getElementById('lnksignin').style = 'display:none';
        document.getElementById('lnksignout').style = '';
    }

}

onfirebasestatechange()

/////////////////////////////////////////////////////////

function showFlist() {
    document.getElementById("side-1").classList.remove("d-none", "d-md-block");
    document.getElementById("side-2").classList.add("d-none");
}
function hideFlist() {
    document.getElementById("side-1").classList.add("d-none", "d-md-block");
    document.getElementById("side-2").classList.remove("d-none");
}

let Onkeydown = () => {
    document.addEventListener("keydown", key => {
        if (key.which == 13) {
            sendmessage()
        }
    })
}
function sendmessage() {
    var sendMessage = {
        msg: document.getElementById("txtmessage").value,
        date: new Date().toLocaleString()
    }
    firebase.database().ref("chatmaessages").child(chatKey).push(sendMessage, error => {
        if (error) alert(error)
        else {
            var message = ` <div class="row justify-content-end"> 
            <div class="col-md-5 col-6 float-right">
                <p class="sender  float-right">
                ${document.getElementById("txtmessage").value} 
                <span class="time">${sendMessage.date}</span>  </p>
            </div>
            <div class="col-md-1 col-1">
                <img src="${firebase.auth().currentUser.photoURL}" class="chat-pic rounded-circle" alt="">
            </div>
        </div>`;
            document.getElementById('message').innerHTML += message;
            document.getElementById("txtmessage").value = '';
            document.getElementById("txtmessage").focus();
        }
    })

}