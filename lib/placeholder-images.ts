/**
 * Curated stock-photo URLs used as placeholders until real documentary
 * photography is sourced. Each entry was hand-picked from Pexels search
 * results to match the placeholder spot's intent. Pexels licenses photos
 * for free commercial use, no attribution required.
 *
 * Pexels CDN URL pattern:
 *   https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg
 *   ?auto=compress&cs=tinysrgb&w={WIDTH}
 *
 * When real documentary photography is ready, swap the URL on the matching
 * key — every consuming page reads through this map, so the replacement
 * propagates everywhere with a single update.
 */

export type PlaceholderImageKind =
  | "hero-textile-rack"
  | "luxury-garments"
  | "everyday-clothing"
  | "linens"
  | "bedding"
  | "drapery"
  | "uniforms"
  | "plush"
  | "heirloom"
  | "commercial-stack"
  | "manifest-document"
  | "coverage-map"
  | "wash-equipment"
  | "warehouse-storage"
  | "sample-report";

type PlaceholderImageEntry = {
  src: string;
  alt: string;
};

const PEXELS = (id: number | string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const PLACEHOLDER_IMAGES: Record<PlaceholderImageKind, PlaceholderImageEntry> = {
  "hero-textile-rack": {
    src: PEXELS(18730847, 1600),
    alt: "White textiles elegantly displayed on hangers in a boutique",
  },
  "luxury-garments": {
    src: PEXELS(18730846),
    alt: "Linen and lace garments displayed on decorative hangers",
  },
  "everyday-clothing": {
    src: PEXELS(4440572),
    alt: "Neatly folded white crew-neck t-shirt over other shirts",
  },
  linens: {
    src: PEXELS(7691101),
    alt: "Neatly folded clean white towels stacked",
  },
  bedding: {
    src: PEXELS(9462335),
    alt: "Housekeeper making a bed with pristine white linens",
  },
  drapery: {
    src: PEXELS(33839793),
    alt: "Sunlit room with elegant traditional curtains",
  },
  uniforms: {
    src: PEXELS(34442873),
    alt: "Row of safety vests and helmets hanging in an industrial setting",
  },
  plush: {
    src: PEXELS(28917810),
    alt: "Vintage teddy bear resting on a pillow",
  },
  heirloom: {
    src: PEXELS(8266835),
    alt: "Detailed view of a colorful handmade patchwork quilt",
  },
  "commercial-stack": {
    src: PEXELS(4210372),
    alt: "Stack of folded beige towels on a minimalist stool",
  },
  "manifest-document": {
    src: PEXELS(8205064),
    alt: "Person filling out forms on a clipboard",
  },
  "coverage-map": {
    src: PEXELS(4036301, 1600),
    alt: "Aerial view of a suburban Texas road",
  },
  "wash-equipment": {
    src: PEXELS(8774414),
    alt: "Large industrial laundry machines in a service room",
  },
  "warehouse-storage": {
    src: PEXELS(8774448),
    alt: "Industrial washing machine with a cart full of linens",
  },
  "sample-report": {
    src: PEXELS(7651555),
    alt: "Hand holding a company invoice on a clipboard",
  },
};
