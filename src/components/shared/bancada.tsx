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
import { Bancada, getMaterialOptions } from "@/lib/features/calculo-marmore";

export function BancadaForm() {
  const { handleAddItem } = useMarmore();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    width: 0,
    height: 0,
    thickness: 0,
    frontao: 0,
    material: "",
  });

  const options = getMaterialOptions();

  function handleSave() {
    const bancada = Bancada({
      height: data.height,
      width: data.width,
      thickness: data.thickness,
      material: data.material,
      frontao: data.frontao,
    });

    handleAddItem(bancada);

    setData({
      width: 0,
      height: 0,
      thickness: 0,
      frontao: 0,
      material: "",
    });
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
        <Button onClick={() => setOpen(true)}>+ Bancada</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bancada</DialogTitle>
          <DialogDescription>Adicionar Bancada ao projeto.</DialogDescription>
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
                    <SelectItem value={product} key={key}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex">
            <div>
              <label>Largura</label>
              <Input
                onChange={handleChange}
                value={data.width > 0 ? data.width : undefined}
                name="width"
                type="number"
                placeholder="Digite a largura..."
              />
            </div>
            <div>
              <label>Profundidade</label>
              <Input
                onChange={handleChange}
                value={data.height > 0 ? data.height : undefined}
                name="height"
                type="number"
                placeholder="Digite a profundidade..."
              />
            </div>
          </div>
          <div className="flex">
            <div>
              <label>Saia (Espessura)</label>
              <Input
                onChange={handleChange}
                value={data.thickness > 0 ? data.thickness : undefined}
                name="thickness"
                type="number"
                placeholder="Digite a altura da saia..."
              />
            </div>

            <div>
              <label>Frontão</label>
              <Input
                onChange={handleChange}
                value={data.frontao > 0 ? data.frontao : undefined}
                name="frontao"
                type="number"
                placeholder="Digite a altura do frontão..."
              />
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
