import { Part } from "./part";

export type Product = {
  id?: number;
  description: string;
  material: string;
  cost: number;
  price: number;
  width: number;
  height: number;
  thickness?: number
  parts: Part[];
};
