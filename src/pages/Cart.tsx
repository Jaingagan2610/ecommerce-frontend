import { observer } from "mobx-react-lite";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

const Cart = observer(() => {
  const cartStore = useCart();
  const navigate = useNavigate();

  const handleIncrement = (item: any) => {
    cartStore.addToCart(item);
    toast.info(`Increased "${item.title}" quantity`, { autoClose: 1000, hideProgressBar: true });
  };

  const handleDecrement = (item: any) => {
    cartStore.removeFromCart(item.id);
    toast.info(`Decreased "${item.title}" quantity`, { autoClose: 1000, hideProgressBar: true });
  };

  const handleRemove = (item: any) => {
    const qty = item.quantity;
    for (let i = 0; i < qty; i++) {
      cartStore.removeFromCart(item.id);
    }
    toast.warn(`Removed "${item.title}" from cart`, { autoClose: 2000, hideProgressBar: true });
  };

  const handleCheckout = () => {
    alert("Thank you for your order! Checkout successful.");
  };

  return (
    <main style={{ padding: "3rem 1.5rem 5rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiShoppingBag size={32} style={{ color: "var(--primary)" }} /> Shopping Cart
        </h1>

        {cartStore.cartItems.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "4rem 2rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Your cart is empty</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
              Looks like you haven't added anything to your cart yet. Let's find some amazing items!
            </p>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Items List */}
            <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cartStore.cartItems.map((item) => (
                <article
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.25rem",
                    boxShadow: "var(--shadow-sm)",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "var(--radius-md)",
                      objectFit: "cover",
                      backgroundColor: "var(--bg-app)",
                      border: "1px solid var(--border)",
                    }}
                  />

                  <div style={{ flex: "1 1 200px" }}>
                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.25rem", fontWeight: 650 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 600 }}>
                      {item.category?.name || "Product"}
                    </p>
                    <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: "1rem", display: "inline-block", marginTop: "0.25rem" }}>
                      ${item.price}
                    </span>
                  </div>

                  {/* Quantity and Actions Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginLeft: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "#ffffff",
                        padding: "0.2rem",
                      }}
                    >
                      <button
                        onClick={() => handleDecrement(item)}
                        style={{
                          width: "28px",
                          height: "28px",
                          padding: 0,
                          border: "none",
                          backgroundColor: "transparent",
                          color: "var(--text-main)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span style={{ width: "28px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        style={{
                          width: "28px",
                          height: "28px",
                          padding: 0,
                          border: "none",
                          backgroundColor: "transparent",
                          color: "var(--text-main)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: 0,
                        backgroundColor: "#fef2f2",
                        color: "#ef4444",
                        border: "none",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {/* Simple Total & Checkout Section */}
            <section
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", display: "block" }}>
                  Grand Total
                </span>
                <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>
                  ${cartStore.totalPrice}
                </span>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/")}
                  style={{ padding: "0.75rem 1.25rem" }}
                >
                  <FiArrowLeft /> Continue Shopping
                </button>
                
                <button
                  onClick={handleCheckout}
                  className="btn-primary"
                  style={{ padding: "0.75rem 1.5rem" }}
                >
                  Checkout Now <FiArrowRight />
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
});

export default Cart;