import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { observer } from "mobx-react-lite";
import { FiShoppingBag, FiHome } from "react-icons/fi";

const Navbar = observer(() => {
  const cartStore = useCart();
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-dark)",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "1.25rem",
              boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
            }}
          >
            C
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.35rem",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, var(--text-dark) 0%, var(--primary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CLICKCART
          </span>
        </Link>

        {/* Navigation Actions */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: location.pathname === "/" ? "var(--primary)" : "var(--text-main)",
              fontWeight: 600,
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "var(--transition-fast)",
            }}
            onMouseOver={(e) => {
              if (location.pathname !== "/") e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseOut={(e) => {
              if (location.pathname !== "/") e.currentTarget.style.color = "var(--text-main)";
            }}
          >
            <FiHome size={18} />
            <span style={{ display: window.innerWidth > 640 ? "inline" : "none" }}>Shop</span>
          </Link>

          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: location.pathname === "/cart" ? "var(--primary)" : "var(--text-main)",
              fontWeight: 600,
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              position: "relative",
              padding: "0.5rem 0.75rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: location.pathname === "/cart" ? "var(--primary-light)" : "transparent",
              transition: "var(--transition-fast)",
            }}
          >
            <FiShoppingBag size={18} />
            <span style={{ display: window.innerWidth > 640 ? "inline" : "none" }}>Cart</span>
            {cartStore.totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "50%",
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ffffff",
                  boxShadow: "var(--shadow-sm)",
                  animation: "pulse 2s infinite",
                }}
              >
                {cartStore.totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
});

export default Navbar;