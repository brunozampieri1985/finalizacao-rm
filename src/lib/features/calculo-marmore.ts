import { Options } from "../options";
import { getArea, roundMoney, toMoneyString } from "../utils";

export type StockType = {
  id: number;
  material: string;
  cost: number;
  price: number;
};

export const PRODUCTS: Omit<StockType, "price">[] = [
  {
    id: 1,
    material: "Granito Preto São Gabriel",
    cost: 690, // cost per square meter
  },
  {
    id: 2,
    material: "Granito Verde Ubatuba",
    cost: 550, // cost per square meter
  },
  {
    id: 3,
    material: "Granito Cinza Andorinha",
    cost: 490, // cost per square meter
  },
  {
    id: 4,
    material: "Granito Cinza Corumbá",
    cost: 490, // cost per square meter
  },
  {
    id: 5,
    material: "Granito Ocre Tabera",
    cost: 470, // cost per square meter
  },
  {
    id: 6,
    material: "Granito Amarelo Icaraí",
    cost: 580, // cost per square meter
  },
  {
    id: 7,
    material: "Granito Preto Escovado",
    cost: 750, // cost per square meter
  },
  {
    id: 8,
    material: "Marmore Branco Prime",
    cost: 800, // cost per square meter
  },
  {
    id: 9,
    material: "Marmore Branco Estelar",
    cost: 1650, // cost per square meter
  },
  {
    id: 10,
    material: "Quartzo Branco",
    cost: 1650, // cost per square meter
  },
  {
    id: 11,
    material: "Quartzo Branco Calacatta",
    cost: 1900, // cost per square meter
  },
  {
    id: 12,
    material: "Granito Branco Itaúnas",
    cost: 991, // cost per square meter
  },
  {
    id: 13,
    material: "Granito Branco Siena",
    cost: 740, // cost per square meter
  },
  {
    id: 14,
    material: "Marmore Branco Comum",
    cost: 760, // cost per square meter
  },
  {
    id: 15,
    material: "Marmore Branco Polar",
    cost: 530, // cost per square meter
  },
];

export function getMaterialOptions() {
  const options = [];
  for (const product of PRODUCTS) {
    options.push(
      `${product.material} | ${toMoneyString(product.cost * Options.Markup)}/m²`
    );
  }
  return options;
}

export const Stock = {
  getByMaterial(input: string) {
    const [material, ..._] = input.split("|");
    console.log(material);
    const stock = PRODUCTS.find(
      (product) => product.material === material.trimEnd()
    );
    if (stock) {
      return {
        ...stock,
        price: stock.cost * Options.Markup,
      };
    }
    return null;
  },
};

type BaseInput = {
  material: string;
  width: number;
  height: number;
};

function getPrice(input: BaseInput) {
  const product = Stock.getByMaterial(input.material);
  if (!product) throw new Error("Produto não encontrado!");
  const area = getArea(input.width, input.height);
  const cost = roundMoney(area * product.cost);
  const price = roundMoney(cost * Options.Markup);
  return { cost, price };
}

type CreatePartInput = BaseInput & { description: string };
export type Part = {
  description: string;
  cost: number;
  price: number;
} & BaseInput;

function createPart({ description, ...rest }: CreatePartInput): Part {
  return {
    description,
    ...rest,
    ...getPrice(rest),
  };
}

type BancadaInput = BaseInput & {
  thickness: number;
  frontao?: number;
  rodabase?: number;
};

export function AreaMolhada(input: BancadaInput) {
  const frontao = input.frontao;
  const rodabase = input.rodabase;
  const parts: Part[] = [];
  const guarnicaoVertical = createPart({
    description: "Guarnição Vertical",
    width: 60 + Options.Thickness,
    height: input.height,
    material: input.material,
  });
  parts.push(guarnicaoVertical);
  parts.push(guarnicaoVertical);
  const guarnicaoHorizontal = createPart({
    description: "Guarnição Horizontal",
    width: input.width + Options.Thickness,
    height: 60 + Options.Thickness,
    material: input.material,
  });
  parts.push(guarnicaoHorizontal);
  parts.push(guarnicaoHorizontal);

  const tampo = createPart({
    description: "Tampo Principal",
    width: input.width + Options.Thickness,
    height: input.height + Options.Thickness,
    material: input.material,
  });
  parts.push(tampo);

  const acabamentoFrontal = createPart({
    description: "Acabamento Frontal",
    width: input.width,
    height: input.thickness + Options.Thickness,
    material: input.material,
  });
  parts.push(acabamentoFrontal);

  const acabamentoLateral = createPart({
    description: "Acabamento Frontal",
    width: input.height + Options.Thickness,
    height: input.thickness + Options.Thickness,
    material: input.material,
  });
  parts.push(acabamentoLateral);
  parts.push(acabamentoLateral);

  if (input.frontao) {
    const frontaoLateral = createPart({
      description: "Frontão Lateral",
      width: input.height + Options.Thickness,
      height: input.frontao,
      material: input.material,
    });

    const frontao = createPart({
      description: "Frontão",
      width: input.width + Options.Thickness,
      height: input.frontao,
      material: input.material,
    });
    parts.push(frontaoLateral);
    parts.push(frontaoLateral);
    parts.push(frontao);
  }
  if (input.rodabase) {
    const rodabase = createPart({
      description: "Rodabase Direita",
      width: input.width + input.height * 2,
      height: input.rodabase,
      material: input.material,
    });

    parts.push(rodabase);
  }

  return {
    description: "Área Molhada",
    width: input.width,
    height: input.height,
    thickness: input.thickness,
    material: input.material,
    parts,
    frontao,
    rodabase,
    cost: parts.reduce((acc, curr) => (acc += curr.cost), 0),
    price: parts.reduce((acc, curr) => (acc += curr.price), 0),
  };
}

