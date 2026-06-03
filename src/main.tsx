import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);