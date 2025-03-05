import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '@/types/type';

interface CategoryState {
  categories: string[];
  selectedCategory: string;
  recipes: Meal[];
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: '',
  recipes: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setRecipes: (state, action: PayloadAction<Meal[]>) => {
      state.recipes = action.payload
    },
  },
});

export const { setCategories, setSelectedCategory, setRecipes } = categorySlice.actions;
export default categorySlice.reducer;
