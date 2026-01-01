import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "../lib/data";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  vendorId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt" | "isActive" | "rating">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getActiveProducts: () => Product[];
  getProductsByVendor: (vendorId: string) => Product[];
  getProductById: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts.map((product) => ({
        ...product,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        vendorId: "3", // Default to existing vendor user id (Mike Wilson)
      })),
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `product-${Date.now()}`,
          isActive: true,
          rating: 4.5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({ products: [...get().products, newProduct] });
      },
      updateProduct: (id, updates) => {
        set({
          products: get().products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date().toISOString() }
              : product
          ),
        });
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((product) => product.id !== id) });
      },
      getActiveProducts: () => {
        return get().products.filter((product) => product.isActive);
      },
      getProductsByVendor: (vendorId) => {
        return get().products.filter(
          (product) => product.vendorId === vendorId && product.isActive
        );
      },
      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },
    }),
    {
      name: "product-storage",
    }
  )
);
