const welcomeMessage = document.getElementById("welcomeMessage");
let options = {
    method: "GET",
    Headers:{
        Host:"localhost:8081"
    }

};

fetch("https://murmuring-earth-53725.herokuapp.com/welcome",options)
    .then((response)=>{
        return response.text();
    })
    .then((s)=>{
        welcomeMessage.textContent=s;
        return s;
    })
    .catch((error)=>{
        console.log("hhhh");
        console.log(error.text);
    });
