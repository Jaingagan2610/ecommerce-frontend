import ProductCard from "./ProductCard";
import type { Product } from "../interfaces/Product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({
  products,
}: ProductGridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;