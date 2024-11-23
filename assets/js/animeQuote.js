document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("triviaGame");
    const quizCategory = document.getElementById("quizCategory");
    const quizQuestions = document.getElementById("quizQuestions");
    const inputAnswer = document.getElementById("inputAnswer");
    const resultAreas = document.getElementById("resultArea");
    const submitButton = document.getElementById("getResponse")

    let quizAnswer = "";

    quizCategory.addEventListener("change", () => callAPi(quizCategory.value, quizQuestions));
    submitButton.addEventListener("click", (event) => handleSubmit(event, inputAnswer, resultAreas, quizAnswer));



async function callAPi(category, quizQuestions)  {
    const apiUrl ='https://api.api-ninjas.com/v1/trivia?category=' + category;

    try{
        quizQuestions.innerHTML = "<h4>Loading... </h4>";

        const response = await fetch(apiUrl,{
            headers:{
                'X-Api-Key':'asQGoRW9zHmWfr4mGLV9qg==AGlKBAgpHjj3BGe2'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load api data.");
        }

        const data = await response.json();
        if (data.length > 0) {
            const questionData = data[0];
            quizAnswer = questionData.answer.toLowerCase();
            quizQuestions.innerHTML = `<h4>${questionData.question}</h4>`;
        } else{
            quizQuestions.innerHTML='<h4> No question found for this category.</h4>';
        }
    }
    catch(error) {
        quizQuestions.innerHTML='<h4> Failed to load question. ${error.message}</h4>';
    }
}


function handleSubmit(event, inputAnswer, resultArea, quizAnswer) {
    event.preventDefault();
    const playersAnswer = inputAnswer.value.trim().toLowerCase();

     if (!quizAnswer) {
        resultArea.innerHTML = `<p style="color: red;">Please select a category and load a question first.</p>`;
        return;
    }

     if (playersAnswer === quizAnswer) {
         resultArea.innerHTML = `<p style="color: green;">Correct! 🎉</p>`;
     }else{
         resultArea.innerHTML = `<p style="color: red;">Incorrect. The correct answer is: <strong>${quizAnswer}</strong>.</p>`;

     }
    }
});
