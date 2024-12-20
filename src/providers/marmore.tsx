"use client";

import Marmore from "@/lib/features/marmore";
import { Material } from "@/lib/features/marmore/material";
import { Product } from "@/lib/features/marmore/product";
import * as React from "react";

type MarmoreContextType = {
  items: Product[];
  handleAddItem: (product: Omit<Product, "id">) => void;
  handleRemoveItem: (id: number) => void;
  handleClearProject: () => void;
  showCost: boolean;
  toggleCost: (val: boolean) => void;
  total: {
    price: number;
    cost: number;
    final: number | undefined;
    discount: number | undefined;
  };
  defineFinalPrice: (val: number) => void;
  getItemById: (id: number) => Product | undefined
  cubas: Material[],
  granitos: Material[]
};

export const MarmoreContext = React.createContext({} as MarmoreContextType);

type MarmoreProviderProps = {
  children: React.ReactNode;
};

export function MarmoreProvider({ children }: MarmoreProviderProps) {
  const [items, setItems] = React.useState<Product[]>([]);
  const [id, setId] = React.useState(1);
  const [showCost, setShowCost] = React.useState(false);
  const [finalPrice, setFinalPrice] = React.useState<number>();

  function toggleCost(val: boolean) {
    setShowCost(val);
  }

  function defineFinalPrice(val: number) {
    setFinalPrice(val);
  }

  const cost = items.reduce((acc, curr) => (acc += curr.cost), 0);
  const price = items.reduce((acc, curr) => (acc += curr.price), 0);
  const discount = finalPrice ? 1 - finalPrice / price : undefined;
  
  const total = {
    price,
    cost,
    final: finalPrice,
    discount,
  };

  const granitos = Marmore.STOCK.filter((item) => item.type === "Pedra");
  const cubas = Marmore.STOCK.filter(
    (item) => item.type === "Cuba" && item.subtype !== "Esculpida"
  );


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
    setFinalPrice(undefined);
    setId(0);
  }

  function getItemById(id: number) {
    return items.find((item) => item.id === id)
  }

  return (
    <MarmoreContext.Provider
      value={{
        items,
        handleAddItem,
        handleRemoveItem,
        handleClearProject,
        total,
        defineFinalPrice,
        showCost,
        toggleCost,
        getItemById,
        cubas,
        granitos
      }}
    >
      {children}
    </MarmoreContext.Provider>
  );
}

export const useMarmore = () => React.useContext(MarmoreContext);
