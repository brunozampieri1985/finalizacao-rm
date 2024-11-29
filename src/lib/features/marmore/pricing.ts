import { Part } from "./part";

export function roundMoney(val: number) {
    return parseFloat(val.toFixed(2))
}

export function getPricing(parts: Part[]) {
  const cost = roundMoney(parts.reduce((acc, curr) => (acc += curr.cost), 0));
  const price = roundMoney(parts.reduce((acc, curr) => (acc += curr.price), 0));
  return {
    cost,
    price,
  };
}
