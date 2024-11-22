import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type DownloadItemProps = {
  src: string;
  title: string;
  description: string;
};

const DOWNLOADABLE_ITEMS: DownloadItemProps[] = [
  {
    src: "/PADRAO_PROTOTIPO.promob",
    title: "Protótipo PDF",
    description: "Protótipo para geração de PDF's",
  },
  {
    src: "/EDITAVEIS.promob",
    title: "EDITAVEIS PROMOB",
    description: "Módulos editáveis mais comuns já pronto pra ajuste e uso.",
  },
  {
    src: "/Conferencia.xlsx",
    title: "PLANILHA DE CONFERÊNCIA DE VALORES",
    description: "Módulos editáveis mais comuns já pronto pra ajuste e uso.",
  },
  {
    src: "/RM ITALINEA - REGRAS E PADROES DE FINALIZACAO.pdf",
    title: "RM ITALINEA - REGRAS E PADROES DE FINALIZACAO",
    description: "Padrões e regras de projeto e montagem.",
  },
  {
    src: "/CATTEC-ITALINEA-2023.pdf",
    title: "GUIA DE MONTAGEM - ITALÍNEA 2023",
    description: "Guia técnico específico para montagem e finalização.",
  },
];

function DownloadItem({ src, title, description }: DownloadItemProps) {
  return (
    <Card className="gap-2 flex flex-col p-4 w-[400px] h-[200px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex">
        <Button variant={"rm"} asChild>
          <Link href={src} prefetch={false}>
            <DownloadIcon />
            &nbsp;Baixar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function DownloadItemsList() {
  return (
    <div className="flex flex-col md:flex-row md: flex-wrap gap-4 justify-center">
      {DOWNLOADABLE_ITEMS.map((item, key) => (
        <div key={key}>
          <DownloadItem
            src={item.src}
            description={item.description}
            title={item.title}
          />
        </div>
      ))}
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <main className="flex flex-col min-h-full overflow-hidden">
      <Separator />
      <h1 className="text-center text-xl lg:text-2xl p-6 lg:p-10">Downloads</h1>
      <div className="flex w-full justify-center">
        <DownloadItemsList />
      </div>
    </main>
  );
}
