// get elements form html
const search = document.getElementById("search-meal");

// Search Meals after click on search button
search.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = document.getElementById("search-btn").value;
    fetchedMeals(String(searchText));
});


// Method for fetched meals from API
const fetchedMeals = (searchText) => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchText)
        .then((response) => {
            return response.json();
        })
        .then((foods) => {
            const meals = foods.meals;

            if (!meals) {
                const searchOutput = getDocumentAndClean("search-result");
                const message = basicCard('No Meals Has Been Found');
                searchOutput.appendChild(message);

                return;
            }

            // Render html
            const searchOutput = getDocumentAndClean("search-result");

            // Clean Previous single element
            getDocumentAndClean("one-meal-container");

            meals.map((meal) => {
                const cardMeal = singleMealCard(meal);
                searchOutput.appendChild(cardMeal);
            });

            const singleMeals = document.getElementsByClassName("single-meal");
            console.log(singleMeals);
            Array.from(singleMeals).forEach(function (element) {
                element.addEventListener("click", function (e) {
                    e.preventDefault();
                    fetch(this.href)
                        .then((response) => response.json())
                        .then((singleMealData) => {
                            const meal = singleMealData.meals[0];
                            const singleMealContainer = getDocumentAndClean(
                                "one-meal-container"
                            );
                            const singleMealCardBlock = singleMealCardWithID(
                                meal
                            );
                            singleMealContainer.appendChild(
                                singleMealCardBlock
                            );
                        });
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};