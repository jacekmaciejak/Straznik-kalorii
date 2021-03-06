import { elements } from "./base";
import { Fraction } from "fractional";

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
};

const formatCount = (count) => {
  if (count) {
    //2.5 --> 2 1/2
    //0.5 --> 1/2
    const newCount = Math.round(count * 10000) / 10000;
    const [int, dec] = newCount
      .toString()
      .split(".")
      .map((el) => parseInt(el, 10));
    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};

const createIngredient = (ingredient) => `
                    <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="images/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${formatCount(
                          ingredient.count
                        )}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.ingredient}
                        </div>
                    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
          <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${
    recipe.title
  }" class="recipe__fig-img">
                <h1 class="recipe__fig-title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__details-info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__details-info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love recipe__details-love">
                    <svg class="header__likes">
                        <use href="images/icons.svg#icon-heart${
                          isLiked ? "" : "-outlined"
                        }"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredients-list">
                ${recipe.ingredients.map((el) => createIngredient(el)).join("")}
                </ul>
                <div class="recipe__ingredients-buttons">
                                <button class="btn-small recipe__btn recipe__btn--add bubbly-button">
                                    <svg class="search__icon">
                                        <use href="images/icons.svg#icon-shopping-cart"></use>
                                    </svg>
                                    <span>Add to shopping list</span>
                                </button>
                                <a class="btn-small recipe__btn bubbly-button" href="${
                                  recipe.url
                                }" target="_blank">
                                    <span>Directions</span>
                                    <svg class="search__icon">
                                        <use href="images/icons.svg#icon-triangle-right"></use>
                                    </svg>

                                </a>
                </div>
            </div>
`;
  elements.recipe.insertAdjacentHTML("afterbegin", markup);
};

export const updateServingsIngredients = (recipe) => {
  //Update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.servings;
  //Update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__count"));

  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
// export const buttonRecipeOff = (e) => {
//   document
//     .querySelector(".recipe__btn--add")
//     .setAttribute("class", ".recipe__btn--add-off");
// };
