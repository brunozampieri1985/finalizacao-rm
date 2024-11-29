export type Material = {
  id?: string;
  description: string;
  type: string;
  subtype?: string;
  costType: "pc" | "m2";
  cost: number;
  width?: number;
  height?: number;
  thickness?: number;
};

export const MATERIALS: Material[] = [
  {
    id: "8b3e8862-1828-43d8-a253-1f32aebd474e",
    cost: 780,
    costType: "m2",
    description: "Granito Preto São Gabriel",
    type: "Pedra",
  },
  {
    id: "aae2adb9-ee11-4851-acbc-0ff9425830e3",
    cost: 650,
    costType: "m2",
    description: "Granito Verde Ubatuba",
    type: "Pedra",
  },
  {
    id: "0e83e495-8c08-40bd-9341-105e7ac07c9f",
    cost: 590,
    costType: "m2",
    description: "Granito Cinza Andorinha",
    type: "Pedra",
  },
  {
    id: "d0cacce2-625c-4ef1-9cd4-c9c80224406d",
    cost: 590,
    costType: "m2",
    description: "Granito Cinza Corumbá",
    type: "Pedra",
  },
  {
    id: "5579bbe1-2b5d-4c6d-9d48-5a14adc40d42",
    cost: 570,
    costType: "m2",
    description: "Granito Ocre Tabera",
    type: "Pedra",
  },
  {
    id: "161035ae-9813-4d36-b36c-6711b69ae740",
    cost: 680,
    costType: "m2",
    description: "Granito Amarelo Icaraí",
    type: "Pedra",
  },
  {
    id: "cf7b0d14-2866-4908-995c-e1be9728cc29",
    cost: 850,
    costType: "m2",
    description: "Granito Preto Escovado",
    type: "Pedra",
  },
  {
    id: "96dbaf6a-8801-4e5f-905e-cd1dc79128da",
    cost: 900,
    costType: "m2",
    description: "Marmore Branco Prime",
    type: "Pedra",
  },
  {
    id: "96c5658d-7600-4206-98ea-0816ab192772",
    cost: 1750,
    costType: "m2",
    description: "Marmore Branco Estelar",
    type: "Pedra",
  },
  {
    id: "f5ef6ee1-25f2-4999-bdb8-e5ff8b5e4c29",
    cost: 1750,
    costType: "m2",
    description: "Quartzo Branco",
    type: "Pedra",
  },
  {
    id: "f0903baa-df2c-4ede-be75-f09c88214b07",
    cost: 2000,
    costType: "m2",
    description: "Quartzo Branco Calacatta",
    type: "Pedra",
  },
  {
    id: "1fc5a009-f79f-440b-9700-dfb4eac6017a",
    cost: 1091,
    costType: "m2",
    description: "Granito Branco Itaúnas",
    type: "Pedra",
  },
  {
    id: "abc58332-94e2-4365-89f7-46410d825fcd",
    cost: 840,
    costType: "m2",
    description: "Granito Branco Siena",
    type: "Pedra",
  },
  {
    id: "d6927113-d376-42f0-879b-096038942b5d",
    cost: 860,
    costType: "m2",
    description: "Marmore Branco Comum",
    type: "Pedra",
  },
  {
    id: "a13ac5f5-761d-4d38-8c03-850a39f1b5a0",
    cost: 630,
    costType: "m2",
    description: "Marmore Branco Polar",
    type: "Pedra",
  },
  {
    id: "09414f6f-441a-40d6-ab3e-25a0a53f26ec",
    cost: 290,
    costType: "pc",
    description: "Cuba Embutir TECNOCUBA N1",
    type: "Cuba",
    subtype: "Embutir",
    width: 460,
    height: 300,
    thickness: 170,
  },
  {
    id: "26ab9dec-6ea0-49b9-adae-33a63a8549dd",
    cost: 700,
    costType: "pc",
    description: "Cuba Esculpida",
    type: "Cuba",
    subtype: "Esculpida",
  },
];

export function findMaterialBy(by: keyof Material, val: string | number) {
  return MATERIALS.filter((material) => material[by] === val);
}
