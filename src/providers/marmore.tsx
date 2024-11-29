"use client";

import { Product } from "@/lib/features/marmore/product";
import * as React from "react";

type MarmoreContextType = {
  items: Product[];
  handleAddItem: (product: Omit<Product, "id">) => void;
  handleRemoveItem: (id: number) => void;
  handleClearProject: () => void;
  showCost: boolean
  toggleCost: (val: boolean) => void
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
  const [id, setId] = React.useState(1);
  const [showCost, setShowCost] = React.useState(false);


  function toggleCost(val: boolean) {
    setShowCost(val)
  }

  const total = {
    price: items.reduce((acc, curr) => (acc += curr.price), 0),
    cost: items.reduce((acc, curr) => (acc += curr.cost), 0),
  };

  function handleAddItem(product: Omit<Product, "id">) {
    setId((id) => id + 1);
    setItems((curr) => [...curr, { ...product, id }]);
  }

  function handleRemoveItem(idr: number) {
    const filter = items.filter((item) => item.id !== idr);
    setItems(filter);
  }

  function handleClearProject() {
    setItems([]);
    setId(0);
  }

  return (
    <MarmoreContext.Provider
      value={{
        items,
        handleAddItem,
        handleRemoveItem,
        handleClearProject,
        total,
        showCost,
        toggleCost
      }}
    >
      {children}
    </MarmoreContext.Provider>
  );
}

export const useMarmore = () => React.useContext(MarmoreContext);
