// src/api/dummyapi.ts

import { ProductsResponse, Product } from '../types/types';

// NOTE: Do not use api url directly instead use dot file
const BASE_URL = 'https://dummyjson.com/products';

export const getAllProducts = async (): Promise<ProductsResponse> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return await response.json();
};
