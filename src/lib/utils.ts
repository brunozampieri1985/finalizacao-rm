import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundMoney(val: number) {
  return parseFloat(val.toFixed(2));
}

export function getArea(w: number, h: number) {
  return (w / 1000) * (h / 1000);
}

export function toMoneyString(val: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
}

export function toDateCorrectFormat(date: Date) {
  if (!date) return;
  return date.toLocaleDateString().split("/").reverse().join("-");
}
