"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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

export function CubaForm() {
  const initialState = {
    material: "",
  };
  const { handleAddItem } = useMarmore();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(initialState);

  const options = Marmore.STOCK.filter(
    (item) => item.type === "Cuba" && item.subtype !== "Esculpida"
  );

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

    const cuba = Marmore.Cuba({
      material: data.material,
    });

    handleAddItem(cuba);

    setData(initialState);
    setOpen(false);
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
        <Button onClick={() => setOpen(true)}>+ Cuba</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cuba</DialogTitle>
          <DialogDescription>Adicionar Cuba ao projeto.</DialogDescription>
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
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma cuba" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((product, key) => (
                    <SelectItem value={product.description} key={key}>
                      {product.description} |{" "}
                      {toMoneyString(product.cost * OPTIONS.markup)}/peça
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
