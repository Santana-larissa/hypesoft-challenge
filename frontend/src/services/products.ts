import { api } from "./api";
import type { Product, ProductInput } from "types/product";

const toPayload = (input: ProductInput) => ({
  name: input.name,
  description: input.description,
  price: Number(input.price),
  quantity: Number(input.quantity),
  category: { id: Number(input.categoryId) },
});

export async function listProducts() {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function getProduct(id: string | number) {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function createProduct(input: ProductInput) {
  const { data } = await api.post<Product>("/products", toPayload(input));
  return data;
}

export async function updateProduct(id: string | number, input: ProductInput) {
  const { data } = await api.put<Product>(`/products/${id}`, toPayload(input));
  return data;
}

export async function deleteProduct(id: string | number) {
  await api.delete(`/products/${id}`);
  return true;
}
