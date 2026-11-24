import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = 'dist';
const source = await readFile(join(dist, 'index.html'), 'utf8');

const pages = [
  { path: 'about', title: 'About NAD Furniture | Furniture Supplier in Dubai, UAE', description: 'Learn about NAD Furniture, a UAE supplier of steel bunk beds, metal beds, steel lockers and commercial furniture.' },
  { path: 'projects', title: 'Furniture Projects | NAD Furniture UAE', description: 'Explore NAD Furniture project solutions for staff accommodation, commercial spaces and businesses across the UAE.' },
  { path: 'manufacturing', title: 'Metal Furniture Manufacturing | NAD Furniture UAE', description: 'Discover NAD Furniture manufacturing capabilities for steel bunk beds, metal beds, lockers and commercial furniture in the UAE.' },
  { path: 'services', title: 'Commercial Furniture Supply & Services | NAD Furniture UAE', description: 'NAD Furniture provides commercial furniture supply solutions, including steel beds, lockers and office furniture for UAE projects.' },
  { path: 'steel-bunk-beds-uae', title: 'Steel Bunk Beds UAE | NAD Furniture', description: 'NAD Furniture supplies heavy-duty steel bunk beds for staff accommodation, labour camps, hostels and bulk projects across Dubai and the UAE.', heading: 'Steel Bunk Beds Supplier in UAE', paragraphs: ['NAD Furniture supplies durable steel and metal bunk beds for staff accommodation, labour camps, hostels and commercial projects. Buyers can review available models and request wholesale quotations for delivery across the UAE.', 'Listed models include different frame weights, sizes and finishes. Confirm the exact dimensions, colour, frame weight and included items against the selected product before ordering.', 'For a project quotation, share the required quantity, preferred model, delivery location and project timeline.'], links: [['Home', '/'], ['Steel Lockers', '/steel-lockers-uae/'], ['Beds', '/beds-uae/']] },
  { path: 'steel-lockers-uae', title: 'Steel Lockers UAE | NAD Furniture', description: 'NAD Furniture supplies steel lockers and metal storage cabinets for offices, staff accommodation and commercial facilities across the UAE.', heading: 'Steel Lockers & Metal Storage Cabinets in UAE', paragraphs: ['Find practical steel lockers and metal storage cabinets for staff facilities, workplaces and commercial environments. NAD Furniture lists storage and filing solutions for bulk and project requirements.', 'The catalogue includes selected multi-compartment locker configurations and metal filing cabinets. Dimensions, locking arrangements and finishes vary by model; confirm the individual product specification.', 'For project quotations, share the required configuration, quantity, delivery location and timeline.'], links: [['Home', '/'], ['Steel Bunk Beds', '/steel-bunk-beds-uae/'], ['Office Furniture', '/office-furniture-uae/']] },
  { path: 'mattresses-uae', title: 'Mattresses UAE | NAD Furniture', description: 'Explore single and semi-medicated mattresses from NAD Furniture for staff accommodation, hostels and bulk supply requirements across the UAE.', heading: 'Mattresses for Staff Accommodation in UAE', paragraphs: ['NAD Furniture supplies mattress options for staff accommodation, hostels and institutional requirements. Review available product details and contact the team for bulk quantities and UAE project quotations.'], links: [['Home', '/'], ['Beds', '/beds-uae/']] },
  { path: 'beds-uae', title: 'Metal Beds UAE | Beds Supplier in Dubai & Across UAE | NAD Furniture', description: 'Explore metal beds, single beds, double beds, queen beds and king beds from NAD Furniture for homes, staff accommodation and bulk projects across Dubai and the UAE.', heading: 'Metal Beds Supplier in UAE', paragraphs: ['Explore beds for residential, staff accommodation and commercial requirements, including single, double, queen and king-size options. Contact NAD Furniture for specifications, bulk supply and delivery across the UAE.'], links: [['Home', '/'], ['Metal Beds', '/metal-beds-uae/'], ['Mattresses', '/mattresses-uae/']] },
  { path: 'office-furniture-uae', title: 'Office Furniture UAE | NAD Furniture', description: 'Explore office desks, tables, chairs and workstations from NAD Furniture for business and commercial spaces across Dubai and the UAE.', heading: 'Office Furniture Supplier in UAE', paragraphs: ['Furnish workspaces with practical office desks, tables, chairs and workstations. NAD Furniture supports business and project requirements with commercial office furniture supply across Dubai and the UAE.'], links: [['Home', '/'], ['Steel Lockers', '/steel-lockers-uae/']] },
  { path: 'wardrobes-uae', title: 'Wardrobes UAE | NAD Furniture', description: 'Explore wooden wardrobes and bedroom storage solutions from NAD Furniture, with options for homes and bulk furnishing projects across the UAE.', heading: 'Wardrobes & Bedroom Storage in UAE', paragraphs: ['Browse wardrobe and bedroom storage options for homes, staff accommodation and furnishing projects. Contact NAD Furniture for available models, specifications and bulk quotations across the UAE.'], links: [['Home', '/'], ['Beds', '/beds-uae/']] }
];

