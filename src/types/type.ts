export interface Meal {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    [key: string]: string | null;
}

export interface MealsResponse {
    meals: Meal[] | null
}