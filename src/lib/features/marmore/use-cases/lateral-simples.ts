import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputLateralSimples = {
  material: string;
  width: number;
  height: number;
  thickness: number;
};

export function LateralSimples(input: InputLateralSimples): Product {
  const parts: Part[] = [];

  const { width, height, material, thickness } = input;

  // Tampo
  const tampo = createPart({
    description: "Tampo",
    ...input,
  });
  parts.push(tampo);

  // Engrossos
  const lateral = createPart({
    description: "Engrosso Lateral",
    width: 60,
    height,
    material,
  });
  parts.push(lateral);
  parts.push(lateral);

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
    description: "Lateral Simples",
    material: material,
    height,
    width,
    thickness,
    cost,
    parts,
    price,
  };
}
