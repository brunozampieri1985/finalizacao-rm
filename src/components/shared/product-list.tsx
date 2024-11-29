"use client";

import { Product } from "@/lib/features/marmore/product";
import { Card, CardHeader, CardDescription, CardContent } from "../ui/card";
import { ProductItem } from "./product-item";

type ProductListProps = {
  products: Product[];
  showDeleteButton: boolean;
  showCost: boolean

};

export function ProductList({ showDeleteButton, showCost, products }: ProductListProps) {  
  return (
    <Card>
      <CardHeader>
        <CardDescription>Itens no Projeto</CardDescription>
      </CardHeader>
      <CardContent className="gap-2">
        {!products || products.length < 1 ? (
          <p className="text-xs p-0 m-0">Não há itens no projeto.</p>
        ) : (
          <div>
            {products.map((product) => (
              <ProductItem
                product={product}
                showCost={showCost}
                showDeleteButton={showDeleteButton}
                key={product.description}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
