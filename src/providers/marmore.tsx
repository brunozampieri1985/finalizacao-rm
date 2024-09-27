"use client";


import { Part } from "@/lib/features/calculo-marmore";
import * as React from "react";

type Product = {
  id?: number;
  description: string;
  width: number;
  height: number;
  thickness?: number;
  material: string;
  parts: Part[];
  cost: number;
  price: number;
  frontao?: number;
  rodabase?: number;
};

type MarmoreContextType = {
  items: Product[];
  handleAddItem: (product: Omit<Product, "id">) => void;
  handleRemoveItem: (id: number) => void;
  total: {
    price: number;
    cost: number;
  };
};

export const MarmoreContext = React.createContext({} as MarmoreContextType);

type MarmoreProviderProps = {
  children: React.ReactNode;
};

export function MarmoreProvider({ children }: MarmoreProviderProps) {
  const [items, setItems] = React.useState<Product[]>([]);

  const total = {
    price: items.reduce((acc, curr) => (acc += curr.price), 0),
    cost: items.reduce((acc, curr) => (acc += curr.cost), 0),
  };

  function handleAddItem(product: Omit<Product, "id">) {
    setItems((curr) => [...curr, { ...product, id: curr.length + 1 }]);
  }

  function handleRemoveItem(id: number) {
    const filter = items.filter((item) => item.id !== id);
    setItems(filter);
  }

  return (
    <MarmoreContext.Provider
      value={{ items, handleAddItem, handleRemoveItem, total }}
    >
      {children}
    </MarmoreContext.Provider>
  );
}

export const useMarmore = () => React.useContext(MarmoreContext);
