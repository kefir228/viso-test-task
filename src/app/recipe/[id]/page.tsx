'use client'

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Meal, MealsResponse } from "../../../types/type";

async function getRecipe(id: string): Promise<Meal | null> {
  const response = await axios.get<MealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals ? response.data.meals[0] : null;
}

const getIngredients = (recipe: Meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} (${measure || "не вказано"})`);
    }
  }
  return ingredients;
};

export default function RecipePage() {
  const params = useParams()
  const id = params?.id as string

  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const fetchedRecipe = await getRecipe(id);
        if (fetchedRecipe) {
          setRecipe(fetchedRecipe);
          setIngredients(getIngredients(fetchedRecipe));
        }
      };
      fetchRecipe();
    }
  }, [id])

  if (!recipe) {
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Рецепт не знайдено.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-lg w-full" />
      <p className="mt-4 text-gray-700">
        <strong>Категорія:</strong> {recipe.strCategory} | <strong>Кухня:</strong> {recipe.strArea}
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Інгредієнти</h2>
      <ul className="list-disc pl-6">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">{ingredient}</li>
          ))
        ) : (
          <p>Інгредієнти не знайдені.</p>
        )}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Інструкції</h2>
      <p className="whitespace-pre-wrap">{recipe.strInstructions}</p>
    </div>
  );
}


