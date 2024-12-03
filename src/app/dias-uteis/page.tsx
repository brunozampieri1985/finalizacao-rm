"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import WorkDays from "@/lib/features/dias-uteis";
import { toDateCorrectFormat } from "@/lib/utils";

export default function DiasUteisPage() {
  const { getEndDate } = WorkDays;
  const [startDate, setStartDate] = React.useState<Date>(new Date(Date.now()));
  const [endDate, setEndDate] = React.useState<Date>();
  const [days, setDays] = React.useState<number>();

  function handleChangeDays(event: React.ChangeEvent<HTMLInputElement>) {
    setDays(parseInt(event.target.value));
    if (startDate && days) {
      setEndDate(
        getEndDate({
          days: parseInt(event.target.value),
          startDate,
        })
      );
    }
  }

  function handleChangeDataInicial(event: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(new Date(event.target.value));
  }

  return (
    <main className="flex flex-col min-h-full items-center overflow-hidden w-full p-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold text-center tracking-tight transition-colors first:mt-0">
        Calculadora Dias Úteis
      </h2>
      <Separator />
      <div className="flex flex-col md:w-1/4">
        <div className="flex flex-col first-line: lg:w-1/2 gap-2 my-4">
          <label>Data Inicial</label>
          <Input
            onChange={handleChangeDataInicial}
            value={toDateCorrectFormat(startDate)}
            name="startDate"
            type="date"
          />
        </div>
        <div className="flex flex-col first-line: lg:w-1/2 gap-2 my-4">
          <label>Dias úteis</label>
          <Input
            onChange={handleChangeDays}
            value={days}
            name="workDays"
            type="number"
          />
        </div>
        <div className="flex flex-col first-line: lg:w-1/2 gap-2 my-4">
          <label>Data Final</label>
          <Input
            value={toDateCorrectFormat(endDate!)}
            name="startDate"
            type="date"
            disabled
          />
        </div>
      </div>
    </main>
  );
}
