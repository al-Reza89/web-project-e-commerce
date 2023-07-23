import { Product } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AddProductCart {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  clearProduct: () => void;
}

const addProduct = (
  prevProducts: Product[],
  newProduct: Product
): Product[] => {
  const res = prevProducts.find((product) => product.id == newProduct.id);

  if (res) {
    prevProducts.map((product) => {
      product.stock = product.stock + 1;
    });
  } else {
    prevProducts = [...prevProducts, newProduct];
  }

  return prevProducts;
};

const removeProduct = (
  prevProducts: Product[],
  newProduct: Product
): Product[] => {
  const res = prevProducts.find((product) => product.id == newProduct.id);

  if (res) {
    let stock: boolean = false;

    prevProducts.map((product) => {
      if (product.id === newProduct.id) {
        if (product.stock > 1) {
          product.stock = product.stock - 1;
        } else {
          stock = true;
        }
      }
    });

    if (stock) {
      prevProducts = prevProducts.filter(
        (product) => product.id !== newProduct.id
      );
      stock = false;
    }
  } else {
    prevProducts = [...prevProducts];
  }

  return prevProducts;
};

const deleteProduct = (
  prevProducts: Product[],
  newProduct: Product
): Product[] => {
  prevProducts = prevProducts.filter((product) => product.id !== newProduct.id);

  return prevProducts;
};

const clearProduct = (prevProducts: Product[]): Product[] => {
  return [];
};

const CartProducts = create<AddProductCart>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      ...state,
      products: addProduct(state.products, product),
    })),

  removeProduct: (product) =>
    set((state) => ({
      ...state,
      products: removeProduct(state.products, product),
    })),

  deleteProduct: (product) =>
    set((state) => ({
      ...state,
      products: deleteProduct(state.products, product),
    })),

  clearProduct: () =>
    set((state) => ({
      ...state,
      products: clearProduct(state.products),
    })),
}));

export default CartProducts;
