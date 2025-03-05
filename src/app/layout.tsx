'use client'
import "./globals.css";
import { Header } from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setCategories, setRecipes } from "@/redux/categorySlice";
import { Meal, MealsResponse } from "../types/type";
import { useEffect } from "react";
import axios from "axios";


async function getData(): Promise<Meal[]> {
  const response = await axios.get<MealsResponse>("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  return response.data.meals || [];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const uniqueCategories = Array.from(new Set(data.map((recipe) => recipe.strCategory)));
      store.dispatch(setCategories(uniqueCategories));
      store.dispatch(setRecipes(data));
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}
