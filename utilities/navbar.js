let navLinks = document.getElementById("navLinks");

let userRole = localStorage.getItem("userRole");

let getAllQuestions = document.createElement("a");
getAllQuestions.classList.add("nav-link","active","option");
getAllQuestions.href="allQuestions.html";
getAllQuestions.textContent="Get All Questions";
navLinks.appendChild(getAllQuestions);

let specificQuestion = document.createElement("a");
specificQuestion.classList.add("nav-link","active","option");
specificQuestion.href="specificQuestion.html";
specificQuestion.textContent="Specific Question";
navLinks.appendChild(specificQuestion);

if(userRole==="Admin"){
    let postRequest = document.createElement("a");
    postRequest.classList.add("nav-link","active","option");
    postRequest.href="postQuestion.html";
    postRequest.textContent="Post Question";
    navLinks.appendChild(postRequest);
}

let logout = document.createElement("a");
logout.classList.add("nav-link","active","option");
logout.href="../WELCOME PAGE/welcome.html";
logout.textContent="Logout";
navLinks.appendChild(logout);