function replaceRequired(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error('Expected SEO metadata tag was not found: ' + pattern);
  return html.replace(pattern, replacement);
}
function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

for (const page of pages) {
  const canonical = 'https://nad.furniture/' + page.path + '/';
  let html = source;
  html = replaceRequired(html, /<title>[^<]*<\/title>/, '<title>' + page.title + '</title>');
  html = replaceRequired(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="' + page.description + '" />');
  html = replaceRequired(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + canonical + '" />');
  html = replaceRequired(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + canonical + '" />');
  html = replaceRequired(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + escapeHtml(page.title) + '" />');
  html = replaceRequired(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + escapeHtml(page.description) + '" />');
  html = replaceRequired(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, '<meta name="twitter:title" content="' + escapeHtml(page.title) + '" />');
  html = replaceRequired(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, '<meta name="twitter:description" content="' + escapeHtml(page.description) + '" />');

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': page.path.endsWith('-uae') ? 'CollectionPage' : 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': 'https://nad.furniture/#website' },
    publisher: { '@id': 'https://nad.furniture/#organization' }
  };
  const schemaTag = '<script type="application/ld+json">' + JSON.stringify(pageSchema) + '</script>';
  html = html.replace('</head>', schemaTag + '\n  </head>');

  const heading = page.heading || page.title;
  const paragraphs = page.paragraphs || [page.description];
  const links = [
    ['Home', '/'],
    ['Steel Bunk Beds UAE', '/steel-bunk-beds-uae/'],
    ['Steel Lockers UAE', '/steel-lockers-uae/'],
    ['Metal Beds UAE', '/beds-uae/'],
    ['Mattresses UAE', '/mattresses-uae/'],
    ['School Furniture UAE', '/school-furniture-uae/'],
    ['Office Furniture UAE', '/office-furniture-uae/'],
    ['Wardrobes UAE', '/wardrobes-uae/']
  ];
  const staticContent = '<main id="seo-static-content" style="max-width:1100px;margin:0 auto;padding:40px 24px;font-family:Arial,sans-serif;color:#263238;line-height:1.65"><nav aria-label="Breadcrumb"><a href="/">Home</a> / ' + escapeHtml(heading) + '</nav><h1 style="font-size:2rem;margin:20px 0 12px">' + escapeHtml(heading) + '</h1>' + paragraphs.map(p => '<p>' + escapeHtml(p) + '</p>').join('') + '<h2>Explore NAD Furniture</h2><ul>' + links.map(([label, href]) => '<li><a href="' + href + '">' + escapeHtml(label) + '</a></li>').join('') + '</ul><p><a href="https://wa.me/971506316560">Request a wholesale quotation on WhatsApp</a></p></main>';
  html = html.replace('<div id="root"></div>', '<div id="root">' + staticContent + '</div>');
  html = html.replaceAll('./assets/', '../assets/');

  const routeDir = join(dist, page.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, 'index.html'), html, 'utf8');
}
console.log('Generated ' + pages.length + ' route pages with crawlable static content, canonical URLs and page schema.');
