import type { Product } from "../interfaces/Product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "24px",
        width: "100%",
      }}
    >
      {products.length === 0 ? (
        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <h3>No products found</h3>
          <p>Try clearing your category filters or select a different sort option.</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      )}
    </div>
  );
};

export default ProductGrid;