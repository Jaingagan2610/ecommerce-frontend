import { observer } from "mobx-react-lite";
import { useCart } from "../context/CartContext";

const Cart = observer(() => {

    const cartStore = useCart();

    return (
        <main
            style={{
                padding: "20px",
            }}
        >
            <h1>My Cart</h1>

            {cartStore.cartItems.length === 0 ? (
                <h3>Cart is Empty</h3>
            ) : (
                <>
                    {cartStore.cartItems.map((item) => (
                        <article
                            key={item.id}
                            style={{
                                display: "flex",
                                gap: "20px",
                                marginBottom: "20px",
                                border: "1px solid #ddd",
                                padding: "10px",
                            }}
                        >
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                width={120}
                            />

                            <div>
                                <h3>{item.title}</h3>

                                <p>${item.price}</p>

                                <p>
                                    Qty: {item.quantity}
                                </p>

                                {/* <button
                                    onClick={() =>
                                        cartStore.removeFromCart(item.id)
                                    }
                                >
                                    Remove
                                </button> */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            cartStore.removeFromCart(item.id)
                                        }
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            cartStore.addToCart(item)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                    <h2>
                        Total: ${cartStore.totalPrice}
                    </h2>
                </>
            )}
        </main>
    );
});

export default Cart;