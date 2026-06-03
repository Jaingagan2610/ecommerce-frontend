import { observer } from "mobx-react-lite";
import { useCart } from "../context/CartContext";

const Footer = observer(() => {
    const cartStore = useCart();

    return (
        <footer
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "15px",
                borderTop: "1px solid #ddd",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
            }}
        >
            <span>
                Total Items:
                {" "}
                {cartStore.totalItems}
            </span>

            <span>
                Total Value:
                {" "}
                ${cartStore.totalPrice}
            </span>
        </footer>
    );
});

export default Footer;