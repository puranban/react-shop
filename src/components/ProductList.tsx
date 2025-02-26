import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/product.api";
import { ProductsResponse } from "../types/types";
import TextOutput from "./TextOutput";

const ProductList: React.FC = () => {
  const [productsList, setProductsList] = useState<ProductsResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(
    () => {
      const fetchProducts = async () => {
        try {
          const data: ProductsResponse = await getAllProducts();
          setProductsList(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch products");
          setLoading(false);
        }
      };

      fetchProducts();
    }, [],
  );

  const handleProductClick = useCallback(
    (id: number) => {
      navigate(`/product/${id}`);
    },
    [navigate],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const filteredProducts = useMemo(
    () => productsList?.products?.filter(
      (product) => product.title.toLowerCase().includes(search.toLowerCase())
    ) || [],
    [productsList?.products, search],
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search product name..."
        value={search}
        onChange={handleSearchChange}
      />
      { error && <div> { error } </div> }
      <ul className="list">
        { filteredProducts?.length === 0 && <div> No Products Found </div> }
        { filteredProducts?.map((product) => (
          <li
            className="item"
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="item-info">
              <TextOutput label={product.title} />
              <TextOutput value={product.price} />
              <TextOutput value={product.brand} />
              <TextOutput label="Rating:" value={product.rating} />
              <TextOutput label="Stock:" value={product.stock} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
