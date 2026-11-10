import bunkBedImg from '../assets/images/hero_bunk_bed_1793892668497.jpg';
import steelLockerImg from '../assets/images/product_steel_locker_1793892669123.jpg';
import woodenWardrobeImg from '../assets/images/product_wooden_wardrobe_1793892669319.jpg';
import bedroomHomeImg from '../assets/images/showcase_bedroom_home_1793892669741.jpg';
import officeWorkspaceImg from '../assets/images/showcase_office_workspace_1793892669832.jpg';

export type ProductCategory =
  | 'bunk-beds'
  | 'steel-lockers'
  | 'mattress'
  | 'office-tables'
  | 'office-workstation'
  | 'office-furniture'
  | 'wardrobe'
  | 'beds'
  | 'king-beds'
  | 'queen-beds'
  | 'double-beds'
  | 'single-beds';

export interface ProductItem {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  fallbackImage: string;
  alt: string;
  specs: string[];
  tag?: string;
  price?: string;
  originalPrice?: string;
  minOrder?: string;
  inStock?: boolean;
}

export const SITE_IMAGES = {
  heroBunkBeds: '/assets/aistudio/image_49ef6ff0.png',
  heroBunkBedsFallback: bunkBedImg,
  catBunkBed: 'https://nadfurniture.net/wp-content/uploads/2026/07/bunk-bed.webp',
  catBunkBedFallback: bunkBedImg,
  catWardrobe: 'https://nadfurniture.net/wp-content/uploads/2026/07/two-door-wardrobe.webp',
  catWardrobeFallback: woodenWardrobeImg,
  catLockers: 'https://nadfurniture.net/wp-content/uploads/2026/07/1.png',
  catLockersFallback: steelLockerImg,
  parallaxBg: 'https://nadfurniture.net/wp-content/uploads/2026/07/steel-furniture.webp',
  parallaxBgFallback: bunkBedImg,
  bestSellerThumb: 'https://nadfurniture.net/wp-content/uploads/2026/07/bunk-bed.webp',
  newArrivalsThumb: 'https://nadfurniture.net/wp-content/uploads/2026/07/2-2.webp',
  onSaleThumb: 'https://nadfurniture.net/wp-content/uploads/2026/08/3-4.webp',
  kingBed2: 'https://nadfurniture.net/wp-content/uploads/2026/07/king-size-bed-2-1024x778.webp',
  kingBed1: 'https://nadfurniture.net/wp-content/uploads/2026/07/king-size-bed-1-1024x665.webp',
  bedroomFallback: bedroomHomeImg,
  homeFurniture: 'https://nadfurniture.net/wp-content/uploads/2026/07/home-furniture.jpg',
  officeFurniture: 'https://nadfurniture.net/wp-content/uploads/2026/07/office-furniture.jpg',
  officeFallback: officeWorkspaceImg,
  whatsappIcon: 'https://nadfurniture.net/wp-content/uploads/2026/08/whatsapp-icon.png',
  subtlePattern: 'https://nadfurniture.net/wp-content/uploads/2026/08/subtle-pattern.png',
};

export const WHATSAPP_NUMBER = '971506316560';

