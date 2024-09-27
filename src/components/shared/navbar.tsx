import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <Logo />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="grid gap-2 py-6">
            <Link
              href="/marmore"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Mármore
            </Link>
            <Link
              href="/downloads"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Downloads
            </Link>
            <Link
              href="/docs"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              Documentos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Logo />
      </Link>
      <h2 className="text-2xl text-blue-600 font-bold">Central de Projetos</h2>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Button variant="outline" asChild>
          <Link href="/marmore" prefetch={false}>
            Mármore
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/downloads" prefetch={false}>
            Downloads
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs" prefetch={false}>
            Documentos
          </Link>
        </Button>
      </nav>
    </header>
  );
}

function MenuIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex">
      <Image src="/logo-light.jpg" alt="Logo" width={88} height={24}></Image>
    </div>
  );
}
