import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../api/productApi";
import type { Product } from "../interfaces/Product";
import { FiArrowLeft, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartStore = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    // Add multiple quantities by loop or we can just call it quantity times
    for (let i = 0; i < quantity; i++) {
      cartStore.addToCart(product);
    }
    toast.success(`Added ${quantity} x "${product.title}" to cart!`, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", gap: "1rem" }}>
        <div className="animate-spin" style={{ width: "40px", height: "40px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%" }} />
        <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2>Product Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The product you are looking for does not exist or has been removed.</p>
        <button className="btn-primary" onClick={() => navigate("/")}><FiArrowLeft /> Back to Shop</button>
      </div>
    );
  }

  return (
    <main className="container" style={{ padding: "2rem 1.5rem 4rem" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn-secondary"
        style={{
          marginBottom: "2rem",
          padding: "0.5rem 1rem",
        }}
      >
        <FiArrowLeft size={16} /> Back to Products
      </button>

      <article
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
        }}
      >
        {/* Left Gallery Panel */}
        <section
          style={{
            flex: "1 1 450px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1/1",
            }}
          >
            <img
              src={activeImage}
              alt={product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                overflowX: "auto",
                padding: "0.25rem 0",
              }}
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "var(--radius-sm)",
                    border: activeImage === img ? "2px solid var(--primary)" : "1px solid var(--border)",
                    overflow: "hidden",
                    padding: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-sm)",
                    opacity: activeImage === img ? 1 : 0.7,
                    transition: "var(--transition-fast)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseOut={(e) => {
                    if (activeImage !== img) e.currentTarget.style.opacity = "0.7";
                  }}
                >
                  <img src={img} alt={`Thumb ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Right Details Info Panel */}
        <section
          style={{
            flex: "1 1 400px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                textTransform: "uppercase",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                display: "inline-block",
                marginBottom: "0.5rem",
              }}
            >
              {product.category?.name || "Premium Goods"}
            </span>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "var(--text-dark)" }}>
              {product.title}
            </h1>
            

          </div>

          <div
            style={{
              padding: "1rem 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--primary)",
              }}
            >
              ${product.price}
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Product Description</h3>
            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              {product.description}
            </p>
          </div>

          {/* Quantity Controls and Add To Cart Actions */}
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "#ffffff",
                padding: "0.25rem",
              }}
            >
              <button
                data-testid="quantity-decrement"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "36px",
                  height: "36px",
                  padding: 0,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiMinus size={16} />
              </button>
              <span
                data-testid="quantity-value"
                style={{ width: "40px", textAlign: "center", fontWeight: 700, fontSize: "1rem" }}
              >
                {quantity}
              </span>
              <button
                data-testid="quantity-increment"
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "36px",
                  height: "36px",
                  padding: 0,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiPlus size={16} />
              </button>
            </div>

            <button
              data-testid="add-to-cart-btn"
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                flex: "1 1 200px",
                padding: "0.9rem 2rem",
                fontSize: "1rem",
              }}
            >
              <FiShoppingBag size={18} /> Add To Cart
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProductDetail;