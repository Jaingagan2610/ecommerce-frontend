import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts, getCategories } from "../api/productApi";

import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";

import type { Product, Category } from "../interfaces/Product";
import { useProducts } from "../context/ProductContext";

const Home = () => {
  const [products, setLocalProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { setProducts } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];

  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchParams]);

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

      // Save globally for Product Detail Page
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (ids: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (ids.length) {
      params.set("categories", ids.join(","));
    } else {
      params.delete("categories");
    }

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    setSearchParams(params);
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Products</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
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
      </div>

      <ProductGrid products={products} />
    </div>
  );
};

export default Home;