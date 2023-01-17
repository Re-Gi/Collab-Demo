// //Variable declarations: 
var searchFormEl = document.querySelector('#search-form');
var resultContentEl = document.querySelector('#result-content');
var resultTextEl = document.querySelector('#result-text');
var resultsContainer = document.querySelector("#results");
var searchInputVal = "";

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;
   
    getResults(searchInputVal);
}

function getResults(searchInputVal) {
    console.log(searchInputVal);
    var URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='  + searchInputVal;
    var URL2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + searchInputVal;
    let drinksname = fetch(URL);
    let whattypeAlcohol = fetch(URL2);

    // let drinksname = fetch(URL).then(resp =>resp.json());
    // let whattypeAlcohol = fetch(URL2).then(resp => resp.json());

    // const cocktailsData = async function () {
    //     let results = await Promise.all([drinksname, whattypeAlcohol]);
    //     console.log(results);

    // }();

    Promise.all([drinksname, whattypeAlcohol])
    .then( files => {
        files.forEach(file => {
            process( file.json() );
        })
    })
   
    let process = (prom) => {
        prom.then(data =>{
            cocktailsData = data.drinks === null ? []: data.drinks;
            printResults(cocktailsData);
            checkError(cocktailsData);
            console.log(cocktailsData);
        })
    }
}    
//need to get a way to print some search.
//And also made the images clickable. 
function printResults(cocktails) {
    resultContentEl.innerHTML = "";
    for (const element of cocktails) {
        var list = `<div id="${element.idDrink}" class="cocktail-card"><a><div id='drinkTitle'><p class="nameCocktail">${element.strDrink}<div class="imgWrapper"><img src="${element.strDrinkThumb}"></div>`;
        resultContentEl.innerHTML += list;
        // console.log(cocktails);
    }    
    clickResults(); //This is basically using this function to go to the future.html page. 
}

//error handling event 
//fixed the error function to show: "NO Search Found!"
//Will try to come back to this later to put a better Error Message. But moving to other stuff
function checkError(){
    setTimeout(() =>{
        if(cocktailsData.length === 0){
            console.log("Hey please enter a searchable name");
            // resultContentEl.textContent = "No Search Found!"
            resultContentEl.innerHTML = `<body>
            <h2></h2>
            <img src="./assets/images/nodrinks.jpeg" align="right">
         </body>`;
    } else {
        printResults(cocktailsData);
    }

    },500);
    resultContentEl.innerHTML = "";
    
}
//this will open the drink item to the next page. 
function clickResults() {
    document.querySelectorAll(".cocktail-card").forEach((item) =>{
        item.addEventListener("click", () => openDrink(item));
    });
}
//takes us to the future html 
//setting the drinkid from the api pull will help us in the 'future'
function openDrink(element) {
    localStorage.setItem("id", element.id);
    window.open('future.html');
}

//Event Listener
document.querySelector('#search-form').addEventListener('submit', handleSearchFormSubmit);

// searchFormEl.addEventListener('submit', (e) => {
//     e.preventDefault();
//     searchInputVal = e.target.querySelector('.form-input').value;
//     storeSearchResults(searchInputVal);
    
//     getResults(searchInputVal);
// });
// function storeSearchResults(data) {
//     localStorage.setItem('drinksearch', JSON.stringify(data))
// }