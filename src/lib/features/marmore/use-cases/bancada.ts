import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";


type InputBancada = {
  material: string;
  width: number;
  height: number;
  thickness: number;
  backsplashWidth: number
  backsplashHeight: number
};

export function Bancada(input: InputBancada): Product {
  const parts: Part[] = [];

  const { width, height, material, thickness, backsplashHeight, backsplashWidth } = input;

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

  const horizontal = createPart({
    description: "Engrosso Horizontal",
    height: 60,
    width,
    material,
  });

  parts.push(horizontal);

  // Acabamento
  const acabamentoLateral = createPart({
    description: "Acabamento Lateral",
    height: thickness,
    width: height,
    material,
  });
  parts.push(acabamentoLateral);
  parts.push(acabamentoLateral);

  const acabamentoFrontal = createPart({
    description: "Acabamento Frontal",
    height: thickness,
    width,
    material,
  });
  parts.push(acabamentoFrontal);


  // Frontao

  if (backsplashWidth > 0 && backsplashHeight > 0) {
    const frontao = createPart({
      description: "Frontao",
      width: backsplashWidth,
      height: backsplashHeight,
      material,
    });
    parts.push(frontao);
  }

  const { cost, price } = getPricing(parts);

  return {
    description: "Bancada",
    material: material,
    height,
    width,
    thickness,
    cost,
    parts,
    price,
  };
}
