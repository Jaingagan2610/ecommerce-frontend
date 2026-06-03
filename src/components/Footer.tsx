import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { FiMail, FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

const Footer = observer(() => {
  return (
    <footer
      style={{
        marginTop: "auto",
        backgroundColor: "#ffffff",
        borderTop: "1px solid var(--border)",
        padding: "3rem 0 2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            textAlign: "left",
            marginBottom: "2rem",
          }}
        >
          {/* Brand Info */}
          <div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              CLICKCART
            </span>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              Experience the best in premium lifestyle products. Quality, sustainability, and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Customer Service</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
              <li>
                <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "var(--transition-fast)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Contact Us</Link>
              </li>
              <li>
                <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "var(--transition-fast)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "var(--transition-fast)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Subscribe to ClickCart</h4>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                maxWidth: "280px",
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--sans)",
                }}
              />
              <button
                className="btn-primary"
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "none",
                }}
                onClick={() => alert("Subscribed!")}
              >
                <FiMail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <span>&copy; {new Date().getFullYear()} ClickCart. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#" style={{ color: "var(--text-muted)" }}><FiInstagram size={18} /></a>
            <a href="#" style={{ color: "var(--text-muted)" }}><FiTwitter size={18} /></a>
            <a href="#" style={{ color: "var(--text-muted)" }}><FiFacebook size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;