import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../api/productApi";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import type { Product, Category } from "../interfaces/Product";
import { useProducts } from "../context/ProductContext";
import { FiSliders } from "react-icons/fi";

const Home = () => {
  const [products, setLocalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const { setProducts } = useProducts();

  // Read URL when page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("categories");
    const sortParam = params.get("sort");

    if (categoryParam) {
      setSelectedCategories(categoryParam.split(",").filter(Boolean));
    }
    if (sortParam) {
      setSort(sortParam);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    updateUrl();
    loadProducts();
  }, [selectedCategories, sort]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts(selectedCategories, sort);
      setLocalProducts(response);
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUrl = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length) {
      params.set("categories", selectedCategories.join(","));
    }
    if (sort) {
      params.set("sort", sort);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const handleCategoryChange = (ids: string[]) => {
    setSelectedCategories(ids);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <main style={{ paddingBottom: "4rem" }}>
      {/* Hero Banner Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)",
          color: "#ffffff",
          padding: "3.5rem 1.5rem",
          textAlign: "center",
          marginBottom: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative background shapes */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            right: "-30px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "2.75rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
          >
            ClickCart Premium Collection
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto",
              fontWeight: 500,
            }}
          >
            Discover exquisite items curated for modern lifestyles. Filter by category, sort by price, and elevate your aesthetics today.
          </p>
        </div>
      </section>

      {/* Main Shop Container */}
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2.5rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left Sidebar Filter Section */}
          <aside
            style={{
              flex: "1 1 260px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              position: "sticky",
              top: "90px",
            }}
          >
            {/* Sorting controls widget */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                  marginBottom: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FiSliders size={16} /> Sort Products
              </h3>
              <SortDropdown value={sort} onChange={handleSortChange} />
            </div>

            {/* Category selection filters widget */}
            <CategoryFilter
              categories={categories}
              selected={selectedCategories}
              onChange={handleCategoryChange}
            />
          </aside>

          {/* Right Product Grid Area */}
          <section style={{ flex: "9 9 600px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontWeight: 650, color: "var(--text-dark)", fontSize: "1.1rem" }}>
                Showing {products.length} {products.length === 1 ? "Product" : "Products"}
              </span>
            </div>
            <ProductGrid products={products} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;