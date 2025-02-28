import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { Product } from "../types/types";
import TextOutput from "./TextOutput";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data: Product = await getProductById(Number(id));
        setProduct(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <h2>Product item</h2>
      { error && <div>{error}</div> }
      {!product && <div>Product not found</div> }
      {product && (
        <>
          <img
            className="thumbnail-image"
            src={product.thumbnail}
            alt={`${product.title} image}`}
          />
          <div className="product-title">{product.title}</div>
          <TextOutput value={product.description} />
          <TextOutput label="$" value={product.price} />
          <TextOutput label="Category:" value={product.category} />
          <TextOutput label="Brand:" value={product.brand} />
          <TextOutput label="Rating:" value={product.rating} />
          <TextOutput label="Stock:" value={product.stock} />
          <TextOutput label="Availability Status:" value={product.availabilityStatus} />
          <TextOutput label="Minimum Order Quantity:" value={product.minimumOrderQuantity} />
          <div>
            <h4>Images:</h4>
            {product.images.map((image, index) => (
              <img
                className="product-image"
                key={index}
                src={image}
                alt={`${product.title} image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
