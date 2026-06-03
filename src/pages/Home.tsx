import { useEffect, useState } from "react";

import { getProducts, getCategories } from "../api/productApi";

import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";

import type { Product, Category } from "../interfaces/Product";
import { useProducts } from "../context/ProductContext";

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
      setSelectedCategories(
        categoryParam.split(",").filter(Boolean)
      );
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
      const response = await getProducts(
        selectedCategories,
        sort
      );

      setLocalProducts(response);

      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUrl = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length) {
      params.set(
        "categories",
        selectedCategories.join(",")
      );
    }

    if (sort) {
      params.set("sort", sort);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState(
      {},
      "",
      newUrl
    );
  };

  const handleCategoryChange = (ids: string[]) => {
    setSelectedCategories(ids);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <main
      style={{
        padding: "20px",
      }}
    >
      <h1>Products</h1>

      <section
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <CategoryFilter
          categories={categories}
          selected={selectedCategories}
          onChange={handleCategoryChange}
        />


        <SortDropdown
          value={sort}
          onChange={handleSortChange}
        />
      </section>

      <ProductGrid products={products} />
    </main>
  );
};

export default Home;