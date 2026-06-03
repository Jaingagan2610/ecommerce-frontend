import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useCart } from "../context/CartContext";
import { getProductById } from "../api/productApi";
import type { Product } from "../interfaces/Product";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const cartStore = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    cartStore.addToCart(product);
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate("/")}
      >
        ← Back To Home
      </button>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          width={300}
        />

        <h1>{product.title}</h1>

        <h2>${product.price}</h2>

        <p>{product.description}</p>

        <button
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;