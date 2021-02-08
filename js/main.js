// Get Elements
const search = document.getElementById("search-meal");

// Fetch Meals after click on search icon from API
search.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = document.getElementById("search-input").value;
    fetchedMeals(String(searchText));
});


// Method for search meals
const fetchedMeals = (searchText) => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchText)
        .then((response) => {
            return response.json();
        })
        .then((foods) => {
            const meals = foods.meals;

            if (!meals) {
                const searchOutput = getDocumentClean("search-output");
                const message = basicCard('No Meals Has Been Found');
                searchOutput.appendChild(message);

                return;
            }

            // Render html
            const searchOutput = getDocumentClean("search-output");

            // Clean Previous single element
            getDocumentClean("one-meal-container");

            meals.map((meal) => {
                const cardMeal = oneMealCard(meal);
                searchOutput.appendChild(cardMeal);
            });

            const oneMeals = document.getElementsByClassName("one-meal");
            console.log(oneMeals);
            Array.from(oneMeals).forEach(function (element) {
                element.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch(this.href)
                        .then((response) => response.json())
                        .then((oneMealData) => {
                            const meal = oneMealData.meals[0];
                            const oneMealContainer = getDocumentClean(
                                "one-meal-container"
                            );
                            const oneMealCardBlock = oneMealCardWithID(
                                meal
                            );
                            oneMealContainer.appendChild(
                                oneMealCardBlock
                            );
                        });
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

// Build One Meal Card Using Bootstrap DOM Card
const oneMealCard = (meal) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-3";
    col.style.margin = "10px";
    col.style.padding = "10px";
    col.style.maxHeight = "500px";
    

    // Link
    const cardLink = document.createElement("a");
    cardLink.className = "one-meal";
    cardLink.href =
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal.idMeal;
    cardLink.style.textDecoration = "none"; 
    cardLink.style.textAlign = "center";
    cardLink.style.color = "black"; 
    // cardLink.style.borderRadius = "20px 20px 0px 0px";    

    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";
    // style on card
    card.style.boxShadow = "10px 10px 10px gray";
    card.style.border = "none";
    card.style.background = "none";
    card.style.borderRadius = "15px";

    // Create Img in cards
    const cardImage = document.createElement("img");
    cardImage.src = meal.strMealThumb;
    cardImage.alt = meal.strMeal;
    // style
    cardImage.style.borderRadius = "15px 15px 0px 0px";

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    // style
    cardBody.style.backgroundColor = "aquamarine";
    cardBody.style.borderRadius = "0px 0px 15px 15px";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    const cardTitleText = document.createTextNode(meal.strMeal);
    cardTitle.appendChild(cardTitleText);

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    cardLink.appendChild(card);
    col.appendChild(cardLink);

    return col;
};

// Method for create  one card for meal
const oneMealCardWithID = (meal) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-6 offset-3";
  

    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";
    

    // Create card Img 
    const cardImage = document.createElement("img");
    cardImage.src = meal.strMealThumb;
    cardImage.alt = meal.strMeal;

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    const cardTitleText = document.createTextNode(meal.strMeal);
    cardTitle.appendChild(cardTitleText);

    // Ingredients
    const ul = document.createElement("ul");

    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        console.log(ingredient);

        if (ingredient) {
            let li = document.createElement("li");
            let liText = document.createTextNode(ingredient);
            
            li.appendChild(liText);

            ul.appendChild(li);
            // style
            li.style.marginLeft = "15%";
        }
    }

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    card.appendChild(ul);

    col.appendChild(card);

    return col;
};

// Basic card display with message
const basicCard = (message) => {
    // Grid Column
    const col = document.createElement("div");
    col.className = "col-md-6 offset-2";

    // Create Card Element
    const card = document.createElement("div");
    card.className = "card";
  

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title text-center";
    const cardTitleText = document.createTextNode(message);
    cardTitle.appendChild(cardTitleText);

    // Add cardTitle to CardBody
    cardBody.appendChild(cardTitle);

    // Add image to card body
    card.appendChild(cardBody);

    col.appendChild(card);

    return col;
}

// Function for get element and clean previous child element
const getDocumentClean = (documentsID) => {
    const documentElement = document.getElementById(documentsID);
    documentElement.innerHTML = "";

    return documentElement;
}