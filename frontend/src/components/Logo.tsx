import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/neta-logo-zoomed.png";

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={`flex items-center group ${className}`} aria-label="NETA AI home">
      <Image 
        src={logoImg} 
        alt="NETA AI Logo" 
        width={300} 
        height={80} 
        className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-screen"
        priority
      />
    </Link>
  );
}
