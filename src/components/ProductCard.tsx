import { Link } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useCart } from "../context/CartContext";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const cartStore = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.addToCart(product);
    toast.success(`"${product.title}" added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  // Safe check for category
  const categoryName = product.category?.name || "Product";

  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <article
        className="product-card"
        style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          transition: "var(--transition-normal)",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          e.currentTarget.style.borderColor = "var(--border-hover)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        {/* Product Image and Category Badge */}
        <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
          <img
            src={product.images[0]}
            alt={product.title}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(4px)",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-sm)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {categoryName}
          </span>
        </div>

        {/* Product Metadata info */}
        <div
          style={{
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "0.5rem",
          }}
        >

          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 650,
              color: "var(--text-dark)",
              margin: 0,
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.8rem",
            }}
          >
            {product.title}
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--primary)",
              }}
            >
              ${product.price}
            </span>

            <button
              onClick={handleQuickAdd}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "var(--transition-fast)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary-light)";
                e.currentTarget.style.color = "var(--primary)";
              }}
            >
              <FiPlus size={18} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;