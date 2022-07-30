let surveyItemsContainerEl1 = document.getElementById("surveyItemsContainer1");
let myFormEl = document.getElementById("myForm");
let questionIdEl = document.getElementById("questionId");
let surveyIdEl = document.getElementById("surveyId");
let exception = document.getElementById("exception");
const JWT_TOKEN = localStorage.getItem("JWT TOKEN");
let spinner = document.getElementById('spinner');


let formData = {
    surveyid:"",
    questionid:""
};
questionIdEl.addEventListener("change", function(event) {
    formData.questionid = event.target.value;
});
surveyIdEl.addEventListener("change", function(event) {
    formData.surveyid = event.target.value;
});
function submitFormData(formData){
    spinner.classList.remove('d-none');
    surveyItemsContainerEl1.classList.add('d-none');
    let options = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${JWT_TOKEN}`
        }
    };
    let url=" https://murmuring-earth-53725.herokuapp.com/surveys/"+encodeURIComponent(formData.surveyid)+"/questions/"+encodeURIComponent(formData.questionid);
        fetch(url,options)
            .then((response)=>{
                return response.json();
            })
            .then((question)=>{
                    surveyItemsContainerEl1.textContent=""
                    spinner.classList.add('d-none');
                    surveyItemsContainerEl1.classList.remove('d-none');
                    createSurvey(question);
                    exception.textContent=""
            })
            .catch((error)=>{
                spinner.classList.add('d-none');
                surveyItemsContainerEl1.classList.remove('d-none');
                console.log("Exception Occured");
                surveyItemsContainerEl1.textContent="";
                exception.textContent="Question Number InValid"
            });
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
});

function createSurvey(question){
    let surveyElement = document.createElement("li");
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
    option1.textContent=question.option1;
    optionContainerElement.appendChild(option1);

    let option2 = document.createElement("li");
    option2.textContent=question.option2;
    optionContainerElement.appendChild(option2);

    let option3 = document.createElement("li");
    option3.textContent=question.option3;
    optionContainerElement.appendChild(option3);

    let option4 = document.createElement("li");
    option4.textContent=question.option4;
    optionContainerElement.appendChild(option4);

    let correctAnswer = document.createElement("p");
    correctAnswer.textContent=`Correct Answer : ${question.correctAnswer}`;
    surveyElement.appendChild(correctAnswer);
}

