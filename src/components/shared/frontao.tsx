"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMarmore } from "@/providers/marmore";
import { Frontao, getMaterialOptions } from "@/lib/features/calculo-marmore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FrontaoForm() {
  const { handleAddItem } = useMarmore();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    width: 0,
    height: 0,
    material: "",
  });

  function handleSave() {
    const frontao = Frontao({
      height: data.height,
      width: data.width,
      material: data.material,
    });

    handleAddItem(frontao);
    setData({
      width: 0,
      height: 0,
      material: "",
    });
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((current) => {
      return {
        ...current,
        [name]: parseInt(value),
      };
    });
  }

  const options = getMaterialOptions();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Frontão</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Frontão</DialogTitle>
          <DialogDescription>Adicionar frontão ao projeto.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-8 p-8 w-3/4"
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
                    <SelectItem value={product} key={key}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Largura</label>
            <Input
              onChange={handleChange}
              value={data.width > 0 ? data.width : undefined}
              name="width"
              type="number"
              placeholder="Digite a largura..."
            />
            <div className="text-xs text-slate-300 p-1 m-1 flex">
              Digite a largura...
            </div>
          </div>
          <div>
            <label>Altura</label>
            <Input
              onChange={handleChange}
              value={data.height > 0 ? data.height : undefined}
              name="height"
              type="number"
              placeholder="Digite a altura..."
            />
            <div className="text-xs text-slate-300 p-1 m-1 flex">
              Digite a profundidade da área molhada...
            </div>
          </div>

          <Button type="button" onClick={handleSave}>
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
