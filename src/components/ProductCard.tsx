import { Link } from "react-router-dom";
import type { Product } from "../interfaces/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}/details`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />

        <h3>{product.title}</h3>

        <p>${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;