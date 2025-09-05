import { api } from "./api";
import type { Category, CategoryInput } from "types/category";

export async function listCategories() {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}

export async function getCategory(id: string | number) {
  const { data } = await api.get<Category>(`/categories/${id}`);
  return data;
}

export async function createCategory(input: CategoryInput) {
  const { data } = await api.post<Category>("/categories", input);
  return data;
}

export async function updateCategory(id: string | number, input: CategoryInput) {
  const { data } = await api.put<Category>(`/categories/${id}`, input);
  return data;
}

export async function deleteCategory(id: string | number) {
  await api.delete(`/categories/${id}`);
  return true;
}
