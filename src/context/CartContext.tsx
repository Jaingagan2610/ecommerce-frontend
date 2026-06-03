import {
    createContext,
    useContext,
    type ReactNode,
} from "react";

import cartStore from "../store/CartStore";

const CartContext = createContext(cartStore);

export const CartProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <CartContext.Provider value={cartStore}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);