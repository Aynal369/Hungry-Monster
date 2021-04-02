function handlerMealSearch() {
  const mealName = document.getElementById("Search_items");
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + mealName.value)
    .then(res => res.json())
    .then(data => foodItem(data.meals));
}

function foodItem(meals) {
  const mealItems = document.getElementById("mealItems");
  if (mealItems.innerHTML !== null) {
    mealItems.innerHTML = "";
    meals.forEach(meal => {
      mealItems.innerHTML += `
                <div onclick="mealInfo('${meal.strMeal}')" class="mealItem">
                    <img src='${meal.strMealThumb}'>
                    <p>${meal.strMeal}</p>
                </div>
                `;
    });
  }
}

function mealInfo(mealName) {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName)
    .then(res => res.json())
    .then(data => mealDetails(data.meals[0]));
}

function mealDetails(meal) {
  const mealDetails = document.getElementById("mealDetails");
  mealDetails.innerHTML = `
    <button title="Close" id="close-btn" onclick="closeDetails()">x</button>
    <img src='${meal.strMealThumb}'>
    <h3>${meal.strMeal}</h3>
    <p>Ingredients</p>
    <ul id="symbols"></ul>
    `;
  const propertyValues = Object.values(meal);
  const ingredientsArray = propertyValues.slice(9, 29);
  const ingredients = ingredientsArray.filter(item => item);
  const symbols = document.getElementById("symbols");
  ingredients.forEach(ingredient => {
    symbols.innerHTML += `
            <li>${ingredient}</li>
            `;
  });
  mealDetails.style.display = "block";
}

function closeDetails() {
  document.getElementById("mealDetails").style.display = "none";
}
