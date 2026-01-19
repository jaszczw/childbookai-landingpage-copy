import Image from "next/image";
import { motion } from "framer-motion";
import type { Decoration } from "@/lib/types";
import { decorativeElementIn } from "@/lib/utils/animations";

interface DecorativeElementProps {
  decoration: Decoration;
}

export function DecorativeElement({ decoration }: DecorativeElementProps) {
  // Decorative images should have empty alt and aria-hidden
  const isDecorative = !decoration.alt || decoration.alt.trim() === "";
  
  return (
    <motion.div
      className={`${decoration.className} ${decoration.responsive?.hidden || ""} ${decoration.responsive?.visible || ""}`}
      aria-hidden={isDecorative ? "true" : undefined}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={decorativeElementIn}
    >
      <Image
        src={decoration.src}
        alt={isDecorative ? "" : decoration.alt}
        width={decoration.width}
        height={decoration.height}
        className={decoration.sizeClassName}
        style={{ objectFit: "contain" }}
        aria-hidden={isDecorative ? "true" : undefined}
      />
    </motion.div>
  );
}

interface DecorativeElementsProps {
  decorations: Decoration[];
}

export function DecorativeElements({ decorations }: DecorativeElementsProps) {
  return (
    <>
      {decorations.map((decoration) => (
        <DecorativeElement key={decoration.id} decoration={decoration} />
      ))}
    </>
  );
}
