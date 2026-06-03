import type { Product } from "../interfaces/Product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = ({
  products,
}: Props) => {

  const isMobile =
    window.innerWidth < 768;

  const isTablet =
    window.innerWidth >= 768 &&
    window.innerWidth < 1024;

  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2,1fr)"
              : "repeat(4,1fr)",

        gap: "20px",
      }}
    >
      {products.map(
        (product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        )
      )}
    </div>
  );
};

export default ProductGrid;