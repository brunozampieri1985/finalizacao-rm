import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputFrontao = {
  material: string;
  width: number;
  height: number;
};

export function hasBacksplash(parts: Part[]) {
  return parts.find((part) => part.description === "Frontao");
}

export function Frontao(input: InputFrontao): Product {
  const parts: Part[] = [];

  const { width, height, material } = input;

  // Frontao
  const frontao = createPart({
    description: "Frontão",
    ...input,
  });
  parts.push(frontao);

  const { cost, price } = getPricing(parts);
  return {
    description: "Frontão",
    material: material,
    height,
    width,
    cost,
    parts,
    price,
  };
}
