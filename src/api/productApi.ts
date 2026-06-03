import axios from "axios";
import type { Product, Category } from "../interfaces/Product";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getProducts = async (
  categoryIds: string[],
  sort: string
): Promise<Product[]> => {
  let products: Product[] = [];

  if (categoryIds.length === 0) {
    const response = await axios.get<Product[]>(
      `${BASE_URL}/products?offset=0&limit=50`
    );

    products = response.data;
  } else {
    const requests = categoryIds.map((id) =>
      axios.get<Product[]>(`${BASE_URL}/categories/${id}/products`)
    );

    const responses = await Promise.all(requests);

    products = responses.flatMap((r) => r.data);
  }

  switch (sort) {
    case "priceAsc":
      products.sort((a, b) => a.price - b.price);
      break;

    case "priceDesc":
      products.sort((a, b) => b.price - a.price);
      break;

    case "nameAsc":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;

    default:
      break;
  }

  return products;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(
    `${BASE_URL}/categories`
  );

  return response.data;
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await axios.get<Product>(
    `${BASE_URL}/products/${id}`
  );

  return response.data;
};