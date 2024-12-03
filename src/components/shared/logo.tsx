import { cn } from "@/lib/utils";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex", className)}>
      <Image src="/logo-light.jpg" alt="Logo" width={88} height={24}></Image>
    </div>
  );
}
