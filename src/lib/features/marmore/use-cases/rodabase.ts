import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputRodabase = {
  material: string;
  width: number;
  height: number;
};

export function Rodabase(input: InputRodabase): Product {
  const parts: Part[] = [];

  const { width, height, material } = input;

  // Rodabase
  const rodabase = createPart({
    description: "Rodabase",
    ...input,
  });
  parts.push(rodabase);

  const { cost, price } = getPricing(parts);
  return {
    description: "Rodabase",
    material: material,
    height,
    width,
    cost,
    parts,
    price,
  };
}
