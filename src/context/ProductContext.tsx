import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../interfaces/Product";

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<
    React.SetStateAction<Product[]>
  >;
}

const ProductContext =
  createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>(
    []
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
};