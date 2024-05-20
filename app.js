let api="https://www.themealdb.com/api/json/v1/1/search.php?s=";
let searchInput=document.querySelector(".search-input");
let error=document.querySelector(".error");
error.classList.add("hidden");
let container=document.querySelector(".container");
let recipeModal=document.querySelector(".recipe-modal");
recipeModal.classList.add("hidden");
let cancelModal=document.querySelector(".cancel-modal");
let loader=document.querySelector(".loader");
loader.classList.add("hidden");

function searchRecipe()
{
const MIN_LOADER_TIME = 3000;
const loaderStartTime = Date.now();
loader.classList.remove("hidden");
container.innerHTML="";
error.innerText="";
let query=api+searchInput.value;
fetch(query).then((data)=>{
    return data.json();
}).then((data)=>{
  loader.classList.add("hidden");
     if(data.meals==null)
      {
        error.classList.remove("hidden");  
        error.innerText="Recipe does not found!";
      }
      else{
         data.meals.forEach((meal)=>{
           let recipediv=document.createElement("div");
           recipediv.classList.add("recipe");
           let imgElement=document.createElement("img");
           imgElement.src=meal.strMealThumb;
           recipediv.appendChild(imgElement);
           let dishName=document.createElement("p");
           dishName.innerText=meal.strMeal;
           recipediv.appendChild(dishName);
           let dishArea=document.createElement("p");
           dishArea.innerText=meal.strArea+" "+"Dish";
           recipediv.appendChild(dishArea);
           let dishCategory=document.createElement("p");
           dishCategory.innerText="Belongs to "+meal.strCategory+" Category";
           recipediv.appendChild(dishCategory);
           let button=document.createElement("button");
           button.textContent="View Recipe";
           button.classList.add("view-btn");
           recipediv.appendChild(button);
           container.appendChild(recipediv);
           button.addEventListener("click",(e)=>{
           viewRecipe(meal);
           });

         })
      }
})
}
function viewRecipe(meal)
{
  recipeModal.classList.remove("hidden");
  let title=document.createElement("h2");
  title.innerText=meal.strMeal;
  recipeModal.appendChild(title);
  let subtitle=document.createElement("h3");
  subtitle.innerText="Ingredient & Measurement:";
  recipeModal.appendChild(subtitle);
  for(let i=1;i<=20;i++)
    {
   let ing="strIngredient"+`${i}`;
   let mea="strMeasure"+`${i}`;
   if(meal[ing]!="" && meal[mea]!="")
    {
      let ingredient=document.createElement("p");
      ingredient.innerText=`${i}`+". "+meal[ing]+" - "+meal[mea];
      recipeModal.appendChild(ingredient);
    }

}
    let secondSubtitle=document.createElement("h3");
    secondSubtitle.innerText="Instructions:";
    recipeModal.appendChild(secondSubtitle);

    let instructions=document.createElement("p");
    instructions.innerText=meal.strInstructions;
    recipeModal.appendChild(instructions);

    disableButton();
}

function disableButton()
{
     let buttons=document.querySelectorAll("button");
     buttons.forEach((button)=>{
      button.disabled=true;
      button.classList.add("disable-button");
    })
}
function enableButton()
{
  let buttons=document.querySelectorAll("button");
     buttons.forEach((button)=>{
      button.disabled=false;
      button.classList.remove("disable-button");
    })
}
cancelModal.addEventListener("click",()=>{
  enableButton();
  recipeModal.classList.add("hidden");
  recipeModal.textContent="";
  recipeModal.appendChild(cancelModal);
})
