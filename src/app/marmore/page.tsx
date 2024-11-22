"use client";

import * as React from "react";
import { AreaMolhadaForm } from "@/components/shared/area-molhada";
import ReactDOMServer from "react-dom/server";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { RodabaseForm } from "@/components/shared/rodabase";
import { useMarmore } from "@/providers/marmore";
import { FrontaoForm } from "@/components/shared/frontao";
import { Button } from "@/components/ui/button";
import { BancadaForm } from "@/components/shared/bancada";
import { toMoneyString } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LateralSimplesForm } from "@/components/shared/lateral-simples";
import { LateralDuplaForm } from "@/components/shared/lateral-dupla";

export default function Home() {
  const [nome, setNome] = React.useState("");
  const [showCost, setShowCost] = React.useState(false);
  const { items, total, handleRemoveItem, handleClearProject } = useMarmore();

  function Total() {
    return (
      <div className="p-4 file:w-full justify-items-end text-right my-4 font-semibold">
        Total: {showCost && <>{toMoneyString(total.cost)}|</>}{" "}
        {toMoneyString(total.price)}
      </div>
    );
  }

  function Items({ showDeleteButton }: { showDeleteButton: boolean }) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Itens no Projeto</CardDescription>
        </CardHeader>
        <CardContent className="gap-2">
          {!items || items.length < 1 ? (
            <p className="text-xs p-0 m-0">Não há itens no projeto.</p>
          ) : (
            <div>
              {items.map((item) => {
                const [material, ..._] = item.material.split("|");
                return (
                  <Card key={item.id} className="p-2">
                    <div className="flex justify-between text-sm">
                      <div>
                        {item.id} - {item.description} | {material.trimEnd()} |{" "}
                        {item.width} x {item.height}{" "}
                        {item.thickness && item.thickness > 0 && (
                          <> x {item.thickness}</>
                        )}
                        mm{" "}
                        <div className="text-xs">
                          {item.frontao && (
                            <>
                              <span>Altura Frontão: {item.frontao}mm</span>
                            </>
                          )}
                          {item.frontao && item.rodabase ? <> - </> : ""}
                          {item.rodabase && (
                            <span>Altura Rodabase: {item.rodabase}mm</span>
                          )}
                        </div>
                      </div>
                      <span className="flex gap-4 items-center relative">
                        {showCost && <>{toMoneyString(item.cost)}|</>}{" "}
                        {toMoneyString(item.price)}
                        {showDeleteButton && (
                          <Button
                            variant={"destructive"}
                            className="w-4 h-4 text-xs absolute top-0 right-0 md:relative md:w-6 md:h-6"
                            onClick={() => handleRemoveItem(item.id!)}
                          >
                            X
                          </Button>
                        )}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const handlePrint = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const printContent =
      ReactDOMServer.renderToString(
        <p className="p-8">Nome do Cliente: {nome}</p>
      ) +
      ReactDOMServer.renderToString(Items({ showDeleteButton: false })) +
      ReactDOMServer.renderToString(Total());
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
      <Items showDeleteButton />
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-slate-100 items-center rounded-md">
        <AreaMolhadaForm />
        <BancadaForm />
        <FrontaoForm />
        <RodabaseForm />
        <LateralSimplesForm />
        <LateralDuplaForm />
        {items.length > 0 && (
          <Button variant={"destructive"} onClick={handleClearProject}>
            Limpar
          </Button>
        )}
      </div>
      <Total />
      {items && items.length > 0 && (
        <div className="w-full items-end text-right my-4 font-semibold">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-cost"
              onCheckedChange={(e) => setShowCost(e as boolean)}
            />
            <label
              htmlFor="show-cost"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mostrar custos
            </label>
          </div>
          <Button variant={"rm"} onClick={handlePrint}>
            Imprimir PDF
          </Button>
        </div>
      )}
    </main>
  );
}
