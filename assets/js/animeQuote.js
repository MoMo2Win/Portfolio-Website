/*
function clearArea(){
    document.getElementById("resultArea").innerText = "";
}
*/

function returnFact(){
    const animeNameInput = document.getElementById('animeName').value;
    const animeName = animeNameInput.replace(/\s+/g, "_");

    if (animeName === ""){
        document.getElementById('resultArea').innerText = 'Please enter an anime name';
        return;
    }

     const url = `https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`;

    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error(`API request failed with status code ${response.status}`);
            }
            return response.json();
        })

        .then(data =>{
            if (data.success && data.data.length>0){
                document.getElementById('resultArea').innerText = data.data[0].fact;
            }
            else{
                document.getElementById('resultArea').innerText = 'No facts found for this anime';
            }
        })
        .catch(error =>{
            document.getElementById('resultArea').innerText = `Error: ${error.message}`;
        })
}


/*function returnQuote(){
    const animeName = document.getElementById('animeName').value;

    if (animeName === ""){
        document.getElementById('resultArea').innerText = 'Please enter an anime';
        return;
    }

    const url = `https://animechan.io/api/quotes/anime?title=${animeName}`;

    fetch(url, {
        headers:{
            'x-api-key': 'ani-vejqkXbj0XWfKDRxbnYb8wR2OuUyAa5SHOb3Hu6knVJYL2P39HKtDCzRcDnq',
        }
    })

        .then(response =>
        {if (!response.ok) {
            throw new Error(`$Api request failed with status code ${response.status}`);
        }
        return response.json()})

         .then(data => {
            if (data && data.data) {
                const quoteContent = data.data.content;
                const anime = data.data.anime.name;
                const character = data.data.character.name;
                document.getElementById('resultArea').innerText =
                    `${character} from ${anime} says: "${quoteContent}"`;
            } else {
                document.getElementById('resultArea').innerText =
                    "No quotes found for the specified anime.";
            }
        })
        .catch((error) => {
            document.getElementById('resultArea').innerText = `Error: ${error.message}`;
        });

}*/


document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById("getResponse");
    button.addEventListener("click", function(event){
        event.preventDefault();
        returnQuote();
    })
})
