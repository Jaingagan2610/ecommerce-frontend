import { makeAutoObservable } from "mobx";
import type { CartItem } from "../interfaces/CartItem";
import type { Product } from "../interfaces/Product";

class CartStore {
    cartItems: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);

        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
        }
    }

    addToCart = (product: Product) => {
        const existingItem = this.cartItems.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({
                ...product,
                quantity: 1,
            });
        }

        this.saveCart();
    }

    removeFromCart = (productId: number) => {
        const existingItem = this.cartItems.find(
            (item) => item.id === productId
        );

        if (!existingItem) return;

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            this.cartItems = this.cartItems.filter(
                (item) => item.id !== productId
            );
        }

        this.saveCart();
    };

    saveCart() {
        localStorage.setItem(
            "cart",
            JSON.stringify(this.cartItems)
        );
    }

    get totalItems() {
        return this.cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }

    get totalPrice() {
        return this.cartItems.reduce(
            (acc, item) =>
                acc + item.price * item.quantity,
            0
        );
    }
}


const cartStore = new CartStore();

export default cartStore;