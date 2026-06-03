import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
    const cartStore = useCart();

    return (
        <header
            style={{
                padding: "15px",
                borderBottom:
                    "1px solid #ddd",
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px"
            }}
        >
            <Link to="/">
                Home
            </Link>

            <Link to="/cart">
                Cart (
                {cartStore.totalItems})
            </Link>
        </header>
    );
});

export default Navbar;