"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import * as React from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

function Logo() {
  return (
    <div className="flex">
      <Image src="/logo-light.jpg" alt="Logo" width={88} height={24}></Image>
    </div>
  );
}
function MenuIcon(props: { className: string; onClick: () => void }) {
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

export function AppBar() {
  /*  const [loading, setLoading] = React.useState(true);
  const [screen, setScreen] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
      setLoading(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function Mobile() {
    return <div>IS MOBILE</div>;
  } */

  const [open, setOpen] = React.useState(false);
  return (
    <header className="flex w-full h-16 justify-around lg:justify-between items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon onClick={() => setOpen(true)} className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Logo />
          <h2 className="text-xl font-semibold text-blue-700">
            Central de Projetos
          </h2>
          <nav className="grid gap-2 py-6">
            <Button variant={"outline"} onClick={() => setOpen(false)} asChild>
              <Link href="/" prefetch={false}>
                Home
              </Link>
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)} asChild>
              <Link href="/marmore" prefetch={false}>
                Mármores e Granitos
              </Link>
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)} asChild>
              <Link href="/downloads" prefetch={false}>
                Downloads
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex gap-4 items-center">
        <Logo />
        <h2 className="text-2xl font-semibold text-blue-700">
          Central de Projetos
        </h2>
      </div>
      <nav className="gap-4 hidden lg:flex">
        <Button variant={"outline"} asChild>
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/marmore" prefetch={false}>
            Mármores e Granitos
          </Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/downloads" prefetch={false}>
            Downloads
          </Link>
        </Button>
      </nav>
    </header>
  );
}

/* const ComponentToRender = () => (screen > 380 ? <Desktop /> : <Mobile />);

  console.log({ screen });

  if (loading) return <div>Loading.........</div>; */
