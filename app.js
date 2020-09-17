
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

var user;
let username = ()=>{
var inner1 = document.getElementById("username1").value
var inner2 = document.getElementById("username2").value
// console.log(inner2)
if (inner1 != ""){
    user = 'user1'
}
else if(inner1 == ""){
    user = 'user2'
}
else{
    alert("enter name plz")
}
console.log(user)

}

firebase.database().ref("sms").on('child_added', function (data) {
    // console.log(data.val().value)
    var cheekUser = data.val().user
    if (cheekUser === "user1") {
        // console.log(cheekUser)
        var spn = document.createElement("span")
        var li = document.createElement("li")
        var text = document.createTextNode(data.val().value)
        spn.appendChild(text)
        spn.setAttribute("class", "hello")
        li.setAttribute("class", "left")
        li.appendChild(spn)
        render.appendChild(li)
    }
    else {
        var spn = document.createElement("span")
        var li = document.createElement("li")
        var text = document.createTextNode(data.val().value)
        spn.appendChild(text)
        spn.setAttribute("class", "hello")
        li.setAttribute("class", "right")
        li.appendChild(spn)
        render.appendChild(li)
    }
})



let show = () => {
    var item = document.getElementById("msg");
    //     var render = document.getElementById("render");
    var key = firebase.database().ref().push().key
    var msg = {
        key: key,
        user: user,
        value: item.value
    }
    firebase.database().ref('sms').child(key).set(msg)
    item.value = "";
}