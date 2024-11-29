import { findMaterialBy, Material } from "./material";
import { OPTIONS } from "./options";
import { roundMoney } from "./pricing";

export type Part = {
  description: string;
  material: Material;
  width: number;
  height: number;
  cost: number;
  price: number;
};

type CreatePartInput = {
  description: string;
  material: string;
  width: number;
  height: number;
};

function getArea(w: number, h: number) {
  return (w / 1000) * (h / 1000);
}

export function createPart(input: CreatePartInput): Part {
  const { width, height, description } = input;
  const material = findMaterialBy("description", input.material)[0];
  if (!material) throw new Error('Not found')
    let cost = material.cost
  if (material.costType === "m2") {
    const area = getArea(width, height);
    cost = roundMoney(material.cost * area);
  }
  const price = roundMoney(cost * OPTIONS.markup);
  return {
    material,
    width,
    height,
    cost,
    price,
    description,
  };
}
