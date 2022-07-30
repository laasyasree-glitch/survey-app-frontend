let surveyItemsContainerEl1 = document.getElementById("surveyItemsContainer1");
let surveyIdEl = document.getElementById("surveyId");
let myFormEl = document.getElementById("myForm");
let spinner = document.getElementById('spinner');
let headingEl = document.getElementById("heading");
let exception = document.getElementById("exception");

headingEl.textContent=`Hi ${localStorage.getItem("Username")}`
const JWT_TOKEN = localStorage.getItem("JWT TOKEN")

let formData = {
    surveyid:"",
};

surveyIdEl.addEventListener("change", function(event) {
    formData.surveyid = event.target.value;
});

let options = {
    method: "GET",
    headers:{
        Authorization: `Bearer ${JWT_TOKEN}`
    }
};
function submitFormData(url){
    spinner.classList.remove('d-none');
    surveyItemsContainerEl1.classList.add('d-none');
fetch("https://murmuring-earth-53725.herokuapp.com/surveys/"+encodeURIComponent(formData.surveyid)+"/questions",options)
    .then((response)=>{
        return response.json();
    })
    .then((arrayOfQuestions)=>{
        surveyItemsContainerEl1.textContent="";
        spinner.classList.add('d-none');
        surveyItemsContainerEl1.classList.remove('d-none');
        for (let question of arrayOfQuestions) {
            createSurvey(question);
        }
        exception.textContent=""
    })
    .catch((error)=>{
        spinner.classList.add('d-none');
        surveyItemsContainerEl1.classList.remove('d-none');
        console.log("Exception Occured");
        surveyItemsContainerEl1.textContent="";
        exception.textContent="Survey Number InValid"
    });
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
});

function createSurvey(question){
    let surveyElement = document.createElement("li");
    surveyElement.classList.add("question")
    surveyItemsContainerEl1.appendChild(surveyElement);

    let questionId = document.createElement("p");
    questionId.textContent=question.id+". ";
    surveyElement.appendChild(questionId);

    let questionDescription = document.createElement("span");
    questionDescription.textContent=question.description;
    questionId.appendChild(questionDescription);

    let optionContainerElement = document.createElement("ol");
    optionContainerElement.classList.add("optionsContainer")
    surveyElement.appendChild(optionContainerElement);

    let option1 = document.createElement("li");
    option1.classList.add("option")
    option1.textContent=question.option1;
    optionContainerElement.appendChild(option1);

    let option2 = document.createElement("li");
    option2.classList.add("option")
    option2.textContent=question.option2;
    optionContainerElement.appendChild(option2);

    let option3 = document.createElement("li");
    option3.classList.add("option")
    option3.textContent=question.option3;
    optionContainerElement.appendChild(option3);

    let option4 = document.createElement("li");
    option4.classList.add("option")
    option4.textContent=question.option4;
    optionContainerElement.appendChild(option4);

    let correctAnswer = document.createElement("p");
    correctAnswer.classList.add("option")
    correctAnswer.textContent=`Correct Answer : ${question.correctAnswer}`;
    surveyElement.appendChild(correctAnswer);
}