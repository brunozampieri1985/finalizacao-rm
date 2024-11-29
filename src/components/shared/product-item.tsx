"use client";

import { Product } from "@/lib/features/marmore/product";
import { toMoneyString } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { hasBacksplash } from "@/lib/features/marmore/use-cases/frontao";
import { useMarmore } from "@/providers/marmore";

type ProductItemProps = {
  product: Product;
  showCost: boolean;
  showDeleteButton: boolean;
};

export function ProductItem({
  product,
  showCost,
  showDeleteButton,
}: ProductItemProps) {
  const { handleRemoveItem } = useMarmore();
  const [material, ..._] = product.material.split("|");
  const frontao = hasBacksplash(product.parts);
  return (
    <Card key={product.id} className="p-2">
      <div className="flex justify-between text-sm">
        <div>
          {product.id} - {product.description} | {material.trimEnd()} |{" "}
          {product.width} x {product.height}{" "}
          {product.thickness && product.thickness > 0 && (
            <> x {product.thickness}</>
          )}
          mm{" "}
          {frontao && (
            <p>
              Frontão: {frontao?.height} x {frontao?.width}mm.
            </p>
          )}
        </div>
        <span className="flex gap-4 items-end relative">
          {showCost && (
            <span className="text-gray-500 text-sm">
              {toMoneyString(product.cost)} |
            </span>
          )}{" "}
          {toMoneyString(product.price)}
          {showDeleteButton && (
            <Button
              variant={"destructive"}
              className="w-3 h-3 p-2 mt-0 text-[10px] md:text-xs absolute top-[-4px] right-[-4px] md:relative md:w-6 md:h-6"
              onClick={() => handleRemoveItem(product.id!)}
            >
              X
            </Button>
          )}
        </span>
      </div>
    </Card>
  );
}
