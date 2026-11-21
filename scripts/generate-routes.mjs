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
];

function setMeta(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error('Expected SEO metadata tag was not found: ' + pattern);
  return html.replace(pattern, replacement);
}

for (const page of pages) {
  const canonical = `https://nad.furniture/${page.path}/`;
  let html = source;

  html = setMeta(html, /<title>[^<]*<\\/title>/, `<title>${page.title}</title>`);
  html = setMeta(
    html,
    /<meta\\s+name="description"\\s+content="[^"]*"\\s*\\/>/,
    `<meta name="description" content="${page.description}" />`
  );
  html = setMeta(html, /<link\\s+rel="canonical"\\s+href="[^"]*"\\s*\\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = setMeta(html, /<meta\\s+property="og:url"\\s+content="[^"]*"\\s*\\/>/, `<meta property="og:url" content="${canonical}" />`);
  html = setMeta(html, /<meta\\s+property="og:title"\\s+content="[^"]*"\\s*\\/>/, `<meta property="og:title" content="${page.title}" />`);
  html = setMeta(html, /<meta\\s+property="og:description"\\s+content="[^"]*"\\s*\\/>/, `<meta property="og:description" content="${page.description}" />`);
  html = setMeta(html, /<meta\\s+name="twitter:title"\\s+content="[^"]*"\\s*\\/>/, `<meta name="twitter:title" content="${page.title}" />`);
  html = setMeta(
    html,
    /<meta\\s+name="twitter:description"\\s+content="[^"]*"\\s*\\/>/,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  // Vite uses relative asset URLs (base: './'); route entry files live one
  // directory below dist, so point their bundled assets back to dist/assets.
  html = html.replaceAll('./assets/', '../assets/');

  const routeDir = join(dist, page.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, 'index.html'), html, 'utf8');
}

console.log(`Generated ${pages.length} SEO-ready static route entry files.`);
