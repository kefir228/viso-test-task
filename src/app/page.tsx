'use client'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../redux/store";
import { setRecipes } from "../redux/categorySlice";
import Link from "next/link";
import { Meal, MealsResponse } from "../types/type";

async function getData(category: string): Promise<Meal[]> {
  const url = category
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const response = await axios.get<MealsResponse>(url)
  return response.data.meals || [];
}

export default function Home() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const recipes = useSelector((state: RootState) => state.category.recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await getData(selectedCategory);
      dispatch(setRecipes(fetchedRecipes));
    };

    fetchRecipes();
  }, [selectedCategory, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.strMeal}</h3>
                <p className="text-gray-600">{recipe.strCategory} | {recipe.strArea}</p>
                <Link href={`/recipe/${recipe.idMeal}`} className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Деталі
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
}

