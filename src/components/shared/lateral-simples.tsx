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
import { getMaterialOptions, LateralSimples } from "@/lib/features/calculo-marmore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function LateralSimplesForm() {
  const { handleAddItem } = useMarmore();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    width: 0,
    height: 0,
    thickness: 0,
    material: "",
  });

  function handleSave() {
    const frontao = LateralSimples({
      height: data.height,
      width: data.width,
      material: data.material,
      thickness: data.thickness
    });

    handleAddItem(frontao);
    setData({
      width: 0,
      height: 0,
      material: "",
      thickness: 0
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
        <Button onClick={() => setOpen(true)}>+ Lateral Simples</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lateral Simples</DialogTitle>
          <DialogDescription>Adicionar lateral simples ao projeto.</DialogDescription>
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
              Digite a altura da lateral...
            </div>
          </div>
          <div>
            <label>Saia</label>
            <Input
              onChange={handleChange}
              value={data.thickness > 0 ? data.thickness : undefined}
              name="thickness"
              type="number"
              placeholder="Digite a saia..."
            />
            <div className="text-xs text-slate-300 p-1 m-1 flex">
              Digite a altura da lateral...
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
