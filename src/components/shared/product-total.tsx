import { toMoneyString } from "@/lib/utils";

type TotalProps = {
  showCost: boolean;
  total: {
    price: number;
    cost: number;
  };
};

export function Total({ showCost, total }: TotalProps) {
  return (
    <div className="p-4 file:w-full justify-items-end text-right my-4 font-semibold">
      Total: {showCost && <>{toMoneyString(total.cost)} |</>}
      {toMoneyString(total.price)}
    </div>
  );
}