export function buildWhatsAppUrl(productTitle: string, quantity = 1): string {
  const qtyText = quantity > 1 ? ' (Quantity: ' + quantity + ')' : '';
  const message = 'Hello, I would like to enquire about this product: ' + productTitle + qtyText;
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

export const BUNK_BEDS: ProductItem[] = [
  {
    "id": "27-kg-heavy-duty-steel-bunk-bed",
    "title": "27 KG Heavy-Duty Steel Bunk Bed",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/1.webp",
    "alt": "27 KG Heavy-Duty Steel Bunk Bed",
    "specs": [
      "Model:- NAD-HK1 ( Bunk Bed )",
      "Size: L 190 cm x W 90",
      "Weight:- 27 kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Grey, Silver , Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-bunk-bed",
    "title": "Heavy-Duty Metal Bunk Bed - Sturdy Steel Frame",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/2.webp",
    "alt": "Heavy-Duty Metal Bunk Bed - Sturdy Steel Frame",
    "specs": [
      "Model:- NAD-HK2",
      "Size: L 190 cm x W 90 x H 170",
      "Weight:- 28 kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Grey, Silver , Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "36-kg-heavy-duty-steel-bunk-bed",
    "title": "36 KG Heavy-Duty Steel Bunk Bed",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/Bunk-Bed-with-Ladder.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/Bunk-Bed-with-Ladder.webp",
    "alt": "36 KG Heavy-Duty Steel Bunk Bed",
    "specs": [
      "Model:- NAD-HK2",
      "Size: L 190 cm x W 90",
      "Weight:- 36 kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Grey, Silver , Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-steel-bunk-bed",
    "title": "Heavy Duty Bunk Steel Bunk Bed",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/3.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/3.webp",
    "alt": "Heavy Duty Bunk Steel Bunk Bed",
    "specs": [
      "Model: 74",
      "Product Type: Heavy Steel Bunk Bed",
      "Dimensions: 120 cm x 190 cm",
      "Weight: 74 kg",
      "Material: Steel Frame"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-steel-bunk-bed-26-kg-black",
    "title": "Heavy Duty Steel Bunk Bed – 26 KG (Black)",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/bunk-bed-black.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/bunk-bed-black.webp",
    "alt": "Heavy Duty Steel Bunk Bed – 26 KG (Black)",
    "specs": [
      "Model:- NAD-999",
      "Size: L 190 cm x W 90 x H 170",
      "Weight:- 26 kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "steel-bunk-bed-with-wooden-headboard-footboard",
    "title": "Steel Bunk Bed with Wooden Headboard & Footboard",
    "category": "bunk-beds",
    "categoryLabel": "Bunk Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/10.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/10.webp",
    "alt": "Steel Bunk Bed with Wooden Headboard & Footboard",
    "specs": [
      "Product Type: Steel Bunk Bed with Wooden Headboard & Footboard",
      "Item No: 333",
      "Dimensions: 90 cm x 190 cm",
      "Weight: 60 kg",
      "Material: Heavy-Duty Steel Frame with Wood Accents"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const STEEL_LOCKERS: ProductItem[] = [
  {
    "id": "steel-side-table-bedside-nightstand-with-legs",
    "title": "Steel Side Table & Bedside Nightstand with Legs",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-1.webp",
    "alt": "Steel Side Table & Bedside Nightstand with Legs",
    "specs": [
      "Model: NAD-STLegs-50",
      "Size: 50x45x45 CM",
      "Item Type: Steel Side Table",
      "Color: Light Grey",
      "Storage Configuration: 1 Smooth-Gliding Drawer & 1 Lower Cabinet Door"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "4-drawer-metal-vertical-filing-cabinet",
    "title": "4 Drawer Metal Vertical Filing Cabinet",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/3-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/3-1.webp",
    "alt": "4 Drawer Metal Vertical Filing Cabinet",
    "specs": [
      "Model: NAD-24",
      "Size: 133.2x45x62 CM",
      "Item Type: Metal 4-Drawer Vertical Filing Cabinet",
      "Material: Heavy-Duty Cold-Rolled Steel",
      "Color Options: Grey, Beige, White & Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "2-door-steel-storage-wardrobe-cabinet-with-internal-safe-locker",
    "title": "2-Door Steel Storage Wardrobe Cabinet with Internal Safe Locker",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/4.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/4.webp",
    "alt": "2-Door Steel Storage Wardrobe Cabinet with Internal Safe Locker",
    "specs": [
      "Model: NAD-FC03",
      "Size: 185x90x50 CM",
      "Item Type: 2-Door Steel Wardrobe Cabinet with Internal Safe Locker",
      "Material: Heavy-Duty Alloy Steel / Metal",
      "Finish: Powder-Coated (Rust & Scratch-Resistant)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-metal-2-door-filing-storage-cabinet",
    "title": "Heavy-Duty Metal 2-Door Filing & Storage Cabinet",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/3.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/3.webp",
    "alt": "Heavy-Duty Metal 2-Door Filing & Storage Cabinet",
    "specs": [
      "Model: NAD-EF2O",
      "Size: 180x85x45 CM",
      "Item Type: Metal 2-Door Filing Cabinet",
      "Material: Heavy-Duty Cold-Rolled Steel",
      "Finish: Powder-Coated (Rust, Fade & Scratch-Resistant)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-triplex-9-door-locker-cabinet-for-high-density-storage",
    "title": "Metal Triplex 9-Door Locker Cabinet for High-Density Storage",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Triplex-9-Door-Locker-Cabinet.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Triplex-9-Door-Locker-Cabinet.webp",
    "alt": "Metal Triplex 9-Door Locker Cabinet for High-Density Storage",
    "specs": [
      "Model: NAD- CC9T",
      "Size: 185x90x45 CM (1850x900x450 MM)",
      "Item Type: Metal Triplex 9-Door Locker Cabinet",
      "Finish: Powder-Coated (Rust & Scratch-Resistant)",
      "Color: Light Grey"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-triplex-6-door-locker-cabinet-for-staff-accommodation",
    "title": "Metal Triplex 6-Door Locker Cabinet for Staff Accommodation",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Triplex-6-Door-Locker-Cabinet.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Triplex-6-Door-Locker-Cabinet.webp",
    "alt": "Metal Triplex 6-Door Locker Cabinet for Staff Accommodation",
    "specs": [
      "Model: NAD-CC6T",
      "Size: 185x90x45 CM (1850x900x450 MM)",
      "Item Type: Metal Triplex 6-Door Locker Cabinet",
      "Material: Heavy-Duty Cold-Rolled Steel",
      "Color: Light Grey"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-duplex-4-door-locker-cabinet",
    "title": "Metal Duplex 4-Door Locker Cabinet",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Duplex-4-Door-Locker-Cabinet-for-staff.png",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/Metal-Duplex-4-Door-Locker-Cabinet-for-staff.png",
    "alt": "Metal Duplex 4-Door Locker Cabinet",
    "specs": [
      "Model: NAD-CC4T",
      "Size: 185x90x45 CM",
      "Item Type: Metal Duplex 4-Door Locker Cabinet",
      "Material: Heavy-Duty Steel",
      "Finish: Powder-Coated (Rust & Scratch-Resistant)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "6-tier-metal-steel-locker-cabinet-for-commercial-staff-storage",
    "title": "6-Tier Metal Steel Locker Cabinet for Commercial & Staff Storage",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/1-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/1-1.webp",
    "alt": "6-Tier Metal Steel Locker Cabinet for Commercial & Staff Storage",
    "specs": [
      "Model: NAD-F06H",
      "Size: 183x38x40 CM (1830x380x400 MM)",
      "Item Type: Metal Six Tier Locker Cabinet",
      "Material: Heavy-Duty Steel / Metal",
      "Finish: Powder-Coated (Rust & Scratch-Resistant)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "3-tier-steel-locker-cabinet-for-staff-accommodation",
    "title": "3-Tier Steel Locker Cabinet for Staff Accommodation",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/9-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/9-1.webp",
    "alt": "3-Tier Steel Locker Cabinet for Staff Accommodation",
    "specs": [
      "Model: NAD-F03H",
      "Size: 180x40x45 CM",
      "Weight: 17 KG",
      "Item Type: Three Tier Steel Locker Cabinet",
      "Finish: Powder-Coated (Rust-Resistant & Easy to Maintain)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-metal-single-door-locker-with-internal-shelving",
    "title": "Heavy-Duty Metal Single-Door Locker with Internal Shelving",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/2-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/2-2.webp",
    "alt": "Heavy-Duty Metal Single-Door Locker with Internal Shelving",
    "specs": [
      "Model: NAD-CC8T",
      "Size: 185x60x50 CM",
      "Item Type: Metal Single-Door Locker Cabinet",
      "Material: Heavy-Duty Cold-Rolled Steel",
      "Finish: Powder-Coated (Rust & Scratch-Resistant)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-two-tier-locker-storage-solution",
    "title": "Metal Two Tier Locker - Storage Solution",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/two-tier-steel-locker.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/two-tier-steel-locker.webp",
    "alt": "Metal Two Tier Locker - Storage Solution",
    "specs": [
      "Brand: NAD",
      "Model: CC2T",
      "Size: 183x38x45",
      "Item Type: Metal Locker Cabinet",
      "Material: Heavy-Duty Steel / Metal"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "metal-one-tier-locker",
    "title": "METAL ONE TIER LOCKER - Storage Solution for Offices & Homes",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/01.png",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/01.png",
    "alt": "METAL ONE TIER LOCKER - Storage Solution for Offices & Homes",
    "specs": [
      "Model: NAD CC1T",
      "Material: Heavy-Duty Steel / Metal",
      "Finish: Powder-Coated (Rust-Resistant)",
      "Color: Grey",
      "Tiers: 1 Tier (Single Full-Length Compartment)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "4-tier-steel-locker-cabinet-for-staff-accommodation-hostels",
    "title": "4-Tier Steel Locker Cabinet for Staff Accommodation & Hostels",
    "category": "steel-lockers",
    "categoryLabel": "Steel Lockers & Cabinets",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/11.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/11.webp",
    "alt": "4-Tier Steel Locker Cabinet for Staff Accommodation & Hostels",
    "specs": [
      "Model: NAD-F04H",
      "Size: 180x40x45 CM",
      "Weight: 17 KG",
      "Item Type: Four Tier Steel Locker Cabinet",
      "Finish: Powder-Coated (Rust-Resistant & Easy to Maintain)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const MATTRESSES: ProductItem[] = [
  {
    "id": "high-density-single-medicated-mattress",
    "title": "High-Density Single Medicated Mattress",
    "category": "mattress",
    "categoryLabel": "Medical & Camp Mattresses",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/6.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/6.webp",
    "alt": "High-Density Single Medicated Mattress",
    "specs": [
      "Brand: Olympic",
      "Size: 190&#215;90 CM",
      "Item Type: High-Density Medicated Orthopedic Foam Mattress",
      "Thickness Options: Available from 6 CM to 25 CM",
      "Color: Off-White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "semi-medicated-mattress-for-bulk",
    "title": "Semi-Medicated Mattress for Bulk",
    "category": "mattress",
    "categoryLabel": "Medical & Camp Mattresses",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/3-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/3-2.webp",
    "alt": "Semi-Medicated Mattress for Bulk",
    "specs": [
      "Size: 190&#215;90 CM",
      "Item Type: High-Density Semi-Medicated Orthopedic Mattress",
      "Foam Core: High-Density Rebounded Polyurethane Foam (80D / 90D / 100+D)",
      "Thickness Options: Available from 6 CM to 25 CM (Customizable from 7 CM to 20 CM)",
      "Color: Off-White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const OFFICE_TABLES: ProductItem[] = [
  {
    "id": "office-table-140x70-modern-office-desk",
    "title": "Office Table - 140×70 Modern Office Desk",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Untitled-design.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Untitled-design.webp",
    "alt": "Office Table - 140×70 Modern Office Desk",
    "specs": [
      "Product: NAD 6007 Office Desk",
      "Available Sizes: 120 × 60 × 75 cm | 140 × 70 × 75 cm",
      "Tabletop Material: Scratch-resistant laminated engineered wood",
      "Frame & Panels: Premium engineered wood construction",
      "Colour: Oak Grey + Khaki"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "office-desk-100x50cm-white-office-table-with-3-lockable-drawers",
    "title": "Office Desk 100×50cm – White Office Table with 3 Lockable Drawers",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.png",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.png",
    "alt": "Office Desk 100×50cm – White Office Table with 3 Lockable Drawers",
    "specs": [
      "Product: 6005 Office Desk",
      "Dimensions: 100 × 50 × 75 cm",
      "Tabletop Material: Scratch-resistant laminated engineered wood",
      "Frame & Panels: Premium engineered wood construction",
      "Colour Options: White / Walnut + White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "office-desk-140x70cm-coffee-grey-office-table-with-3-lockable-drawers",
    "title": "Office Desk 140×70cm – Coffee & Grey Office Table with 3 Lockable Drawers",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-1.png",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-1.png",
    "alt": "Office Desk 140×70cm – Coffee & Grey Office Table with 3 Lockable Drawers",
    "specs": [
      "Product: NAD 5014 Office Desk",
      "Dimensions: 140 × 70 × 75 cm",
      "Tabletop Material: Scratch-resistant laminated engineered wood",
      "Frame & Panels: Premium engineered wood construction",
      "Colour: Coffee + Grey"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "wooden-office-desk-120cm-modern-workstation-with-3-drawers",
    "title": "Wooden Office Desk – 120cm Modern Workstation with 3 Drawers",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/2.png",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/2.png",
    "alt": "Wooden Office Desk – 120cm Modern Workstation with 3 Drawers",
    "specs": [
      "Product: NAD 5012 Office Desk",
      "Dimensions: 120 × 60 × 75 cm",
      "Tabletop Material: Scratch-resistant laminated engineered wood",
      "Frame & Panels: Premium engineered wood construction",
      "Colour: Coffee + Grey"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "wooden-office-desk-compact-100cm-workstation-with-3-drawers",
    "title": "Wooden Office Desk – Compact 100cm Workstation with 3 Drawers",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-9.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-9.webp",
    "alt": "Wooden Office Desk – Compact 100cm Workstation with 3 Drawers",
    "specs": [
      "Product: NAD 5010 Office Desk",
      "Dimensions: 100 × 50 × 75 cm",
      "Tabletop Material: Scratch-resistant laminated engineered wood",
      "Frame & Panels: High-quality engineered wood construction",
      "Colour: Oak + Khaki"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "wooden-office-desk-140x70cm",
    "title": "Wooden Office Desk 140×70cm – Modern Office Table with Drawers",
    "category": "office-tables",
    "categoryLabel": "Office Tables & Desks",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/3-4.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/3-4.webp",
    "alt": "Wooden Office Desk 140×70cm – Modern Office Table with Drawers",
    "specs": [
      "Product Details",
      "Product: Office Desk 140&#215;70 cm",
      "Dimensions: 140 × 70 × 75 cm",
      "Tabletop: Scratch-resistant laminated engineered wood",
      "Colour: Coffee + Grey",
      "Gross Weight: 48 kg"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const OFFICE_WORKSTATIONS: ProductItem[] = [
  {
    "id": "two-person-modern-office-workstation",
    "title": "Two-Person Modern Office Workstation",
    "category": "office-workstation",
    "categoryLabel": "Office Workstations",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-6.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-6.webp",
    "alt": "Two-Person Modern Office Workstation",
    "specs": [
      "Product Name: Two-Person Office Workstation",
      "Model: NAD 512-2",
      "Capacity: 2 Persons",
      "Overall Size: 120 × 50 × 110 cm",
      "Color: Cherry & White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "four-person-office-workstation",
    "title": "Four-Person Office Workstation",
    "category": "office-workstation",
    "categoryLabel": "Office Workstations",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-6.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-6.webp",
    "alt": "Four-Person Office Workstation",
    "specs": [
      "Product Name: Four-Person Office Workstation",
      "Model: NAD 512-4",
      "Capacity: 4 Persons",
      "Overall Size: 240 × 100 × 110 cm",
      "Color: Beech & White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "two-person-office-workstation",
    "title": "Two-Person Office Workstation",
    "category": "office-workstation",
    "categoryLabel": "Office Workstations",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-5.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-5.webp",
    "alt": "Two-Person Office Workstation",
    "specs": [
      "Product Name: Two-Person Office Workstation",
      "Model: NAD 512-2",
      "Capacity: 2 Persons",
      "Overall Size: 120 × 50 × 110 cm",
      "Color: White"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "1-person-office-workstation-with-screen-divider",
    "title": "1-Person Office Workstation with Screen Divider | Oak & Khaki",
    "category": "office-workstation",
    "categoryLabel": "Office Workstations",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-4.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/2-1-4.webp",
    "alt": "1-Person Office Workstation with Screen Divider | Oak & Khaki",
    "specs": [
      "Product Name: 1-Person Office Workstation",
      "Capacity: 1 Person",
      "Overall Size: 120 × 60 × 75 cm",
      "Screen Divider Size: 80 × 30 cm",
      "Color: Oak & Khaki"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const WARDROBES: ProductItem[] = [
  {
    "id": "3-door-wooden-wardrobe-with-top-drawers",
    "title": "3 Door Wooden Wardrobe with Top Drawers",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/7-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/7-1.webp",
    "alt": "3 Door Wooden Wardrobe with Top Drawers",
    "specs": [
      "Model No: 7738",
      "Number of Doors: 3",
      "Base Material: Engineered Wood",
      "Product Length (Width): 150 cm",
      "Product Height: 210 cm"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "3-door-wooden-wardrobe",
    "title": "3 Door Wooden Wardrobe",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/10-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/10-2.webp",
    "alt": "3 Door Wooden Wardrobe",
    "specs": [
      "Model: NAD-633",
      "Size: 120 x 50 x 190(cm)",
      "Material: Engineered Wood & Particle Board",
      "Weight: 95 kg",
      "Country of Origin: United Arab Emirates (UAE)"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "3-door-heavy-duty-wooden-wardrobe-with-drawer",
    "title": "3-Door Heavy Duty Wooden Wardrobe with Drawer",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/9.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/9.webp",
    "alt": "3-Door Heavy Duty Wooden Wardrobe with Drawer",
    "specs": [
      "Features:",
      "Dimensions: 150 cm (Width) x 55 cm (Depth) x 200 cm (Height)",
      "Material: High-Grade Engineered Wood",
      "Model: 7738",
      "Storage: Units3 Doors, Hanging Rod, Shelves, Built-in Drawers"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "two-door-wooden-wardrobe-with-mirror-drawers",
    "title": "Two-Door Wooden Wardrobe with Mirror & Drawers",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/3-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/3-2.webp",
    "alt": "Two-Door Wooden Wardrobe with Mirror & Drawers",
    "specs": [
      "Key Features & Specifications",
      "Model / SKU: NAD-7728",
      "Dimensions: 200 cm (H) x 100 cm (W) x 55 cm (D)",
      "Weight: 81 kg (sturdy and durable build)",
      "Material: Particle Board & Engineered Wood",
      "Country of Origin: Made in UAE"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "two-door-multiuse-wooden-wardrobe",
    "title": "Two-Door Multiuse Wooden Wardrobe",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/4.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/4.webp",
    "alt": "Two-Door Multiuse Wooden Wardrobe",
    "specs": [
      "Key Features & Specifications",
      "Model: NAD-922",
      "Size: 200x100x50 (cm)",
      "Material: Engineered Wood & Particle Board",
      "Weight: 56 kg",
      "Country of Origin: Made in UAE"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "modern-two-door-wardrobe",
    "title": "Modern Two-Door Wardrobe",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/two-door-wardrobe-1.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/two-door-wardrobe-1.webp",
    "alt": "Modern Two-Door Wardrobe",
    "specs": [
      "Key Features & Specifications",
      "Model: NAD-622",
      "Size: 90x190x55",
      "Material: Quality Particle Board",
      "Weight: 75 kg (solid, stable construction)",
      "Country of Origin: Made in UAE"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "two-door-wardrobe-with-mirror",
    "title": "Two Door Wardrobe with Mirror",
    "category": "wardrobe",
    "categoryLabel": "Wardrobes",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/6.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/6.webp",
    "alt": "Two Door Wardrobe with Mirror",
    "specs": [
      "Product Type: Two-Door Wooden Wardrobe with Full-Length Mirror",
      "Dimensions: (D × W × H): 40 × 80 × 185 cm",
      "Material: Premium Engineered Wood",
      "Key Features: Built-in Full-Length Mirror, Lockable Double Doors, Spacious Bottom Storage Drawer, Smooth Metal Hardware, and Modern Elegant Design."
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const KING_BEDS: ProductItem[] = [
  {
    "id": "king-size-bed-180x200cm-grey",
    "title": "King Size Bed 180×200cm – Grey Panel Design | NAD-74180",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-grey.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-grey.webp",
    "alt": "King Size Bed 180×200cm – Grey Panel Design | NAD-74180",
    "specs": [
      "Model: NAD-74180",
      "Product Type: King Size Bed",
      "Size: 180 × 200 cm",
      "Weight: 90 kg",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-mahogany",
    "title": "King Size Bed 180×200cm – Mahogany Engineered Wood Bed with Storage Headboard",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-Mahogany.webp",
    "alt": "King Size Bed 180×200cm – Mahogany Engineered Wood Bed with Storage Headboard",
    "specs": [
      "Product Type: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Colour: Mahogany",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-silver",
    "title": "King Size Bed 180×200cm – Silver Engineered Wood Bed",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed.webp",
    "alt": "King Size Bed 180×200cm – Silver Engineered Wood Bed",
    "specs": [
      "Product Type: King Size Bed",
      "Bed Size: 180 × 200 cm",
      "Model: NAD 706",
      "Colour: Silver",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-white",
    "title": "King Size Bed 180×200cm – White Engineered Wood Bed with Storage Headboard",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-white.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-white.webp",
    "alt": "King Size Bed 180×200cm – White Engineered Wood Bed with Storage Headboard",
    "specs": [
      "Product Type: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Colour: White",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-plain-headboard-white",
    "title": "King Size Bed 180×200cm with Plain Headboard – White",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-with-Plain-Headboard-White.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-with-Plain-Headboard-White.webp",
    "alt": "King Size Bed 180×200cm with Plain Headboard – White",
    "specs": [
      "Product: King Size Bed",
      "Model: 9180",
      "Bed Size: 180 × 200 cm",
      "Color: White",
      "Headboard: Plain Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-storage-headboard-fume",
    "title": "King Size Bed 180×200cm with Storage Headboard – Fume",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-with-Storage-Headboard-Fume.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-with-Storage-Headboard-Fume.webp",
    "alt": "King Size Bed 180×200cm with Storage Headboard – Fume",
    "specs": [
      "Product: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Color: Fume",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const QUEEN_BEDS: ProductItem[] = [
  {
    "id": "queen-size-bed-plain-headboard-mahogany",
    "title": "Queen Size Bed 160×200cm with Plain Headboard – Mahogany",
    "category": "queen-beds",
    "categoryLabel": "Queen Size Beds (160x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Bed-with-Plain-Headboard-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Bed-with-Plain-Headboard-Mahogany.webp",
    "alt": "Queen Size Bed 160×200cm with Plain Headboard – Mahogany",
    "specs": [
      "Product: Queen Size Bed",
      "Model: NAD-74160",
      "Bed Size: 160 × 200 cm",
      "Weight: 90 kg",
      "Country of Origin: UAE"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "queen-size-wooden-bed-storage-headboard",
    "title": "Queen Size Wooden Bed 160×200cm with Storage Headboard",
    "category": "queen-beds",
    "categoryLabel": "Queen Size Beds (160x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Wooden-Bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Wooden-Bed.webp",
    "alt": "Queen Size Wooden Bed 160×200cm with Storage Headboard",
    "specs": [
      "Product:Queen Size Bed",
      "Model: NAD-704",
      "Bed Size: 160 × 200 cm",
      "Weight: 85 kg",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const DOUBLE_BEDS: ProductItem[] = [
  {
    "id": "double-bed-decorative-headboard-ash",
    "title": "Double Bed 120×190cm with Decorative Headboard – Ash",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-Decorative-Headboard.webp",
    "alt": "Double Bed 120×190cm with Decorative Headboard – Ash",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 1020",
      "Bed Size: 120 × 190 cm",
      "Color: Ash",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-panel-headboard-walnut",
    "title": "Double Bed 120×190cm with Panel Headboard – Walnut",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-with-Panel-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-with-Panel-Headboard.webp",
    "alt": "Double Bed 120×190cm with Panel Headboard – Walnut",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 608",
      "Bed Size: 120 × 190 cm",
      "Color: Walnut",
      "Headboard: Panel Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-plain-headboard-mahogany",
    "title": "Double Bed 120×190cm with Plain Headboard – Mahogany",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-120×190cm-with-Plain-Headboard-–-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-120×190cm-with-Plain-Headboard-–-Mahogany.webp",
    "alt": "Double Bed 120×190cm with Plain Headboard – Mahogany",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 74120",
      "Bed Size: 120 × 190 cm",
      "Weight: 65 kg",
      "Color: mahogany"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-storage-headboard-oak",
    "title": "Double Bed 120×190cm with Storage Headboard – Oak",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/double-bed-oak.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/double-bed-oak.webp",
    "alt": "Double Bed 120×190cm with Storage Headboard – Oak",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 720",
      "Bed Size: 120 × 190 cm",
      "Color: Oak / White/ Ash/ Fume/ Maple/ Mahogany/ Cherry",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-140x190-white",
    "title": "Double Bed 140×190cm with Panel Headboard – White",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-140×190cm-with-Panel-Headboard-White.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-140×190cm-with-Panel-Headboard-White.webp",
    "alt": "Double Bed 140×190cm with Panel Headboard – White",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 74140",
      "Bed Size: 140 × 190 cm",
      "Color: White",
      "Headboard: Square Panel Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const SINGLE_BEDS: ProductItem[] = [
  {
    "id": "heavy-duty-single-steel-folding-bed-in-green",
    "title": "Heavy-Duty Single Steel Folding Bed in Green",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.webp",
    "alt": "Heavy-Duty Single Steel Folding Bed in Green",
    "specs": [
      "Model: NAD-SFB-GRN",
      "Item Type: Single Steel Folding Bed",
      "Frame Material: Heavy-Duty Steel",
      "Base Type: Ventilated Metal Slats with Built-in Headboard",
      "Finish: Protective Powder-Coated Coating"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "steel-single-bed",
    "title": "Heavy-Duty Steel Single Bed",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/7.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/7.webp",
    "alt": "Heavy-Duty Steel Single Bed",
    "specs": [
      "Model:- HK1",
      "Size:- 90&#215;190 cm",
      "Weight:- 14kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Grey, Silver, Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-steel-single-bed",
    "title": "Heavy-Duty Steel Single Bed",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/single-steel-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/single-steel-bed.webp",
    "alt": "Heavy-Duty Steel Single Bed",
    "specs": [
      "Model: NAD-40-2",
      "Weight: 18 kg",
      "Country Origin: UAE",
      "Item Includes: Bed Only",
      "Color Available: Grey, Silver, Black",
      "Warranty Period: 1 Year"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-decorative-headboard-ash",
    "title": "Single Bed 90×190cm with Decorative Headboard – Ash",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-Decorative-Headboard.webp",
    "alt": "Single Bed 90×190cm with Decorative Headboard – Ash",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 1090",
      "Bed Size: 90 × 120 cm",
      "Color: Ash",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-decorative-headboard-white",
    "title": "Single Bed 90×190cm with Decorative Headboard – White",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Decorative-Headboard.webp",
    "alt": "Single Bed 90×190cm with Decorative Headboard – White",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 1090",
      "Bed Size: 90 × 190 cm",
      "Color: White",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-panel-headboard-silver",
    "title": "Single Bed 90×190cm with Panel Headboard – Silver",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Panel-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Panel-Headboard.webp",
    "alt": "Single Bed 90×190cm with Panel Headboard – Silver",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 7490",
      "Bed Size: 90 × 190 cm",
      "Color: Silver",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-storage-headboard-mahogany",
    "title": "Single Bed 90×190cm with Storage Headboard – Mahogany",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/single-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/single-bed.webp",
    "alt": "Single Bed 90×190cm with Storage Headboard – Mahogany",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 808",
      "Bed Size: 90 × 190 cm",
      "Weight: 65 kg",
      "Color: Mahogany"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-storage-headboard-silver",
    "title": "Single Bed 90×190cm with Storage Headboard – Silver",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-with-Storage-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-with-Storage-Headboard.webp",
    "alt": "Single Bed 90×190cm with Storage Headboard – Silver",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 708",
      "Bed Size: 90 × 190 cm",
      "Weight: 65 kg",
      "Color: Silver"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const BEDROOM_BEDS: ProductItem[] = [
  {
    "id": "king-size-bed-180x200cm-grey",
    "title": "King Size Bed 180×200cm – Grey Panel Design | NAD-74180",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-grey.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-grey.webp",
    "alt": "King Size Bed 180×200cm – Grey Panel Design | NAD-74180",
    "specs": [
      "Model: NAD-74180",
      "Product Type: King Size Bed",
      "Size: 180 × 200 cm",
      "Weight: 90 kg",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-mahogany",
    "title": "King Size Bed 180×200cm – Mahogany Engineered Wood Bed with Storage Headboard",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-Mahogany.webp",
    "alt": "King Size Bed 180×200cm – Mahogany Engineered Wood Bed with Storage Headboard",
    "specs": [
      "Product Type: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Colour: Mahogany",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-silver",
    "title": "King Size Bed 180×200cm – Silver Engineered Wood Bed",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed.webp",
    "alt": "King Size Bed 180×200cm – Silver Engineered Wood Bed",
    "specs": [
      "Product Type: King Size Bed",
      "Bed Size: 180 × 200 cm",
      "Model: NAD 706",
      "Colour: Silver",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-180x200cm-white",
    "title": "King Size Bed 180×200cm – White Engineered Wood Bed with Storage Headboard",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-white.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/king-size-bed-white.webp",
    "alt": "King Size Bed 180×200cm – White Engineered Wood Bed with Storage Headboard",
    "specs": [
      "Product Type: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Colour: White",
      "Material: Engineered Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-plain-headboard-white",
    "title": "King Size Bed 180×200cm with Plain Headboard – White",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-with-Plain-Headboard-White.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-Bed-with-Plain-Headboard-White.webp",
    "alt": "King Size Bed 180×200cm with Plain Headboard – White",
    "specs": [
      "Product: King Size Bed",
      "Model: 9180",
      "Bed Size: 180 × 200 cm",
      "Color: White",
      "Headboard: Plain Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "king-size-bed-storage-headboard-fume",
    "title": "King Size Bed 180×200cm with Storage Headboard – Fume",
    "category": "king-beds",
    "categoryLabel": "King Size Beds (180x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-with-Storage-Headboard-Fume.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/King-Size-with-Storage-Headboard-Fume.webp",
    "alt": "King Size Bed 180×200cm with Storage Headboard – Fume",
    "specs": [
      "Product: King Size Bed",
      "Model: NAD 706",
      "Bed Size: 180 × 200 cm",
      "Color: Fume",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "queen-size-bed-plain-headboard-mahogany",
    "title": "Queen Size Bed 160×200cm with Plain Headboard – Mahogany",
    "category": "queen-beds",
    "categoryLabel": "Queen Size Beds (160x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Bed-with-Plain-Headboard-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Bed-with-Plain-Headboard-Mahogany.webp",
    "alt": "Queen Size Bed 160×200cm with Plain Headboard – Mahogany",
    "specs": [
      "Product: Queen Size Bed",
      "Model: NAD-74160",
      "Bed Size: 160 × 200 cm",
      "Weight: 90 kg",
      "Country of Origin: UAE"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "queen-size-wooden-bed-storage-headboard",
    "title": "Queen Size Wooden Bed 160×200cm with Storage Headboard",
    "category": "queen-beds",
    "categoryLabel": "Queen Size Beds (160x200)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Wooden-Bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Queen-Size-Wooden-Bed.webp",
    "alt": "Queen Size Wooden Bed 160×200cm with Storage Headboard",
    "specs": [
      "Product:Queen Size Bed",
      "Model: NAD-704",
      "Bed Size: 160 × 200 cm",
      "Weight: 85 kg",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-decorative-headboard-ash",
    "title": "Double Bed 120×190cm with Decorative Headboard – Ash",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-Decorative-Headboard.webp",
    "alt": "Double Bed 120×190cm with Decorative Headboard – Ash",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 1020",
      "Bed Size: 120 × 190 cm",
      "Color: Ash",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-panel-headboard-walnut",
    "title": "Double Bed 120×190cm with Panel Headboard – Walnut",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-with-Panel-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-with-Panel-Headboard.webp",
    "alt": "Double Bed 120×190cm with Panel Headboard – Walnut",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 608",
      "Bed Size: 120 × 190 cm",
      "Color: Walnut",
      "Headboard: Panel Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-plain-headboard-mahogany",
    "title": "Double Bed 120×190cm with Plain Headboard – Mahogany",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-120×190cm-with-Plain-Headboard-–-Mahogany.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-120×190cm-with-Plain-Headboard-–-Mahogany.webp",
    "alt": "Double Bed 120×190cm with Plain Headboard – Mahogany",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 74120",
      "Bed Size: 120 × 190 cm",
      "Weight: 65 kg",
      "Color: mahogany"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-storage-headboard-oak",
    "title": "Double Bed 120×190cm with Storage Headboard – Oak",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/double-bed-oak.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/double-bed-oak.webp",
    "alt": "Double Bed 120×190cm with Storage Headboard – Oak",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 720",
      "Bed Size: 120 × 190 cm",
      "Color: Oak / White/ Ash/ Fume/ Maple/ Mahogany/ Cherry",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "double-bed-140x190-white",
    "title": "Double Bed 140×190cm with Panel Headboard – White",
    "category": "double-beds",
    "categoryLabel": "Double Beds (120x190 / 140x190)",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-140×190cm-with-Panel-Headboard-White.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Double-Bed-140×190cm-with-Panel-Headboard-White.webp",
    "alt": "Double Bed 140×190cm with Panel Headboard – White",
    "specs": [
      "Product: Double Bed",
      "Model: NAD 74140",
      "Bed Size: 140 × 190 cm",
      "Color: White",
      "Headboard: Square Panel Headboard"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-single-steel-folding-bed-in-green",
    "title": "Heavy-Duty Single Steel Folding Bed in Green",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/1-2.webp",
    "alt": "Heavy-Duty Single Steel Folding Bed in Green",
    "specs": [
      "Model: NAD-SFB-GRN",
      "Item Type: Single Steel Folding Bed",
      "Frame Material: Heavy-Duty Steel",
      "Base Type: Ventilated Metal Slats with Built-in Headboard",
      "Finish: Protective Powder-Coated Coating"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "steel-single-bed",
    "title": "Heavy-Duty Steel Single Bed",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/7.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/7.webp",
    "alt": "Heavy-Duty Steel Single Bed",
    "specs": [
      "Model:- HK1",
      "Size:- 90&#215;190 cm",
      "Weight:- 14kg",
      "Country Origin:- UAE",
      "Item Includes:- Bed Only",
      "Color Available:- Grey, Silver, Black"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "heavy-duty-steel-single-bed",
    "title": "Heavy-Duty Steel Single Bed",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/07/single-steel-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/07/single-steel-bed.webp",
    "alt": "Heavy-Duty Steel Single Bed",
    "specs": [
      "Model: NAD-40-2",
      "Weight: 18 kg",
      "Country Origin: UAE",
      "Item Includes: Bed Only",
      "Color Available: Grey, Silver, Black",
      "Warranty Period: 1 Year"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-decorative-headboard-ash",
    "title": "Single Bed 90×190cm with Decorative Headboard – Ash",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-Decorative-Headboard.webp",
    "alt": "Single Bed 90×190cm with Decorative Headboard – Ash",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 1090",
      "Bed Size: 90 × 120 cm",
      "Color: Ash",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-decorative-headboard-white",
    "title": "Single Bed 90×190cm with Decorative Headboard – White",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Decorative-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Decorative-Headboard.webp",
    "alt": "Single Bed 90×190cm with Decorative Headboard – White",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 1090",
      "Bed Size: 90 × 190 cm",
      "Color: White",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-panel-headboard-silver",
    "title": "Single Bed 90×190cm with Panel Headboard – Silver",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Panel-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-90×190cm-with-Panel-Headboard.webp",
    "alt": "Single Bed 90×190cm with Panel Headboard – Silver",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 7490",
      "Bed Size: 90 × 190 cm",
      "Color: Silver",
      "Material: Engineered Wood & Particle Wood"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-storage-headboard-mahogany",
    "title": "Single Bed 90×190cm with Storage Headboard – Mahogany",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/single-bed.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/single-bed.webp",
    "alt": "Single Bed 90×190cm with Storage Headboard – Mahogany",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 808",
      "Bed Size: 90 × 190 cm",
      "Weight: 65 kg",
      "Color: Mahogany"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  },
  {
    "id": "single-bed-storage-headboard-silver",
    "title": "Single Bed 90×190cm with Storage Headboard – Silver",
    "category": "single-beds",
    "categoryLabel": "Single & Accommodation Beds",
    "image": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-with-Storage-Headboard.webp",
    "fallbackImage": "https://nadfurniture.net/wp-content/uploads/2026/08/Single-Bed-with-Storage-Headboard.webp",
    "alt": "Single Bed 90×190cm with Storage Headboard – Silver",
    "specs": [
      "Product: Single Bed",
      "Model: NAD 708",
      "Bed Size: 90 × 190 cm",
      "Weight: 65 kg",
      "Color: Silver"
    ],
    "price": "Wholesale Quote on Request",
    "minOrder": "Project / Wholesale Supply",
    "inStock": true
  }
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...BUNK_BEDS,
  ...STEEL_LOCKERS,
  ...MATTRESSES,
  ...OFFICE_TABLES,
  ...OFFICE_WORKSTATIONS,
  ...WARDROBES,
  ...BEDROOM_BEDS,
];

export const UAE_LOCATIONS = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
  'Al Ain',
  'Other',
];
