import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = 'dist';
const source = await readFile(join(dist, 'index.html'), 'utf8');

const pages = [
  {
    path: 'about',
    title: 'About NAD Furniture | Furniture Supplier in Dubai, UAE',
    description: 'Learn about NAD Furniture, a Dubai-based supplier of steel bunk beds, metal beds, steel lockers and commercial furniture across the UAE.'
  },
  {
    path: 'projects',
    title: 'Furniture Projects | NAD Furniture UAE',
    description: 'Explore NAD Furniture project work and furniture solutions for staff accommodation, commercial spaces and businesses across the UAE.'
  },
  {
    path: 'manufacturing',
    title: 'Metal Furniture Manufacturing | NAD Furniture UAE',
    description: 'Discover NAD Furniture manufacturing capabilities for steel bunk beds, metal beds, lockers and commercial furniture in the UAE.'
  },
  {
    path: 'services',
    title: 'Commercial Furniture Supply & Services | NAD Furniture UAE',
    description: 'NAD Furniture provides commercial furniture supply solutions, including steel beds, lockers and office furniture for UAE projects.'
  }
,
  {
    path: 'steel-bunk-beds-uae',
    title: 'Steel Bunk Beds UAE | Heavy-Duty Metal Bunk Beds | NAD Furniture',
    description: 'Explore heavy-duty steel bunk beds supplied by NAD Furniture for staff accommodation, labour camps, hostels and bulk projects across Dubai and the UAE.'
  },
  {
    path: 'steel-lockers-uae',
    title: 'Steel Lockers UAE | Metal Storage Lockers & Cabinets | NAD Furniture',
    description: 'Shop steel lockers, metal storage cabinets and filing units from NAD Furniture for offices, staff accommodation and commercial facilities across the UAE.'
  },
  {
    path: 'mattresses-uae',
    title: 'Mattresses UAE | Staff Accommodation Mattresses | NAD Furniture',
    description: 'Explore single and semi-medicated mattresses from NAD Furniture for staff accommodation, hostels and bulk supply requirements across the UAE.'
  },
  {
    path: 'beds-uae',
    title: 'Metal & Bedroom Beds UAE | Single, Double, Queen & King Beds | NAD Furniture',
    description: 'Explore single, double, queen, king and metal beds from NAD Furniture for homes, accommodation facilities and bulk projects across the UAE.'
  },
  {
    path: 'office-furniture-uae',
    title: 'Office Furniture UAE | Office Desks & Workstations | NAD Furniture',
    description: 'Explore office desks, tables, chairs and workstations from NAD Furniture for business and commercial spaces across Dubai and the UAE.'
  },
  {
    path: 'wardrobes-uae',
    title: 'Wardrobes UAE | Bedroom Storage & Wardrobe Cabinets | NAD Furniture',
    description: 'Explore wooden wardrobes and bedroom storage solutions from NAD Furniture, with options for homes and bulk furnishing projects across the UAE.'
  }
];

function replaceRequired(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error('Expected SEO metadata tag was not found: ' + pattern);
  return html.replace(pattern, replacement);
}

for (const page of pages) {
  const canonical = 'https://www.nad.furniture/' + page.path + '/';
  let html = source;

  html = replaceRequired(html, /<title>[^<]*<\/title>/, '<title>' + page.title + '</title>');
  html = replaceRequired(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="' + page.description + '" />');
  html = replaceRequired(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + canonical + '" />');
  html = replaceRequired(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + canonical + '" />');
  html = replaceRequired(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + page.title + '" />');
  html = replaceRequired(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + page.description + '" />');
  html = replaceRequired(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, '<meta name="twitter:title" content="' + page.title + '" />');
  html = replaceRequired(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, '<meta name="twitter:description" content="' + page.description + '" />');

  // Keep Vite's relative asset strategy while resolving assets from route folders.
  html = html.replaceAll('./assets/', '../assets/');

  const routeDir = join(dist, page.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, 'index.html'), html, 'utf8');
}

console.log('Generated ' + pages.length + ' SEO-ready static route entry files.');
