let surveyIdEl = document.getElementById("surveyId");

let descriptionEl = document.getElementById("description");

let correctAnsEl = document.getElementById("correctAns");

let opt1El = document.getElementById("opt1");

let opt2El = document.getElementById("opt2");

let opt3El = document.getElementById("opt3");

let opt4El = document.getElementById("opt4");

let myFormEl = document.getElementById("myForm");

const JWT_TOKEN = localStorage.getItem("JWT TOKEN");

let submitForm=false;

let  surveyid=""
let formData = {
    description:"",
    correctAnswer:"",
    option1:"",
    option2:"",
    option3:"",
    option4:""
};

surveyIdEl.addEventListener("change", function(event) {
    surveyid = event.target.value;
});

descriptionEl.addEventListener("change", function(event) {
    formData.description = event.target.value;
});

correctAnsEl.addEventListener("change", function(event) {
    formData.correctAnswer = event.target.value;
});

opt1El.addEventListener("change", function(event) {
    formData.option1 = event.target.value;
});
opt2El.addEventListener("change", function(event) {
    formData.option2 = event.target.value;
});

opt3El.addEventListener("change", function(event) {
    formData.option3 = event.target.value;
});

opt4El.addEventListener("change", function(event) {
    formData.option4= event.target.value;
});

function submitFormData(formData){
    console.log(formData)
    let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT_TOKEN}`
        },
        body: JSON.stringify(formData),
      };
      
      fetch("https://murmuring-earth-53725.herokuapp.com/surveys/"+encodeURIComponent(surveyid)+"/questions", options)
        .then(function(response) {
          return response.body;
        })
        .then(function(jsonData) {
          console.log(jsonData);
          alert("Question posted successfully!!")
        })
        .catch(function(error) {
            console.log("Something Went wrong");
          });
}
function validateFormData(formData) {
    if (surveyid === "" || formData.description === "" || formData.correctAnswer === "" || formData.option1 === ""
    && formData.option2=== "" || formData.option3 === "" || formData.option4 === "") {
        submitForm=false;
        console.log("hi")
       alert("Required to fill all the columns")
    }

    else{
        submitForm=true;
    }
    
   
}
myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateFormData(formData);
    if(submitForm){
        submitFormData(formData);
    }
});

