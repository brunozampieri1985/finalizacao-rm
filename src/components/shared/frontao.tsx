"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMarmore } from "@/providers/marmore";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import Marmore from "@/lib/features/marmore";
import { toMoneyString } from "@/lib/utils";
import { OPTIONS } from "@/lib/features/marmore/options";

export function FrontaoForm() {
  const initialState = {
    width: 0,
    height: 0,
    thickness: 0,
    backsplashWidth: 0,
    backsplashHeight: 0,
    material: "",
  };
  const { handleAddItem } = useMarmore();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(initialState);

  const options = Marmore.STOCK.filter((item) => item.type === "Pedra");

  function handleSave() {
    if (data.material === "") {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Favor informar o material",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    if (data.height === 0) {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Favor informar a profundidade",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    if (data.width === 0) {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Favor informar a largura",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    if (data.thickness === 0) {
      data.thickness = 40;
    }

    const frontao = Marmore.Frontao({
      height: data.height,
      width: data.width,
      material: data.material,
    });

    handleAddItem(frontao);

    setData(initialState);
    setOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((current) => {
      return {
        ...current,
        [name]: parseInt(value),
      };
    });
  }

  function handleSelectChange(val: string) {
    setData((current) => {
      return {
        ...current,
        material: val,
      };
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Frontão</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Frontão</DialogTitle>
          <DialogDescription>Adicionar Frontão ao projeto.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-8 p-8 w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        >
          <div>
            <label>Material</label>

            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um material" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((product, key) => (
                    <SelectItem value={product.description} key={key}>
                      {product.description} |{" "}
                      {toMoneyString(product.cost * OPTIONS.markup)}/m²
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label>Largura</label>
              <Input
                onChange={handleChange}
                value={data.width > 0 ? data.width : ""}
                name="width"
                type="number"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Altura</label>
              <Input
                onChange={handleChange}
                value={data.height > 0 ? data.height : ""}
                name="height"
                type="number"
              />
            </div>
          </div>
          <div className="flex w-full">
            <Button type="button" onClick={handleSave} className="w-full">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
