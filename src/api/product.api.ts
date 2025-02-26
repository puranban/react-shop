// src/api/dummyapi.ts

import { ProductsResponse, Product } from '../types/types';

const BASE_URL = process.env.REACT_APP_API_KEY;

interface Props {
    limit: number;
    skip: number;
}

export const getAllProducts = async (props: Props): Promise<ProductsResponse> => {
    const {limit, skip} = props;

    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
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
