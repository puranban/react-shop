export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    availabilityStatus: string;
    minimumOrderQuantity: number;
}

export interface ProductsResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}

