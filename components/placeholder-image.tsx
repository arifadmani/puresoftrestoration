import Image from "next/image";
import {
  PLACEHOLDER_IMAGES,
  type PlaceholderImageKind,
} from "@/lib/placeholder-images";

/**
 * Renders a curated stock photo as a placeholder. Wraps next/image with
 * the bottom-left caption + oxblood accent line treatment from the
 * original .ph hatched placeholder, so the structural layout stays
 * identical and only the visual fill changes.
 *
 * Parent container is responsible for sizing — this component is
 * `position: absolute, inset: 0` style and fills whatever box it's in.
 *
 * Pass `priority` on above-the-fold instances (hero image) so Next.js
 * preloads them.
 */
export function PlaceholderImage({
  kind,
  caption,
  priority = false,
  sizes = "(max-width: 1080px) 100vw, 50vw",
  className,
  style,
}: {
  kind: PlaceholderImageKind;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const img = PLACEHOLDER_IMAGES[kind];

  return (
    <div
      className={`ph-img ${className ?? ""}`.trim()}
      style={style}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
      {caption ? (
        <>
          <span className="ph-img__accent" aria-hidden />
          <span className="ph-img__caption">{caption}</span>
        </>
      ) : null}
    </div>
  );
}
