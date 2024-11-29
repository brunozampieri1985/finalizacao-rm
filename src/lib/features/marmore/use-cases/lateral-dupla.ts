import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputLateralDupla = {
  material: string;
  width: number;
  height: number;
  thickness: number;
};

export function LateralDupla(input: InputLateralDupla): Product {
  const parts: Part[] = [];

  const { width, height, material, thickness } = input;

  // Lateral
  const lateral1 = createPart({
    description: "Lateral",
    ...input,
  });
  parts.push(lateral1);
  const lateral2 = createPart({
    description: "Lateral",
    ...input,
  });
  parts.push(lateral2);

  // Acabamento
  const acabamentoLateral = createPart({
    description: "Acabamento Lateral",
    height: thickness,
    width: height,
    material,
  });
  parts.push(acabamentoLateral);
  parts.push(acabamentoLateral);

  const { cost, price } = getPricing(parts);
  return {
    description: "Lateral Dupla",
    material: material,
    height,
    width,
    thickness,
    cost,
    parts,
    price,
  };
}
