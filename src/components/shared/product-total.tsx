"use client"

import { toMoneyString } from "@/lib/utils";
import { Input } from "../ui/input";
import { useMarmore } from "@/providers/marmore";

type TotalProps = {
  showCost: boolean;
  total: {
    price: number;
    cost: number;
    final?: number;
    discount?: number;
  };
};

export function Total({ showCost, total }: TotalProps) {
  const { defineFinalPrice } = useMarmore();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    defineFinalPrice(parseFloat(event.target.value));
  }

  return (
    <div className="flex flex-col items-end">
      <div className="p-4 justify-items-end text-right mt-4 font-semibold">
        Total: {showCost && <>{toMoneyString(total.cost)} |</>}
        {toMoneyString(total.price)}
      </div>
      <div className="flex gap-4">
        <div className="px-4 justify-items-end w-48 text-right font-semibold">
          <label className="text-sm font-[400]">Valor Negociado</label>
          <Input
            onChange={handleChange}
            value={total.final}
            className="text-right"
            name="final"
            type="number"
          />
        </div>
        <div className="px-4 justify-items-end w-48 text-right font-semibold mb-4">
          <label className="text-sm font-light">Desconto</label>
          <div className="flex items-center">
            <Input
              onChange={handleChange}
              className="text-right"
              value={total.discount ? (total.discount * 100).toFixed(2) : 0}
              name="final"
              type="number"
              disabled
            />
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
