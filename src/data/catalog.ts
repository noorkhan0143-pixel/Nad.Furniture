import bunkBedImg from '../assets/images/hero_bunk_bed_1793892668497.jpg';
import steelLockerImg from '../assets/images/product_steel_locker_1793892669123.jpg';
import woodenWardrobeImg from '../assets/images/product_wooden_wardrobe_1793892669319.jpg';
import bedroomHomeImg from '../assets/images/showcase_bedroom_home_1793892669741.jpg';
import officeWorkspaceImg from '../assets/images/showcase_office_workspace_1793892669832.jpg';

export type ProductCategory =
  | 'bunk-beds'
  | 'steel-lockers'
  | 'wardrobe'
  | 'office-furniture'
  | 'beds';

export interface ProductItem {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  fallbackImage: string;
  alt: string;
  specs: string[];
  tag?: 'Best Seller' | 'New Arrival' | 'On Sale' | string;
  price?: string;
  originalPrice?: string;
  minOrder?: string;
  inStock?: boolean;
}

export const SITE_IMAGES = {
  heroBunkBeds: 'https://nadfurniture.net/wp-content/uploads/2026/07/bunkbeds.webp',
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
  const qtyText = quantity > 1 ? ` (Quantity: ${quantity})` : '';
  const message = `Hello, I would like to enquire about this product: ${productTitle}${qtyText}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const BUNK_BEDS: ProductItem[] = [
  {
    id: '27-kg-heavy-duty-steel-bunk-bed',
    title: '27 KG Heavy-Duty Steel Bunk Bed',
    category: 'bunk-beds',
    categoryLabel: 'Bunk Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/1-300x300.webp',
    fallbackImage: bunkBedImg,
    alt: 'Heavy-Duty Steel Bunk Bed',
    specs: [
      '27 KG heavy-gauge powder-coated steel frame',
      'Integrated safety guardrails & sturdy side ladder',
      'Standard 90 x 190 cm mattress compatibility',
      'Ideal for labour camps & staff accommodation',
    ],
  },
  {
    id: '36-kg-heavy-duty-steel-bunk-bed',
    title: '36 KG Heavy-Duty Steel Bunk Bed',
    category: 'bunk-beds',
    categoryLabel: 'Bunk Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/Bunk-Bed-with-Ladder-300x300.webp',
    fallbackImage: bunkBedImg,
    alt: 'Bunk Bed with Ladder',
    specs: [
      'Extra-reinforced 36 KG structural steel tubing',
      'Anti-rust electrostatic powder-coated finish',
      'High load-bearing welded mesh base',
      'Built for long-term commercial & hostel use',
    ],
  },
  {
    id: 'heavy-duty-bunk-steel-bunk-bed',
    title: 'Heavy Duty Bunk Steel Bunk Bed',
    category: 'bunk-beds',
    categoryLabel: 'Bunk Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/3-300x300.webp',
    fallbackImage: bunkBedImg,
    alt: 'heavy duty Steel Bunk Bed',
    specs: [
      'Commercial-grade steel post construction',
      'Full-length upper bunk safety rails',
      'Easy assembly with bolted corner brackets',
      'Bulk UAE delivery & installation available',
    ],
  },
  {
    id: 'heavy-duty-steel-bunk-bed-26-kg-black',
    title: 'Heavy Duty Steel Bunk Bed – 26 KG (Black)',
    category: 'bunk-beds',
    categoryLabel: 'Bunk Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/bunk-bed-black-300x300.webp',
    fallbackImage: bunkBedImg,
    alt: 'steel bunk bed black',
    specs: [
      '26 KG matte black powder-coated steel frame',
      'Space-saving vertical footprint for dormitories',
      'Reinforced central support bars',
      'Scratch-resistant industrial finish',
    ],
  },
  {
    id: 'heavy-duty-metal-bunk-bed-sturdy-steel-frame',
    title: 'Heavy-Duty Metal Bunk Bed – Sturdy Steel Frame',
    category: 'bunk-beds',
    categoryLabel: 'Bunk Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/2-300x300.webp',
    fallbackImage: bunkBedImg,
    alt: 'heavy duty steel bunk bed',
    specs: [
      'Sturdy tubular steel frame for staff housing',
      'Non-slip ladder rungs & protective foot caps',
      'Factory-direct wholesale pricing in UAE',
      'Available in custom bulk quantities',
    ],
  },
];

export const STEEL_LOCKERS: ProductItem[] = [
  {
    id: '2-door-steel-storage-wardrobe-cabinet',
    title: '2-Door Steel Storage Wardrobe Cabinet with Internal Safe Locker',
    category: 'steel-lockers',
    categoryLabel: 'Steel Lockers & Cabinets',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/08/4-300x300.webp',
    fallbackImage: steelLockerImg,
    alt: '2 Door Steel Cabinet With Locker',
    specs: [
      'Cold-rolled steel sheet with powder-coated finish',
      'Internal lockable safe compartment + hanging rod',
      'Ventilated doors with key lock & handle',
      'Ideal for staff rooms & site offices',
    ],
  },
  {
    id: '3-tier-steel-locker-cabinet',
    title: '3-Tier Steel Locker Cabinet for Staff Accommodation',
    category: 'steel-lockers',
    categoryLabel: 'Steel Lockers & Cabinets',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/9-1-300x300.webp',
    fallbackImage: steelLockerImg,
    alt: '3-Tier Steel Locker Cabinet',
    specs: [
      '3 individual lockable compartments',
      'Airflow ventilation louvers on each door',
      'Name card holder & heavy-duty cam lock',
      'Moisture-resistant epoxy powder coating',
    ],
  },
  {
    id: '4-drawer-metal-vertical-filing-cabinet',
    title: '4 Drawer Metal Vertical Filing Cabinet',
    category: 'steel-lockers',
    categoryLabel: 'Steel Lockers & Cabinets',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/08/3-1-300x300.webp',
    fallbackImage: steelLockerImg,
    alt: '4-Drawer Metal Vertical Filing Cabinet',
    specs: [
      '4 full-extension drawers with ball-bearing slides',
      'Central locking system with 2 keys',
      'Supports A4 & Foolscap suspension files',
      'Heavy-gauge steel body for corporate offices',
    ],
  },
  {
    id: '4-tier-steel-locker-cabinet',
    title: '4-Tier Steel Locker Cabinet for Staff Accommodation & Hostels',
    category: 'steel-lockers',
    categoryLabel: 'Steel Lockers & Cabinets',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/11-300x300.webp',
    fallbackImage: steelLockerImg,
    alt: '4-Tier Steel Locker Cabinet for Staff Accommodation & Hostels',
    specs: [
      '4-compartment vertical steel locker unit',
      'Padlock hasp or key lock options',
      'Reinforced door stiffeners for security',
      'Designed for high-density staff housing',
    ],
  },
  {
    id: '6-tier-metal-steel-locker-cabinet',
    title: '6-Tier Metal Steel Locker Cabinet for Commercial & Staff Storage',
    category: 'steel-lockers',
    categoryLabel: 'Steel Lockers & Cabinets',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/1-1-300x300.webp',
    fallbackImage: steelLockerImg,
    alt: '6-Tier Metal Steel Locker Cabinet for Commercial & Staff Storage',
    specs: [
      '6 compact individual storage lockers',
      'Perforated ventilation slots & number plates',
      'Durable grey electrostatic powder coat',
      'Ready for bulk delivery across all Emirates',
    ],
  },
];

export const WARDROBES: ProductItem[] = [
  {
    id: '3-door-wooden-wardrobe',
    title: '3 Door Wooden Wardrobe',
    category: 'wardrobe',
    categoryLabel: 'Wardrobe',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/10-2-300x300.webp',
    fallbackImage: woodenWardrobeImg,
    alt: '3 door wardrobe',
    specs: [
      'Spacious 3-door engineered wood construction',
      'Full-length hanging rail + internal shelving',
      'Scratch-resistant melamine woodgrain finish',
      'Suitable for homes & staff accommodation',
    ],
  },
  {
    id: '3-door-wooden-wardrobe-with-top-drawers',
    title: '3 Door Wooden Wardrobe with Top Drawers',
    category: 'wardrobe',
    categoryLabel: 'Wardrobe',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/7-1-300x300.webp',
    fallbackImage: woodenWardrobeImg,
    alt: '3 Door Wooden Wardrobe Closet with Hanging Space & Shelves',
    specs: [
      '3-door closet with integrated lower/top drawers',
      'Smooth-glide metal drawer runners',
      'Modern minimalist handles & soft-close hinges',
      'Available in walnut, oak, and white finishes',
    ],
  },
  {
    id: '3-door-heavy-duty-wooden-wardrobe-with-drawer',
    title: '3-Door Heavy Duty Wooden Wardrobe with Drawer',
    category: 'wardrobe',
    categoryLabel: 'Wardrobe',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/9-300x300.webp',
    fallbackImage: woodenWardrobeImg,
    alt: '3-Door Heavy Duty Wooden Wardrobe',
    specs: [
      '18mm thick high-density board construction',
      'Lockable storage drawer for valuables',
      'Heavy-duty aluminum hanging rod',
      'Built for residential & hospitality projects',
    ],
  },
  {
    id: 'modern-two-door-wardrobe',
    title: 'Modern Two-Door Wardrobe',
    category: 'wardrobe',
    categoryLabel: 'Wardrobe',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/two-door-wardrobe-1-300x300.webp',
    fallbackImage: woodenWardrobeImg,
    alt: 'Modern Two-Door Wardrobe',
    specs: [
      'Compact 2-door footprint for guest & staff rooms',
      'Upper shelf + full hanging compartment',
      'Clean contemporary wood finish',
      'Fast flat-pack or assembled UAE delivery',
    ],
  },
  {
    id: 'two-door-wardrobe-with-mirror',
    title: 'Two Door Wardrobe with Mirror',
    category: 'wardrobe',
    categoryLabel: 'Wardrobe',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/6-300x300.webp',
    fallbackImage: woodenWardrobeImg,
    alt: 'Two Door Wardrobe with Mirror',
    specs: [
      'Full-length dressing mirror mounted on door',
      'Internal shelves & garment hanging rail',
      'Durable laminate surface, easy to clean',
      'Ideal for apartments, villas & staff quarters',
    ],
  },
];

export const EXTRA_PRODUCTS: ProductItem[] = [
  {
    id: 'executive-office-desk-with-drawers',
    title: 'Executive Office Table with Drawers',
    category: 'office-furniture',
    categoryLabel: 'Office Furniture',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/08/3-4.webp',
    fallbackImage: officeWorkspaceImg,
    alt: 'Office Table with Drawers',
    specs: [
      '160 x 80 cm scratch-resistant worktop',
      'Lockable 3-drawer mobile pedestal',
      'Integrated cable management grommets',
      'Heavy-duty powder-coated steel legs',
    ],
  },
  {
    id: 'modular-4-person-office-workstation',
    title: 'Modular 4-Person Office Workstation',
    category: 'office-furniture',
    categoryLabel: 'Office Furniture',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/office-furniture.jpg',
    fallbackImage: officeWorkspaceImg,
    alt: 'Modular 4-Person Office Workstation',
    specs: [
      'Acoustic fabric desk dividers for focus',
      'Under-desk wire tray & power raceway',
      'Configurable for 2, 4, 6, or 8 staff',
      'Bulk corporate fit-out pricing in UAE',
    ],
  },
  {
    id: 'king-size-upholstered-bed-frame',
    title: 'King Size Bed Frame (180 x 200 cm)',
    category: 'beds',
    categoryLabel: 'Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/king-size-bed-2-1024x778.webp',
    fallbackImage: bedroomHomeImg,
    alt: 'king size bed',
    specs: [
      '180 x 200 cm King Size solid wood & steel frame',
      'Padded linen-weave headboard',
      'Orthopedic slatted mattress base',
      'Available in King, Queen, Double & Single',
    ],
  },
  {
    id: 'heavy-duty-single-steel-bed',
    title: 'Heavy-Duty Single Steel Bed (90 x 190 cm)',
    category: 'beds',
    categoryLabel: 'Beds',
    image: 'https://nadfurniture.net/wp-content/uploads/2026/07/king-size-bed-1-1024x665.webp',
    fallbackImage: bedroomHomeImg,
    alt: 'Single Bed',
    specs: [
      '90 x 190 cm single accommodation bed',
      'Reinforced steel tube frame & mesh base',
      'Powder-coated anti-rust finish',
      'Ideal for labour camps, hostels & clinics',
    ],
  },
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...BUNK_BEDS,
  ...STEEL_LOCKERS,
  ...WARDROBES,
  ...EXTRA_PRODUCTS,
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
