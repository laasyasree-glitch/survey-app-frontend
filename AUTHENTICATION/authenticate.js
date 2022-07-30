let usernameEl = document.getElementById("username");
let usernameErrMsgEl = document.getElementById("usernameErrMsg");
let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");
let myFormEl = document.getElementById("myForm");
let InvalidCredentials = document.getElementById("InvalidCredentials");
let container = document.getElementById("container");
let spinner = document.getElementById('spinner');
let formData = {
    "username": "",
    "password": "",
};

usernameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        usernameErrMsgEl.textContent = "Required*";
    } else {
        usernameErrMsgEl.textContent = "";
    }

    formData.username = event.target.value;
});

passwordEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        passwordErrMsgEl.textContent = "Required*";
    } else {
        passwordErrMsgEl.textContent = "";
    }

    formData.password = event.target.value;
});
function validateFormData(formData) {
    if (formData.username === "") {
        usernameErrMsgEl.textContent = "Required*";
    }
    if (formData.password === "") {
        passwordErrMsgEl.textContent = "Required*";
    }
}
function submitFormData(formData){
    let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      
      fetch("https://murmuring-earth-53725.herokuapp.com/authenticate", options)
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonData) {
          InvalidCredentials.textContent=""
          console.log(jsonData);
          localStorage.setItem("JWT TOKEN", jsonData.jwtToken)
          localStorage.setItem("Username", formData.username)
          localStorage.setItem("userRole", jsonData.userole)
          spinner.classList.remove('d-none');
          container.classList.add('d-none');
          window.location.href="../SurveyApp/allQuestions.html"
          spinner.classList.add('d-none');
          container.classList.remove('d-none');
          
        })
        .catch(function() {
            InvalidCredentials.textContent="Your Credentials are Invalid"

        })
}
myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
});

