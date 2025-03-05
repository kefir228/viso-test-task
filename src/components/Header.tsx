'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { setSelectedCategory } from '../redux/categorySlice'


export const Header: React.FC = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state: RootState) => state.category.categories);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedCategory(e.target.value))
    }

    return (
        <header>
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">Recipe App</h1>
                <select onChange={handleCategoryChange} className="p-2 border rounded">
                    <option value="">All Categories</option>
                    {categories && categories.length > 0 && categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}

