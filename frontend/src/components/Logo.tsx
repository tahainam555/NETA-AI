import Link from "next/link";
import Image from "next/image";
import logoImgDark from "@/assets/neta-logo-zoomed.png";
import logoImgLight from "@/assets/neta-logo-light-zoomed.png";

export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={`relative flex items-center group ${className}`} aria-label="NETA AI home">
      {/* Dark logo — always rendered, fades out when navbar is light */}
      <Image
        src={logoImgDark}
        alt="NETA AI Logo"
        width={300}
        height={80}
        className={`h-11 w-auto object-contain transition-all duration-500 group-hover:scale-105 mix-blend-screen ${dark ? "opacity-100" : "opacity-0 absolute"}`}
        priority
      />
      {/* Light logo — always rendered, fades out when navbar is dark */}
      <Image
        src={logoImgLight}
        alt="NETA AI Logo"
        width={300}
        height={80}
        className={`h-11 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${dark ? "opacity-0 absolute" : "opacity-100"}`}
        priority
      />
    </Link>
  );
}