export function Frontao(input: BaseInput) {
  const parts: Part[] = [];
  const frontao = createPart({
    description: "Frontao",
    width: input.width + Options.Thickness,
    height: input.height,
    material: input.material,
  });
  parts.push(frontao);
  return {
    description: "Frontao",
    width: input.width,
    height: input.height,
    material: input.material,
    parts,
    cost: parts.reduce((acc, curr) => (acc += curr.cost), 0),
    price: parts.reduce((acc, curr) => (acc += curr.price), 0),
  };
}

export function Rodabase(input: BaseInput) {
  const parts: Part[] = [];
  const rodabase = createPart({
    description: "Rodabase",
    width: input.width + Options.Thickness,
    height: input.height,
    material: input.material,
  });
  parts.push(rodabase);
  return {
    description: "Rodabase",
    width: input.width,
    height: input.height,
    material: input.material,
    parts,
    cost: parts.reduce((acc, curr) => (acc += curr.cost), 0),
    price: parts.reduce((acc, curr) => (acc += curr.price), 0),
  };
}

export function Bancada(input: BancadaInput) {
  const frontao = input.frontao;
  const rodabase = input.rodabase;
  const parts: Part[] = [];

  const tampo = createPart({
    description: "Tampo Principal",
    width: input.width + Options.Thickness,
    height: input.height + Options.Thickness,
    material: input.material,
  });
  parts.push(tampo);

  const acabamentoFrontal = createPart({
    description: "Acabamento Frontal",
    width: input.width,
    height: input.thickness + Options.Thickness,
    material: input.material,
  });
  parts.push(acabamentoFrontal);

  const acabamentoLateral = createPart({
    description: "Acabamento Frontal",
    width: input.height + Options.Thickness,
    height: input.thickness + Options.Thickness,
    material: input.material,
  });
  parts.push(acabamentoLateral);
  parts.push(acabamentoLateral);

  const engrosso = createPart({
    description: "Engrosso Lateral",
    width: input.height,
    height: Options.Engrosso,
    material: input.material,
  });
  const engrosso1 = createPart({
    description: "Engrosso Lateral",
    width: input.width,
    height: Options.Engrosso,
    material: input.material,
  });

  parts.push(engrosso);
  parts.push(engrosso1);
  parts.push(engrosso1);

  if (input.frontao) {
    const frontaoLateral = createPart({
      description: "Frontão Lateral",
      width: input.height + Options.Thickness,
      height: input.frontao,
      material: input.material,
    });

    const frontao = createPart({
      description: "Frontão",
      width: input.width + Options.Thickness,
      height: input.frontao,
      material: input.material,
    });
    parts.push(frontaoLateral);
    parts.push(frontaoLateral);
    parts.push(frontao);
  }
  if (input.rodabase) {
    const rodabaseLateral = createPart({
      description: "Rodabase Esquerda",
      width: input.height + Options.Thickness,
      height: input.rodabase,
      material: input.material,
    });

    const rodabase = createPart({
      description: "Rodabase Direita",
      width: input.width + Options.Thickness,
      height: input.rodabase,
      material: input.material,
    });
    parts.push(rodabaseLateral);
    parts.push(rodabaseLateral);
    parts.push(rodabase);
  }

  return {
    description: "Bancada",
    width: input.width,
    height: input.height,
    thickness: input.thickness,
    material: input.material,
    parts,
    frontao,
    rodabase,
    cost: parts.reduce((acc, curr) => (acc += curr.cost), 0),
    price: parts.reduce((acc, curr) => (acc += curr.price), 0),
  };
}
