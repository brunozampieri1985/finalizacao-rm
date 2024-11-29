import { findMaterialBy } from "../material";
import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputCuba = {
  material: string;
};

export function Cuba(input: InputCuba): Product {
  const parts: Part[] = [];

  const { material } = input;

  const stock = findMaterialBy("description", material)[0];

  const part = createPart({
    description: material,
    height: 0,
    width: 0,
    material,
  });

  parts.push(part);

  const { cost, price } = getPricing(parts);
  return {
    description: material,
    material: material,
    height: stock.height!,
    width: stock.width!,
    thickness: stock.thickness!,
    cost,
    parts,
    price,
  };
}
