import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { products } = useProducts();

  const cartStore = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

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