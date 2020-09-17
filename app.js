firebase.database().ref("sms").on('child_added',function(data){
    // console.log(data.val().value)
    var cheekUser = data.val().user
    if (cheekUser === "user1"){
    console.log(cheekUser)
    var spn = document.createElement("span")
        var li = document.createElement("li")
        var text = document.createTextNode(data.val().value)
        spn.appendChild(text)
        spn.setAttribute("class","hello")
        li.setAttribute("class","left")
        li.appendChild(spn)
        render.appendChild(li)
    }
    else{
        var spn = document.createElement("span")
        var li = document.createElement("li")
        var text = document.createTextNode(data.val().value)
        spn.appendChild(text)
        spn.setAttribute("class","hello")
        li.setAttribute("class","right")
        li.appendChild(spn)
        render.appendChild(li)
    }
})
// firebase.database().ref("sms").on('child_added',function(data){
//     console.log(data.val().value)
//     var spn = document.createElement("span")
//         var li = document.createElement("li")
//         var text = document.createTextNode(data.val().value)
//         spn.appendChild(text)
//         spn.setAttribute("class","hello")
//         li.setAttribute("class","right")
//         li.appendChild(spn)
//         render.appendChild(li)
// })

var user = 'user1';
let show = ()=>{
    var item = document.getElementById("msg");
//     var render = document.getElementById("render");
var key = firebase.database().ref().push().key
var msg = {
    key:key,
    user:user,
    value:item.value
}
firebase.database().ref('sms').child(key).set(msg)  
    item.value = "";
 }