import { findMaterialBy } from "../material";
import { Part, createPart } from "../part";
import { getPricing, roundMoney } from "../pricing";
import { Product } from "../product";


type InputLateralDupla = {
  material: string;
  width: number;
  height: number;
  thickness: number;
};

export function CubaEsculpida(input: InputLateralDupla): Product {
  const parts: Part[] = [];

  const { width, height, material, thickness } = input;

  // Lateral
  const lateral1 = createPart({
    description: "Lateral Cuba",
    height: thickness,
    width: height,
    material,
  });

  parts.push(lateral1);
  parts.push(lateral1);

  const lateral2 = createPart({
    description: "Lateral Cuba",
    height: thickness,
    width,
    material,
  });
  parts.push(lateral2);
  parts.push(lateral2);

  // Fundo

  const fundo = createPart({
    description: "Fundo Cuba",
    height,
    width,
    material,
  });
  parts.push(fundo);

  const esculpida = findMaterialBy("subtype", "Esculpida")[0];

  const { cost, price } = getPricing(parts);
  return {
    description: "Cuba Esculpida",
    material: material,
    thickness,
    height,
    width,
    cost,
    parts,
    price: roundMoney(price + esculpida.cost),
  };
}
