"use client";

import * as React from "react";
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
import { toMoneyString } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [nome, setNome] = React.useState("");
  const { items, total, handleClearProject, showCost, toggleCost } =
    useMarmore();

  const TotalPDF = () => (
    <div className="flex flex-col gap-2 text-right p-4">
      <p>Total: {toMoneyString(total.price)}</p>
      {total.discount && total.discount > 0 && (
        <p>Desconto: {(total.discount * 100).toFixed(2)} %</p>
      )}
      <p>Total Final: {toMoneyString(total.final || total.price)}</p>
    </div>
  );

  const handlePrint = async () => {
    if (!nome || nome === "") {
      toast({
        title: "Atenção!",
        description: "Digite o nome do cliente para imprimir.",
        variant: "destructive",
        duration: 2000
      });
      return
    }
    const html2pdf = (await import("html2pdf.js")).default;
    const printLogo = ReactDOMServer.renderToString(Logo({ className: "p-8" }));
    const printClientName = ReactDOMServer.renderToString(
      <p className="p-8">Nome do Cliente: {nome}</p>
    );
    const printProductList = ReactDOMServer.renderToString(
      ProductList({
        products: items,
        showCost,
        showDeleteButton: false,
      })
    );
    const printTotal = ReactDOMServer.renderToString(TotalPDF());
    const printContent =
      printLogo + printClientName + printProductList + printTotal;

    html2pdf()
      .set()
      .from(printContent)
      .save(`PLANILHA PEDRA_-_${nome.toLocaleUpperCase()}`);
  };

  return (
    <main className="flex flex-col min-h-full overflow-hidden w-full p-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold text-center tracking-tight transition-colors first:mt-0">
        Mármores e Granitos
      </h2>
      <Separator />
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full first-line:lg:w-1/2 gap-2 my-4">
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
        <BancadaForm />
        <LateralSimplesForm />
        <LateralDuplaForm />
        <FrontaoForm />
        <RodabaseForm />
        <CubaEsculpidaForm />
        <CubaForm />
      </div>
      <Separator className="mt-4" />
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

          <Button variant={"destructive"} onClick={handleClearProject}>
            Limpar
          </Button>

          <Button variant={"rm"} onClick={handlePrint}>
            Imprimir PDF
          </Button>
        </div>
      )}
    </main>
  );
}
