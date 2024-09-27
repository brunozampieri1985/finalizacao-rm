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

export default function Home() {
  const [nome, setNome] = React.useState("");
  const { items, total, handleRemoveItem } = useMarmore();

  const SHOW_COST = false;

  function Total() {
    return (
      <div className="w-full justify-items-end text-right my-4 font-semibold">
        Total: {SHOW_COST && <>{toMoneyString(total.cost)}|</>}{" "}
        {toMoneyString(total.price)}
      </div>
    );
  }

  function Items() {
    return (
      <Card>
        <CardHeader>
          <CardDescription>Itens no Projeto</CardDescription>
        </CardHeader>
        <CardContent>
          {!items || items.length < 1 ? (
            <p>Não há itens no projeto.</p>
          ) : (
            <div>
              {items.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="flex justify-between">
                      <div>
                        {item.id} - {item.description} - {item.material} -{" "}
                        {item.width} x {item.height}{" "}
                        {item.thickness && item.thickness > 0 && (
                          <> x {item.thickness}</>
                        )}
                        mm{" "}
                        <div className="text-xs">
                          {item.frontao && (
                            <>
                              <br />
                              <span>Altura Frontão: {item.frontao}mm</span>
                            </>
                          )}
                          {item.frontao && item.rodabase ? <> - </> : null}
                          {item.rodabase && (
                            <span>Altura Rodabase: {item.rodabase}mm</span>
                          )}
                        </div>
                      </div>
                      <span className="flex gap-4 items-center">
                        {SHOW_COST && <>{toMoneyString(item.cost)}|</>}{" "}
                        {toMoneyString(item.price)}
                        <Button
                          variant={"destructive"}
                          size={"sm"}
                          onClick={() => handleRemoveItem(item.id!)}
                        >
                          X
                        </Button>
                      </span>
                    </div>
                    <Separator className="my-4" />
                  </div>
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
      ReactDOMServer.renderToString(<p className="p-8">Nome do Cliente: {nome}</p>) +
      ReactDOMServer.renderToString(Items()) +
      ReactDOMServer.renderToString(Total()) 
    html2pdf().set().from(printContent).save("planilha_marmore.pdf");
  };

  return (
    <main className="flex flex-col min-h-full overflow-hidden w-">
      <Separator />
      <h1 className="text-center text-2xl p-10">Cálculo de Preço - Mármore</h1>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-1/2 gap-2 m-4">
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
      <Items />
      <div className="flex gap-4 p-4 bg-slate-100 items-center h-20 rounded-md">
        <AreaMolhadaForm />
        <BancadaForm />
        <FrontaoForm />
        <RodabaseForm />
      </div>
      <Total />
      {items && items.length > 0 && (
        <div className="w-full justify-items-end text-right my-4 font-semibold">
          <Button onClick={handlePrint}>Imprimir PDF</Button>
        </div>
      )}
    </main>
  );
}
