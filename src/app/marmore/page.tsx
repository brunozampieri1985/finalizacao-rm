"use client";

import * as React from "react";
import { AreaMolhadaForm } from "@/components/shared/area-molhada";
import ReactDOMServer from "react-dom/server";
import { Separator } from "@/components/ui/separator";
import { useMarmore } from "@/providers/marmore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BancadaForm } from "@/components/shared/bancada";
import { LateralSimplesForm } from "@/components/shared/lateral-simples";
import { LateralDuplaForm } from "@/components/shared/lateral-dupla";
import { FrontaoForm } from "@/components/shared/frontao";
import { RodabaseForm } from "@/components/shared/rodabase";
import { CubaEsculpidaForm } from "@/components/shared/cuba-esculpida";
import { CubaForm } from "@/components/shared/cuba";
import { Total } from "@/components/shared/product-total";
import { ProductList } from "@/components/shared/product-list";

export default function Home() {
  const [nome, setNome] = React.useState("");
  const { items, total, handleClearProject, showCost, toggleCost } =
    useMarmore();

  const handlePrint = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const printContent =
      ReactDOMServer.renderToString(
        <p className="p-8">Nome do Cliente: {nome}</p>
      ) +
      ReactDOMServer.renderToString(
        ProductList({ products: items, showCost, showDeleteButton: false })
      ) +
      ReactDOMServer.renderToString(Total({ showCost, total }));
    html2pdf()
      .set()
      .from(printContent)
      .save(`PLANILHA PEDRA_-_${nome.toLocaleUpperCase()}`);
  };

  return (
    <main className="flex flex-col min-h-full overflow-hidden w-">
      <Separator />
      <h1 className="text-center text-xl lg:text-2xl p-6 lg:p-10">
        Cálculo de Preço - Mármore
      </h1>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full first-line:lg:w-1/2 gap-2 m-4">
          <label>Nome do Cliente</label>
          <Input
            onChange={(e) => setNome(e.target.value.toLocaleUpperCase())}
            value={nome}
            name="width"
            type="text"
            placeholder="Digite o nome completo do cliente..."
          />
        </div>
      </div>
      <ProductList products={items} showDeleteButton showCost={showCost} />
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-slate-100 items-center rounded-md">
        <AreaMolhadaForm />
        <BancadaForm />
        <LateralSimplesForm />
        <LateralDuplaForm />
        <FrontaoForm />
        <RodabaseForm />
        <CubaEsculpidaForm />
        <CubaForm />
      </div>
      <Total showCost={showCost} total={total} />
      {items && items.length > 0 && (
        <div className="flex gap-2 w-full justify-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-cost"
              onCheckedChange={(e) => toggleCost(e as boolean)}
            />
            <label
              htmlFor="show-cost"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mostrar custos
            </label>
          </div>
          {items.length > 0 && (
            <Button variant={"destructive"} onClick={handleClearProject}>
              Limpar
            </Button>
          )}
          <Button variant={"rm"} onClick={handlePrint}>
            Imprimir PDF
          </Button>
        </div>
      )}
    </main>
  );
}
