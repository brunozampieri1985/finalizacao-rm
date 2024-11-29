import { Part, createPart } from "../part";
import { getPricing } from "../pricing";
import { Product } from "../product";

type InputAreaMolhada = {
  material: string;
  width: number;
  height: number;
  thickness: number;
  backsplashWidth: number;
  backsplashHeight: number;
};

export function AreaMolhada(input: InputAreaMolhada): Product {
  const parts: Part[] = [];

  const {
    width,
    height,
    material,
    thickness,
    backsplashWidth,
    backsplashHeight,
  } = input;

  // Tampo
  const tampo = createPart({
    description: "Tampo",
    ...input,
  });
  parts.push(tampo);

  // Guarnições
  const lateral = createPart({
    description: "Guarnição Lateral",
    width: 40,
    height,
    material,
  });
  parts.push(lateral);
  parts.push(lateral);

  const horizontal = createPart({
    description: "Guarnição Horizontal",
    height: 40,
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

  if (backsplashHeight > 0 && backsplashWidth > 0) {
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
    description: "Área Molhada",
    material: material,
    height,
    width,
    thickness,
    cost,
    parts,
    price,
  };
}
