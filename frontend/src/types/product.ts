import type { Category } from "types/category";

export type Product = {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: Pick<Category, "id" | "name">;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: number;
};
